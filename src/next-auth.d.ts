import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      username?: string;
      firstName?: string;
      lastName?: string;
      roles?: string[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    userId?: string;
    email?: string;
    name?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
  }
}
