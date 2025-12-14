import Testimonials from "@/models/Testimonials";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  
  if (!data) {
    return NextResponse.json({ message: "No data provided" }, { status: 400 });
  }
  
  try {
    const updatedTestimonial = await Testimonials.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedTestimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update testimonial", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const deletedTestimonial = await Testimonials.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json(deletedTestimonial, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete testimonial", error: (error as Error).message },
      { status: 500 }
    );
  }
}
