import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { auth } from "@/auth";

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
  const session = await auth();

  return (
    <html lang="en" className="h-full scroll-smooth ">
      <body
        className={cn(
          "relative h-full font-sans antialiased overflow-x-hidden",
          inter.className
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body>
//           <SignedOut>
//             <SignInButton />
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }
