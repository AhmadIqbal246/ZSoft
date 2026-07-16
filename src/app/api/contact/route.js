import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactEmail, validateContactPayload } from "@/lib/contact-mail";

export async function POST(req) {
    try {
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
        const limitResult = rateLimit(`contact:${ip}`, 5, 60000);
        if (!limitResult.allowed) {
            return NextResponse.json(
                { error: "Too many requests. Please try again in a minute." },
                { status: 429 }
            );
        }
        const body = await req.json();
        const validation = validateContactPayload(body);
        if (!validation.ok) {
            return NextResponse.json({ error: validation.error }, { status: 400 });
        }
        if (validation.spam) {
            console.log("Contact honeypot triggered — email skipped");
            return NextResponse.json({ success: true });
        }
        const result = await sendContactEmail(validation.data);
        console.log("Contact email queued:", result);
        return NextResponse.json({ success: true, messageId: result.messageId });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again or email us directly." },
            { status: 500 }
        );
    }
}
