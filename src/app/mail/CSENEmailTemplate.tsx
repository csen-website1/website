import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  content: string;
  previewText?: string;
}

// Base CSEN email template with logo and branding
export function CSENEmailTemplate({
  firstName,
  content,
  previewText,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        {previewText && (
          <Text style={preview}>{previewText}</Text>
        )}
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://csen-dz.com/csen_logo.png"
              width="120"
              height="auto"
              alt="CSEN Logo"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={greeting}>Bonjour {firstName},</Text>
            <div
              style={bodyText}
              dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br/>") }}
            />
          </Section>

          {/* Signature */}
          <Section style={signatureSection}>
            <Text style={signature}>
              Cordialement,
              <br />
              <strong>L&apos;équipe CSEN</strong>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Img
              src="https://csen-dz.com/csen_logo.png"
              width="80"
              height="auto"
              alt="CSEN"
              style={footerLogo}
            />
            <Text style={footerText}>
              CSEN - Structural Engineering & Numerical Solutions
            </Text>
            <Text style={footerLinks}>
              <Link href="https://csen-dz.com" style={footerLink}>
                Site Web
              </Link>
              {" • "}
              <Link href="mailto:contact@csen-dz.com" style={footerLink}>
                Contact
              </Link>
            </Text>
            <Text style={copyright}>
              © 2024 CSEN. Tous droits réservés.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const preview = {
  display: "none" as const,
  fontSize: "1px",
  lineHeight: "1px",
  maxHeight: "0px",
  maxWidth: "0px",
  overflow: "hidden" as const,
  color: "#fff",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  marginTop: "40px",
  marginBottom: "40px",
  overflow: "hidden" as const,
};

const header = {
  backgroundColor: "#1e3a5f",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const contentSection = {
  padding: "40px",
};

const greeting = {
  fontSize: "18px",
  fontWeight: "600" as const,
  color: "#1e3a5f",
  marginBottom: "24px",
  lineHeight: "28px",
};

const bodyText = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
  whiteSpace: "pre-line" as const,
};

const signatureSection = {
  padding: "0 40px 40px 40px",
};

const signature = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
  marginTop: "32px",
};

const divider = {
  borderColor: "#e5e7eb",
  borderWidth: "1px",
  margin: "0",
};

const footer = {
  backgroundColor: "#f8fafc",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const footerLogo = {
  margin: "0 auto 16px auto",
  opacity: 0.8,
};

const footerText = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "0 0 8px 0",
};

const footerLinks = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "0 0 16px 0",
};

const footerLink = {
  color: "#3b82f6",
  textDecoration: "none",
};

const copyright = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0",
};

export default CSENEmailTemplate;
