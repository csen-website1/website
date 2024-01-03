import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSEN dz | Structural Engineering & Numerical Solutions", // Enhanced title with key services
  description:
    "CSEN dz provides innovative structural engineering and numerical analysis solutions for diverse industries. Explore our services, RPA Plug-in, and CSEN Cloud.", // More descriptive and keyword-rich
  icons: "/favicon.ico",
  keywords: "structural engineering, csen , RPA, CSEN Cloud, CSEN dz",
  // Refined keywords for relevance
  openGraph: {
    title: "CSEN dz | Structural Engineering & Numerical Solutions",
    url: "https://csen-dz.com",
    description:
      "CSEN dz offers expert structural engineering and numerical analysis services to optimize your projects.",
    images: ["/og-image.jpg"], // Add a visually appealing image
  },
  twitter: {
    title: "CSEN dz: Empowering Innovation in Structural Engineering",
    description:
      "Discover CSEN dz's cutting-edge services for structural engineering and numerical analysis. #structuralengineering #numericalanalysis",
    images: "/twitter-image.jpg", // Use a relevant Twitter image
  },
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
