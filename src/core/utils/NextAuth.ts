import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { RoutesName } from "./constants";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: any
  }
}

export const authOptions : AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token; // Save Google token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Attach token to session
      return session;
    },
  },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: RoutesName.login
    }
}