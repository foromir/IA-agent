import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import client from "../db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client, {
    collections: {
      Accounts: "accounts",
      Sessions: "sessions",
      Users: "users",
      VerificationTokens: "verificationTokens",
    },
    databaseName: process.env.DB_NAME,
  })  as Adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // This is not recommended for production apps
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
  },
  // basePath: "/login",
  callbacks: {
    jwt({ token, user, }) { // profile, session, account
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.user as any;
      return session;
    },
    // authorized({ request, auth }) {
    //     const { pathname } = request.nextUrl
    //     if (pathname === "/middleware-example") return !!auth
    //     return true
    // },
    // jwt({ token, trigger, session, account }) {
    //     if (trigger === "update") token.name = session.user.name
    //     if (account?.provider === "keycloak") {
    //         return { ...token, accessToken: account.access_token }
    //     }
    //     return token
    // },
    // async session({ session, token }) {
    //     if (token?.accessToken) session.accessToken = token.accessToken

    //     return session
    // },
  },
});
