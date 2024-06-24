import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
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
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
