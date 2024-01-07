import GitHubProvider from "next-auth/providers/github";

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // your configs
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

export default NextAuth(authOptions);
