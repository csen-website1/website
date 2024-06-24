import { auth } from "@/auth";
import connectToDatabase from "@/lib/db";
import Testimonials from "@/models/Testimonials";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  await connectToDatabase();

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
  await connectToDatabase();
  try {
    const testimonials = await Testimonials.find({});
    console.log(testimonials, " deadeadeadeda");
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong ", err: error },
      { status: 400 }
    );
  }
}
