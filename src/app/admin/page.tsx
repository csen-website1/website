import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { LockClosedIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Emails from "@/components/messages";
import CreateTesto from "@/components/add-testimonials";

export default async function Page() {
  const user = await auth();
  console.log(user);
  if (!user) redirect("/api/auth/signin");

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Emails />
      </div>
      <CreateTesto />
    </main>
  );
}
