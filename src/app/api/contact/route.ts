import { Resend } from "resend";
import { ContactFormEmail } from "@/emails/contact-form";
import { NextResponse } from "next/server";

// Debug environment variables
console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
console.log("CONTACT_EMAIL:", process.env.CONTACT_EMAIL);

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing Resend API key");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error("Missing contact email");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Send email using Resend
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Contact Form Submission from ${name}`,
      react: ContactFormEmail({ name, email, message }),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error sending email" },
      { status: 500 }
    );
  }
}