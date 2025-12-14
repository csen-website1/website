import { NextResponse } from "next/server";
import { initializeDefaultAdmin } from "@/lib/auth";

// This endpoint initializes the default admin
// It's called automatically on app startup or can be triggered manually
export async function GET() {
  try {
    await initializeDefaultAdmin();

    return NextResponse.json({
      success: true,
      message: "Admin initialization check completed",
    });
  } catch (error) {
    console.error("Admin initialization error:", error);
    return NextResponse.json(
      { success: false, error: "Initialization failed" },
      { status: 500 }
    );
  }
}
