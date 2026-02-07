import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validate environment variable
        const n8nUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

        if (!n8nUrl) {
            console.error("Proxy Error: Missing n8n URL");
            return NextResponse.json(
                { success: false, message: "Server Configuration Error: Missing n8n URL" },
                { status: 500 }
            );
        }

        // 2. Forward Request to n8n (Server-to-Server)
        console.log(`[Proxy] Forwarding request to: ${n8nUrl}`);
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            console.error("[Proxy] Missing Authorization header");
            return NextResponse.json(
                { success: false, message: "Unauthorized: Missing Authorization Header" },
                { status: 401 }
            );
        }

        const response = await fetch(n8nUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader
            },
            body: JSON.stringify(body)
        });

        // 3. Handle n8n Response
        if (!response.ok) {
            console.error(`[Proxy] Upstream error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            return NextResponse.json(
                { success: false, message: `Upstream Error: ${response.status}`, details: text },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log("[Proxy] Data received from n8n");
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to connect to search engine." },
            { status: 500 }
        );
    }
}
