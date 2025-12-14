import connectToDatabase from "@/lib/db";
import { UserModel } from "@/models/User";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

