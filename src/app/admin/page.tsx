import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await auth();
  console.log(user);
  if (!user) redirect("/api/auth/signin");

  return (
    <div>
      <Sidebar />
    </div>
  );
}
