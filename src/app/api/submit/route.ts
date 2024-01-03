import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { UserModel } from "../../../models/user";

export const POST = async (request: Request) => {
  try {
    await connectToDatabase();
    const data = await request.json();
    const existingUser = await UserModel.findOne({ email: data.email });

    if (existingUser) {
      data.message = { text: data.message, date: new Date() };
      await UserModel.updateOne(
        { email: data.email },
        { $push: { message: data.message } }
      );
      return NextResponse.json({ message: "Message added" }, { status: 200 });
    }

    await UserModel.create({
      ...data,
      message: { text: data.message, date: new Date() },
    });

    return NextResponse.json({ message: "User added" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
