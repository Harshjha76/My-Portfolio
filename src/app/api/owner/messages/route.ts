import { NextRequest, NextResponse } from "next/server";
import { getContactMessages, markMessageRead, deleteContactMessage } from "@/lib/storage";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET() {
  const isAuth = await isOwnerAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const messages = getContactMessages();
  return NextResponse.json({ success: true, messages });
}

export async function PATCH(req: NextRequest) {
  const isAuth = await isOwnerAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id, isRead } = await req.json();
  if (!id) {
    return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 });
  }

  const updated = markMessageRead(id, Boolean(isRead));
  return NextResponse.json({ success: updated });
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isOwnerAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 });
  }

  const deleted = deleteContactMessage(id);
  return NextResponse.json({ success: deleted });
}
