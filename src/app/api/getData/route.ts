import connectToDatabase from "@/lib/db";
import { UserModel } from "@/models/User";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    try {
      await connectToDatabase();
      const users = await UserModel.find({}).sort({ createdAt: -1 });
      return NextResponse.json(users);
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching data", error: error },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
