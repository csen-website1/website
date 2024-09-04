import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = auth();
  if (!session) redirect("/api/auth/signin");
  return (
    <html lang="en" className="h-full scroll-smooth ">
      <body
        className={cn(
          "relative h-full font-sans antialiased overflow-x-hidden",
          inter.className
        )}
      >
        <div className="px-16">
          <Sidebar />
          <div className="flex-grow flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
