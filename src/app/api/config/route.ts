import { NextResponse } from 'next/server';
import { readConfig, writeConfig } from '@/app/lib/config';
import { Config } from '@/app/lib/config';

export async function GET() {
    try {
        const config = readConfig();
        return NextResponse.json(config);
    } catch (error) {
        console.error('Error reading config:', error);
        return NextResponse.json(
            { error: 'Failed to read configuration' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const config: Config = await req.json();
        writeConfig(config);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error writing config:', error);
        return NextResponse.json(
            { error: 'Failed to save configuration' },
            { status: 500 }
        );
    }
}

