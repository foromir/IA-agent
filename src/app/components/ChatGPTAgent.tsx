'use client';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { useState, useRef, useEffect } from 'react';
import { Message } from '../types/chart';

interface ChatGPTAgentProps {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    messages: Message[];
}

const ChatGPTAgent: React.FC<ChatGPTAgentProps> = ({setMessages, messages}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();
            const assistantMessage: Message = { role: 'assistant', content: data.message };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="space-y-4">
                <div className="h-[400px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-800 scrollbar-track-transparent pr-2">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-2xl ${
                                message.role === 'user'
                                    ? 'bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/40 dark:to-blue-900/40 ml-auto text-gray-800 dark:text-gray-100'
                                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-100/50 dark:border-blue-800/50'
                            } max-w-[80%] shadow-sm transition-all duration-200 hover:shadow-md`}
                        >
                            <div className="flex items-start gap-2">
                                {message.role === 'user' ? (
                                    <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs">
                                        У
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                                        AI
                                    </div>
                                )}
                                <div className="flex-1">{message.content}</div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 rounded-2xl max-w-[80%] shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                                    AI
                                </div>
                                <div className="flex gap-2 text-blue-500">
                                    <span className="animate-bounce">•</span>
                                    <span className="animate-bounce delay-100">•</span>
                                    <span className="animate-bounce delay-200">•</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="flex gap-3 mt-4">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Введите ваше сообщение..."
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-xl border border-blue-200 
                                 dark:border-blue-800 bg-white dark:bg-gray-700
                                 focus:ring-2 focus:ring-blue-300 focus:border-transparent
                                 transition-all duration-200"
                    />
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 
                                 hover:from-blue-600 hover:to-sky-600 text-white font-medium
                                 transition-all duration-200 shadow-md hover:shadow-lg
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                            />
                        </svg>
                    </Button>
                </form>
            </div>
        </Card>
    );
} 

export default ChatGPTAgent;