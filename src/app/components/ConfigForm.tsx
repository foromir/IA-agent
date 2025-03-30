'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

interface BaseConfig {
    model: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    system_prompt: string;
}

interface Config {
    GENERAL: BaseConfig;
    SUMMARY: BaseConfig;
    GLOBAL: Array<{
        key: string;
        value: string | number | boolean;
    }>;
}

const ConfigForm = () => {
    const [config, setConfig] = useState<Config | null>(null);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const response = await fetch('/api/config');
            const data = await response.json();
            setConfig(data);
        } catch (error) {
            console.error('Error fetching config:', error);
        }
    };

    if (!config) return <div>Loading...</div>;

    return (
        <Card className="p-6">
           <ConfigSection 
                        title="General (For chat)"
                        config={config.GENERAL}
                        onUpdate={(newConfig) => {
                            setConfig(prev => prev ? {
                                ...prev,
                                GENERAL: newConfig
                            } : null);
                        }}
                    />
           <div className="h-6 border-b border-gray-200 dark:border-gray-700 my-4"></div>
           <ConfigSection 
                        title="Summary (For summary)"
                        config={config.SUMMARY}
                        onUpdate={(newConfig) => {
                            setConfig(prev => prev ? {
                                ...prev,
                                SUMMARY: newConfig
                            } : null);
                        }}
                    />

            <Button 
                className="mt-4"
                onClick={async () => {
                    try {
                        const response = await fetch('/api/config', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(config),
                        });
                        if (!response.ok) throw new Error('Failed to save');
                    } catch (error) {
                        console.error('Error saving:', error);
                    }
                }}
            >
                Save Configuration
            </Button>
        </Card>
    );
};

const ConfigSection = ({ 
    title,
    config, 
    onUpdate 
}: { 
    title: string;
    config: BaseConfig; 
    onUpdate: (config: BaseConfig) => void;
}) => {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Model</label>
                    <select
                        value={config.model}
                        onChange={(e) => onUpdate({ ...config, model: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-4o">GPT-4 Online</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Temperature ({config.temperature})
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={config.temperature}
                        onChange={(e) => onUpdate({ 
                            ...config, 
                            temperature: parseFloat(e.target.value) 
                        })}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Max Tokens</label>
                    <input
                        type="number"
                        value={config.max_tokens}
                        onChange={(e) => onUpdate({
                            ...config,
                            max_tokens: parseInt(e.target.value)
                        })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Top P</label>
                    <input
                        type="number"
                        step="0.1"
                        value={config.top_p}
                        onChange={(e) => onUpdate({
                            ...config,
                            top_p: parseFloat(e.target.value)
                        })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Frequency Penalty</label>
                    <input
                        type="number"
                        step="0.1"
                        value={config.frequency_penalty}
                        onChange={(e) => onUpdate({
                            ...config,
                            frequency_penalty: parseFloat(e.target.value)
                        })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Presence Penalty</label>
                    <input
                        type="number"
                        step="0.1"
                        value={config.presence_penalty}
                        onChange={(e) => onUpdate({
                            ...config,
                            presence_penalty: parseFloat(e.target.value)
                        })}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">System Prompt</label>
                <textarea
                    value={config.system_prompt}
                    onChange={(e) => onUpdate({ 
                        ...config, 
                        system_prompt: e.target.value 
                    })}
                    className="w-full p-2 border rounded"
                    rows={4}
                />
            </div>
        </div>
    );
};


export default ConfigForm; 