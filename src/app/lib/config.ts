import yaml from 'yaml';
import fs from 'fs';
import path from 'path';
import { GPTModel } from '@/app/types/config';

const CONFIG_PATH = path.join(process.cwd(), 'config.yaml');

export interface Config {
    GENERAL: {
        model: GPTModel;
        temperature: number;
        max_tokens: number;
        top_p: number;
        frequency_penalty: number;
        presence_penalty: number;
        system_prompt: string;
    };
    SUMMARY: {
        model: GPTModel;
        temperature: number;
        max_tokens: number;
        top_p: number;
        frequency_penalty: number;
        presence_penalty: number;
        system_prompt: string;
    };
    GLOBAL: Array<{
        key: string;
        value: string | number | boolean;
    }>;
}

const defaultConfig: Config = {
    GENERAL: {
        model: GPTModel.GPT_35_TURBO,
        temperature: 0.7,
        max_tokens: 1000,
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

export function readConfig(): Config {
    try {
        const fileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
        return yaml.parse(fileContents);
    } catch (error) {
        console.error('Error reading config:', error);
        // If file doesn't exist or is invalid, create with default config
        writeConfig(defaultConfig);
        return defaultConfig;
    }
}

export function writeConfig(config: Config): void {
    const yamlStr = yaml.stringify(config);
    fs.writeFileSync(CONFIG_PATH, yamlStr, 'utf8');
} 