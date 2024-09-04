import { NextApiRequest } from "next";
import Testimonials from "@/models/Testimonials";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data: any = req.body;
  const { name, message, occupation } = data;
  if (!data) {
    return NextResponse.json({ message: "No data provided" }, { status: 400 });
  }
  try {
    const updatedTestimonial = await Testimonials.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedTestimonial) {
      return NextResponse.json({ message: "doesnt exixts " }, { status: 200 });
    }
    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const deletedTestimonial = await Testimonials.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return NextResponse.json({ message: "doesnt exixts " }, { status: 200 });
    }
    return NextResponse.json(deletedTestimonial, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
