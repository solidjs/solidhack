import { SolidAuth, type SolidAuthConfig } from "@solid-mediakit/auth";
import GitHub from "@auth/core/providers/github";

declare module "@auth/core/types" {
  export interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOpts: SolidAuthConfig = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: false,
  basePath: import.meta.env.VITE_AUTH_PATH,
};

export const { GET, POST } = SolidAuth(authOpts);
