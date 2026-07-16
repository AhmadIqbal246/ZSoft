import nodemailer from "nodemailer";

function getSmtpConfig() {
    const host = process.env.EMAIL_HOST || process.env.SMTP_HOST;
    const port = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT || 587);
    const user = process.env.EMAIL_HOST_USER || process.env.SMTP_USER;
    const rawPass = process.env.EMAIL_HOST_PASSWORD || process.env.SMTP_PASS || "";
    const pass = rawPass.replace(/\s+/g, "");
    if (!host || !user || !pass) {
        throw new Error("SMTP is not configured");
    }
    return {
        host,
        port,
        secure: port === 465,
        requireTLS: port === 587,
        auth: { user, pass },
    };
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export async function sendContactEmail({ name, email, subject, message, source }) {
    const smtpUser = process.env.EMAIL_HOST_USER || process.env.SMTP_USER;
    const to = process.env.CONTACT_TO || "ahmad@protonixs.com";
    const from =
        process.env.DEFAULT_FROM_EMAIL ||
        process.env.CONTACT_FROM ||
        smtpUser;
    const transporter = nodemailer.createTransport(getSmtpConfig());
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const safeSource = escapeHtml(source || "website");
    const info = await transporter.sendMail({
        from: `"Protonixs Website" <${from}>`,
        to,
        replyTo: `"${name}" <${email}>`,
        subject: `[Protonixs Lead] ${subject}`,
        text: [
            `New contact lead from ${source || "website"}`,
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            "",
            "Message:",
            message,
        ].join("\n"),
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
                <h2 style="margin-bottom: 8px;">New contact lead</h2>
                <p style="margin: 0 0 16px; color: #555;">Source: ${safeSource}</p>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
                <p><strong>Subject:</strong> ${safeSubject}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p><strong>Message:</strong></p>
                <p>${safeMessage}</p>
            </div>
        `,
    });
    return {
        messageId: info.messageId,
        accepted: info.accepted,
        response: info.response,
    };
}

export function validateContactPayload(body) {
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "Website Inquiry";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const source = typeof body?.source === "string" ? body.source.trim() : "website";
    const honeypot = typeof body?.website === "string" ? body.website.trim() : "";
    if (honeypot) {
        return { ok: true, spam: true };
    }
    if (!name || name.length < 2 || name.length > 100) {
        return { ok: false, error: "Please enter a valid name." };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
        return { ok: false, error: "Please enter a valid email address." };
    }
    if (!subject || subject.length < 2 || subject.length > 150) {
        return { ok: false, error: "Please enter a valid subject." };
    }
    if (!message || message.length < 10 || message.length > 5000) {
        return { ok: false, error: "Please enter a message (at least 10 characters)." };
    }
    return {
        ok: true,
        spam: false,
        data: { name, email, subject, message, source },
    };
}
