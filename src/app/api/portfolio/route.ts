import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, getPublicPortfolioData, savePortfolioData } from "@/lib/storage";
import { isOwnerAuthenticated } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const isAuth = await isOwnerAuthenticated();
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode");

    // If requested specifically for owner editing and owner is logged in
    if (mode === "owner" && isAuth) {
      const allData = getPortfolioData();
      return NextResponse.json({ success: true, data: allData, isOwner: true });
    }

    // Public visitors receive only published records
    const publicData = getPublicPortfolioData();
    return NextResponse.json({ success: true, data: publicData, isOwner: isAuth });
  } catch (error) {
    console.error("Failed to retrieve portfolio data:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error retrieving portfolio data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAuth = await isOwnerAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Portfolio owner authentication required." },
        { status: 401 }
      );
    }

    const payload = await req.json();
    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid payload provided" },
        { status: 400 }
      );
    }

    const saved = savePortfolioData(payload);
    if (!saved) {
      return NextResponse.json(
        { success: false, message: "Failed to persist portfolio data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Portfolio updated successfully", data: payload });
  } catch (error) {
    console.error("Failed to update portfolio data:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error updating portfolio" },
      { status: 500 }
    );
  }
}
