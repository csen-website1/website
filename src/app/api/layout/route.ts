import connectToDatabase from "@/lib/db";
import { LayoutModel } from "@/models/Layout.model";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const Urls = await LayoutModel.find({});
    return NextResponse.json(Urls);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    let data;
    try {
      data = await req.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid JSON", error: error },
        { status: 400 }
      );
    }
    const updatedUrl = await LayoutModel.findByIdAndUpdate(
      "66e4c30424192e30ed42efb2",
      data,
      { new: true }
    );
    return NextResponse.json(updatedUrl);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating data", error: error },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   const session = await auth();
//   if (!session) {
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
//   }
//   try {
//     await connectToDatabase();
//     const data = await req.json();

//     console.log(data);
//     const newUrl = await LayoutModel.create(data);
//     console.log(newUrl);
//     return NextResponse.json(newUrl);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error creating data", error: error },
//       { status: 500 }
//     );
//   }
// }
