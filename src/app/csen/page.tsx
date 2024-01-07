import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function page() {
  const session = await getServerSession();

  if (session?.user?.name !== process.env.CSEN_ADMIN)
    redirect("api/auth/signin");

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1>you are CSEN ADMIN</h1>
    </div>
  );
}
