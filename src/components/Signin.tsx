"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { Session } from "inspector";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function Signin() {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-2/12">
      <AuthButton />
      <hr className="my-4" />
      <ul>
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href="/getData">
          <li className={pathname === "/getData" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            GetData
          </li>
        </Link>
      </ul>
    </div>
  );
}
