import { Resend } from "resend";
import { ContactFormEmail } from "@/emails/contact-form";
import { NextResponse } from "next/server";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // Check if required environment variables are set
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    if (!process.env.CONTACT_EMAIL) {
      throw new Error("CONTACT_EMAIL is not configured");
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Enhanced validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required and cannot be empty" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      react: ContactFormEmail({ name, email, message }),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact form:", error);

    // Return more specific error messages
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
