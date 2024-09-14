import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import { UserModel } from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const { id } = params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting data", error: error },
      { status: 500 }
    );
  }
}
