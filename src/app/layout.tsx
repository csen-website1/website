import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import the missing component

import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSEN | Structural Engineering & Numerical Solutions",
  description:
    "CSEN dz provides innovative structural engineering and numerical analysis solutions for diverse industries. Explore our services, RPA Plug-in, and CSEN Cloud.",
  icons: "/favicon.ico",
  keywords: "structural engineering, csen , RPA, CSEN Cloud, CSEN dz",
  openGraph: {
    title: "With CSEN Innovating Structural Analysis,SecuringTomorrow",
    url: "https://csen-dz.com",
    description:
      "CSEN dz offers expert structural engineering and numerical analysis services to optimize your projects.",
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "CSEN Logo",
      },
    ],
  },
  metadataBase: new URL("https://csen-dz.com"),
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
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
          <div className="flex-grow flex-1">
            <SessionProvider session={session}>{children}</SessionProvider>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
