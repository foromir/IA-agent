import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { ChatMessage } from '@/app/models/ChatMessage';
import { auth } from '@/app/lib/auth/authConfig';

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
        const chatHistory = await ChatMessage.findOne({ userId: session.user.id });

        return NextResponse.json({
            messages: chatHistory?.messages || []
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch chat history' },
            { status: 500 }
        );
    }
} 