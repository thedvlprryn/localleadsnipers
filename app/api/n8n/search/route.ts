import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const token = request.headers.get('authorization')?.split(' ')[1];

        console.log("[Proxy] Received search request");
        console.log("[Proxy] Token present:", !!token);

        if (!token) {
            // console.log("[Proxy] No token provided");
            // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Use server-side env var first, fallback to public if needed (though webhook should be secret ideally)
        const webhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

        console.log("[Proxy] Webhook URL Configured:", !!webhookUrl);
        // console.log("[Proxy] Target:", webhookUrl); // Uncomment for debugging only (don't expose logs in prod)

        if (!webhookUrl) {
            console.error('[Proxy] Error: N8N_WEBHOOK_URL is missing in environment variables');
            return NextResponse.json({
                error: 'Server Configuration Error',
                message: 'Search service is not configured.'
            }, { status: 500 });
        }

        console.log("[Proxy] Forwarding to n8n...");
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        console.log("[Proxy] n8n Response Status:", response.status);

        if (!response.ok) {
            console.error(`[Proxy] Upstream failed with ${response.status}: ${response.statusText}`);
            return NextResponse.json(
                { error: `Upstream Error: ${response.status}`, details: await response.text() },
                { status: response.status }
            );
        }

        // Safely handle response body (might be empty or text)
        const textData = await response.text();
        let data;
        try {
            data = textData ? JSON.parse(textData) : {};
        } catch (e) {
            console.log("[Proxy] Response was not JSON:", textData);
            data = { message: "Search initiated successfully", raw: textData };
        }

        console.log("[Proxy] Success data:", data);
        return NextResponse.json(data);

    } catch (error) {
        console.error('[Proxy] Internal Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
