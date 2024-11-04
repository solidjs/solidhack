import { type SolidAuthConfig } from "@solid-mediakit/auth";
import GitHub from "@auth/core/providers/github";

declare module "@auth/core/types" {
  export interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
  }
}

export const authOpts: SolidAuthConfig = {
  callbacks: {
    jwt({ token, user, profile }) {
      if (user) token.user = user;
      if (profile) token.profile = profile;
      return token;
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        username: (token.profile as any).login,
        id: (token.profile as any).id,
      } as any;
      return session;
    },
  },
  debug: false,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  basePath: import.meta.env.VITE_AUTH_PATH,
};
