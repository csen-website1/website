import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/dist/server/api-utils";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
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
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/admin";
    },
  },
  secret: process.env.AUTH_SECRET,
});
