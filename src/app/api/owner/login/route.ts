import { NextRequest, NextResponse } from "next/server";
import { verifyOwnerPassword, createOwnerToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = await verifyOwnerPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Please verify your password." },
        { status: 401 }
      );
    }

    const token = createOwnerToken();
    const response = NextResponse.json({
      success: true,
      message: "Owner authenticated successfully",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server authentication error" },
      { status: 500 }
    );
  }
}
