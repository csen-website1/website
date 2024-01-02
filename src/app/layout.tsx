import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSEN",
  description: "Company of Structural Engineering & Numerical",
  icons: "/favicon.ico",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth ">
      <body
        className={cn(
          "relative h-full font-sans antialiased overflow-x-hidden",
          inter.className
        )}
      >
        <Navbar />
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
