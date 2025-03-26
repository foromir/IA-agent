import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    messages: [{
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    summaries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Summary'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema); 