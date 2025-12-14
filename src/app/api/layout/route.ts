import connectToDatabase from "@/lib/db";
import { LayoutModel } from "@/models/Layout.model";

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

    // Find existing layout or create new one
    const existingLayout = await LayoutModel.findOne({});

    let result;
    if (existingLayout) {
      // Update existing layout
      result = await LayoutModel.findByIdAndUpdate(
        existingLayout._id,
        data,
        { new: true }
      );
    } else {
      // Create new layout if none exists
      result = await LayoutModel.create(data);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating data", error: error },
      { status: 500 }
    );
  }
}

