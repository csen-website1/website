import connectToDatabase from "@/lib/db";
import { UserModel } from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting data", error: (error as Error).message },
      { status: 500 }
    );
  }
}
