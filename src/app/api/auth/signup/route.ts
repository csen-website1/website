import SignUp from "@/models/SignUp";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const { userName, email, password } = await request.json();
  const exist = await SignUp.findOne({ $or: [{ userName }, { email }] });
  if (exist) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await SignUp.create({
    userName,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ user }, { status: 201 });
}
