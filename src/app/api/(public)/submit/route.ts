import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { UserModel } from "../../../../models/User";
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
export const POST = async (request: Request) => {
  try {
    await connectToDatabase();
    const data = await request.json();
    const existingUser = await UserModel.findOne({ email: data.email });

    if (existingUser) {
      data.message = { text: data.message, date: new Date() };
      await UserModel.updateOne(
        { email: data.email },
        { $push: { message: data.message }, $set: { updatedAt: new Date() } }
      );
      return NextResponse.json(
        { message: "Your Message has Been recived " },
        { status: 200 }
      );
    }

    await UserModel.create({
      ...data,
      message: { text: data.message, date: new Date() },
    });
    await transporter.sendMail({
      from: process.env.GRIEVANCE_EMAIL,
      to: data.email,
      subject: "Welcome to our website",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Website!</title>
  <style>
    /* Add your CSS styles here for better presentation */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .message {
      font-size: 18px;
      line-height: 1.6;
    }
    .signature {
      margin-top: 40px;
      text-align: center;
      font-style: italic;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Website!</h1>
    </div>
    <div class="message">
      <p>Dear ${data.name},</p>
      <p>Thank you for submitting your information on our website! We're excited to have you join our community.</p>
      <p>Our team is currently reviewing your submission and will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore our website and discover everything we have to offer.</p>
      <p>If you have any questions or concerns, don't hesitate to reach out to us at [Your Contact Information].</p>
      <p>Best Regards,</p>
      <p>CSEN</p>
    </div>
    <div class="signature">
      <p>This email was sent automatically. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`,
    });

    return NextResponse.json(
      { message: "Your Submission has been sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
