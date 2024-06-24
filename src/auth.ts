import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any | null> {
        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          return { id: "1", name: "Admin", role: "admin" };
        } else {
          throw new InvalidLoginError();
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
