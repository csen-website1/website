import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCurrentAdmin } from "@/lib/auth";
import { generateHTMLEmail } from "@/lib/emailTemplates";

// Create transporter with existing SMTP config
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GRIEVANCE_EMAIL,
    pass: process.env.GRIEVANCE_EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Verify admin is authenticated
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { to, subject, body, firstName } = await request.json();

    // Validate required fields
    if (!to || !subject || !body) {
      return NextResponse.json(
        { success: false, error: "Destinataire, sujet et message requis" },
        { status: 400 }
      );
    }

    // Generate branded HTML email
    const htmlContent = generateHTMLEmail(firstName || "Client", body);

    // Send email
    const info = await transporter.sendMail({
      from: `"CSEN" <${process.env.GRIEVANCE_EMAIL}>`,
      to: to,
      replyTo: process.env.GRIEVANCE_EMAIL,
      subject: subject,
      text: body.replace(/<[^>]*>/g, ""), // Plain text fallback (strip HTML)
      html: htmlContent,
    });

    console.log("Email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: "Email envoyé avec succès",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Erreur lors de l'envoi" 
      },
      { status: 500 }
    );
  }
}
