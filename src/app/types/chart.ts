
export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
}
