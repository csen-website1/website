import connectToDatabase from "@/lib/db";
import Email from "@/models/Email";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  authMethod: "PLAIN",

  auth: {
    user: process.env.GRIEVANCE_EMAIL,
    pass: process.env.GRIEVANCE_EMAIL_PASSWORD,
  },
});
export async function POST(request: Request) {
  await connectToDatabase();

  const data = await request.json();
  const existingEmail = await Email.findOne({ email: data.email });
  if (!existingEmail) {
    const email = await Email.create(data);
    await transporter.sendMail({
      from: process.env.GRIEVANCE_EMAIL,
      to: data.email,
      subject: "Welcome to our website",
      text: "Thank you for signing up!",
    });
    console.log(data);
    console.log(data.email);
    return NextResponse.json({ data: email });
  }
  NextResponse.error();

  return NextResponse.json({ data });
}

// export async function GET() {
//   await connectToDatabase();
//   const emails = await Email.find({});
//   return NextResponse.json({ data: emails });
// }
