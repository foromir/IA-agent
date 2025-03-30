import mongoose, { Schema } from 'mongoose';
import { GPTModel } from '@/app/types/config';
import { Config } from '../lib/config';

// Base configuration schema for both GENERAL and SUMMARY
const baseConfigSchema = new Schema({
    model: {
        type: String,
        enum: Object.values(GPTModel),
        required: true,
        default: GPTModel.GPT_35_TURBO
    },
    temperature: {
        type: Number,
        required: true,
        min: 0,
        max: 2,
        default: 0.7
    },
    max_tokens: {
        type: Number,
        required: true,
        min: 1,
        max: 4096,
        default: 1000
    },
    top_p: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
        default: 1
    },
    frequency_penalty: {
        type: Number,
        required: true,
        min: -2,
        max: 2,
        default: 0
    },
    presence_penalty: {
        type: Number,
        required: true,
        min: -2,
        max: 2,
        default: 0
    },
    system_prompt: {
        type: String,
        required: true,
        default: "You are a helpful assistant"
    }
});

// Global settings schema
const globalSettingSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    }
});

// Complete configuration schema
const configSchema = new Schema({
    GENERAL: {
        type: baseConfigSchema,
        required: true,
        default: () => ({})
    },
    SUMMARY: {
        type: baseConfigSchema,
        required: true,
        default: () => ({})
    },
    GLOBAL: {
        type: [globalSettingSchema],
        default: []
    }
}, {
    timestamps: true
});

// Default values
const defaultConfig = {
    GENERAL: {
        model: GPTModel.GPT_4,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        system_prompt: "You are a helpful assistant"
    },
    SUMMARY: {
        model: GPTModel.GPT_4,
        temperature: 0.5,
        max_tokens: 500,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
        system_prompt: "You are a summarization expert"
    },
    GLOBAL: [
        { key: "maxResponseTime", value: 30 },
        { key: "enableDebug", value: false }
    ]
};


// API route handler
export async function getConfig() {
    const Config = mongoose.models.Config || mongoose.model('Config', configSchema);
    let config = await Config.findOne({}).sort({ createdAt: -1 });
    
    if (!config) {
        config = await Config.create(defaultConfig);
    }
    
    return config;
}   

export async function updateConfig(newConfig: Config) {
    const Config = mongoose.models.Config || mongoose.model('Config', configSchema);
    return await Config.create(newConfig);
}

export default mongoose.models.Config || mongoose.model('Config', configSchema);