import { auth } from "@/auth";

import { redirect } from "next/navigation";

import Emails from "@/components/messages";
import CreateTesto from "@/components/add-testimonials";
import Urls from "@/components/Urls";

export default async function Page() {
  const user = await auth();
  if (!user) redirect("/api/auth/signin");

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Emails />
      </div>
      <CreateTesto />
      <div>
        <Urls />
      </div>
    </main>
  );
}
