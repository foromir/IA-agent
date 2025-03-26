import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import connectDB from '@/app/lib/connectDB';
import { ChatMessage } from '@/app/models/ChatMessage';
import { Summary } from '@/app/models/Summary';
import { auth } from '@/app/lib/auth/authConfig';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();
        const chatHistory = await ChatMessage.findOne({ userId: session.user.id });

        if (!chatHistory || chatHistory.messages.length === 0) {
            return NextResponse.json({
                summary: "No chat history available."
            });
        }

        // Format chat history for the summary request
        const chatContent = chatHistory.messages
            .map((msg: { role: string; content: string; }) => `${msg.role}: ${msg.content}`)
            .join('\n');

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "Please provide a brief summary of the following conversation. Focus on the main topics and key points discussed."
                },
                {
                    role: "user",
                    content: chatContent
                }
            ],
        });

        const summaryContent = completion.choices[0].message.content;

        // Save the summary to the database
        const newSummary = await Summary.create({
            userId: session.user.id,
            content: summaryContent,
            chatHistoryRef: chatHistory._id,
        });

        // Update the chat history with reference to the summary
        await ChatMessage.findOneAndUpdate(
            { userId: session.user.id },
            { 
                $push: { 
                    summaries: newSummary._id 
                } 
            }
        );

        return NextResponse.json({
            summary: summaryContent,
            summaryId: newSummary._id
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate summary' },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch summaries
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();
        const summaries = await Summary.find({ 
            userId: session.user.id 
        }).sort({ createdAt: -1 }); // Most recent first

        return NextResponse.json({
            summaries
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch summaries' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();
        const { summaryId } = await req.json();                 
        await Summary.findByIdAndDelete(summaryId);

        return NextResponse.json({
            message: 'Summary deleted successfully'
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to delete summary' },
            { status: 500 }
        );
    }   
}