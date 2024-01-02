import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Register to RPA Plug-in",
  description: "Register to RPA Plug-in",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
