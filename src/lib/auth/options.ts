import type { NextAuthOptions } from "next-auth";
import { providers } from "@/lib/auth/providers";
import { callbacks } from "@/lib/auth/callbacks";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  providers,
  callbacks,
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.error("[NextAuth][error]", code, metadata);
    },
    warn(code) {
      console.warn("[NextAuth][warn]", code);
    },
    debug(code, metadata) {
      console.log("[NextAuth][debug]", code, metadata);
    },
  },
};