"use server";
import { signIn, signOut } from "@/auth";
import { Button } from "../ui/button";
import { auth } from "@/auth";

export default async function AuthButton() {
  const session = await auth();
  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    );
  }
  return (
    <Button onClick={() => signIn()} className="bg-red-500 hover:bg-red-600">
      Sign in
    </Button>
  );
}
