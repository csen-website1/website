import connectToDatabase from "@/lib/db";
import Email from "@/models/Email";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET /api/email" });
}
export async function POST(request: Request) {
  await connectToDatabase();

  const data = await request.json();
  const existingEmail = await Email.findOne({ email: data.email });
  if (!existingEmail) {
    const email = await Email.create(data);
    return NextResponse.json({ data: existingEmail });
  }
  NextResponse.error();

  return NextResponse.json({ data });
}
