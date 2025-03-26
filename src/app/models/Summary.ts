import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    chatHistoryRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatMessage',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Summary = mongoose.models.Summary || mongoose.model('Summary', summarySchema); 