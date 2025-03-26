import { useState, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
}

const useDashboard = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [summary, setSummary] = useState<string>('');
    const [summaries, setSummaries] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const loadChatHistory = async () => {
            try {
                const response = await fetch('/api/chat/history');
                if (!response.ok) throw new Error('Failed to load chat history');
                const data = await response.json();
                setMessages(data.messages || []);
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };
        
        loadChatHistory();
    }, []);

    useEffect(() => {
        getSummaries()
    }, []);

    const generateSummary = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/chat/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: messages
                })
            });
            if (!response.ok) throw new Error('Failed to generate summary');
            const data = await response.json();
            setSummary(data.summary);
            getSummaries();
        } catch (error) {   
            console.error('Error generating summary:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getSummaries = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/chat/summary');
            const data = await response.json();
            setSummaries(data.summaries);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching summaries:', error);
        } finally {
            setIsLoading(false);
        }
    }   

    const deleteSummary = async (summaryId: string) => {
        const response = await fetch('/api/chat/summary', {
            method: 'DELETE',
            body: JSON.stringify({ summaryId })
        });
        if (!response.ok) throw new Error('Failed to delete summary');
        const data = await response.json();
        console.log('data', data);
        getSummaries();
    }   

    return { messages, setMessages, generateSummary, summary, summaries, deleteSummary, isLoading };
}

export default useDashboard;