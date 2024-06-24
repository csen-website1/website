import { auth } from "@/auth";
import Testimonials from "@/models/Testimonials";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const data = await req.json();
  const testimonial = new Testimonials(data);

  try {
    await testimonial.save();
    return NextResponse.json({ message: "Testimonial added" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "something went wrong ", err: error },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const testimonials = await Testimonials.find({});
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong ", err: error },
      { status: 400 }
    );
  }
}
