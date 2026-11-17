import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Length checks
    if (name.length > 100 || subject?.length > 150 || message.length > 3000) {
      return NextResponse.json(
        { success: false, message: "Message or field content exceeds allowed limit." },
        { status: 400 }
      );
    }

    const saved = saveContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || "General Inquiry").trim(),
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. Thank you for reaching out!",
      id: saved.id,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit message. Please try again." },
      { status: 500 }
    );
  }
}
