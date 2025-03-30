    import { NextResponse } from 'next/server';
    import OpenAI from 'openai';
    import connectDB from '@/app/lib/connectDB';
    import { ChatMessage } from '@/app/models/ChatMessage';
    import { auth } from '@/app/lib/auth/authConfig';
    import { GPTModel } from '@/app/types/gpt';
    import {readConfig} from '@/app/lib/config';

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    export async function POST(req: Request) {
        try {
            const session = await auth();
            if (!session?.user?.id) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }

            const { message } = await req.json();
            await connectDB();
            const config = readConfig().GENERAL;
            
            // Get or create chat history for the user
            let chatHistory = await ChatMessage.findOne({ userId: session.user.id });
            if (!chatHistory) {
                chatHistory = await ChatMessage.create({
                    userId: session.user.id,
                    messages: []
                });
            }

            // Add user message to history
            const userMessage = {
                role: 'user',
                content: message,
                timestamp: new Date()
            };
            chatHistory.messages.push(userMessage);

            // Get AI response
            const completion = await openai.chat.completions.create({
                model: config?.model || GPTModel.GPT_4O,
                messages: [
                    {
                        role: "system",
                        content: config?.system_prompt || "You are a helpful assistant that provides clear and concise responses."
                    },
                    ...chatHistory.messages.map((msg: { role: string; content: string; }) => ({
                        role: msg.role,
                        content: msg.content
                    }))
                ],
                temperature: config?.temperature || 0.7,
                max_tokens: config?.max_tokens || 1000,
                top_p: config?.top_p || 1,
                frequency_penalty: config?.frequency_penalty || 0,
                presence_penalty: config?.presence_penalty || 0,
            });

            const aiResponse = completion.choices[0].message.content;

            // Add AI response to history
            const assistantMessage = {
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
            };
            chatHistory.messages.push(assistantMessage);

            // Save updated history
            await chatHistory.save();

            return NextResponse.json({
                message: aiResponse
            });
        } catch (error) {
            console.error('Error:', error);
            return NextResponse.json(
                { error: 'Failed to process your request' },
                { status: 500 }
            );
        }
    } 