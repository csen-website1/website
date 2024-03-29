import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "../api/auth/[...nextauth]/auth";
import connectToDatabase from "@/lib/db";
import { UserModel } from "@/models/User";

export async function GET() {
  const session = (await getServerSession(authOptions)) as {
    user?: { name: string };
  };
  if (session?.user?.name === process.env.CSEN_ADMIN) {
    await connectToDatabase();
    const users = await UserModel.find({});
    return NextResponse.json(users);
  }
  return NextResponse.redirect("https://csen-dz.com");
}
