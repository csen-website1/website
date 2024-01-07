import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import nextAuth from "next-auth";
import { config } from "./auth";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
});

export { handler as GET, handler as POST };

export const authOptions = nextAuth(config);
