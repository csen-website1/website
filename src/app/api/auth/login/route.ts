import SignUp from "@/models/SignUp";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const { userName, password } = await request.json();
  const user = await SignUp.findOne({ userName });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = jwt.sign({ userId: user._id }, "secretKey");
  return NextResponse.json({ user, token }, { status: 201 });
}
