import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      username: string | null;
      firstName: string | null;
      lastName: string | null;
      roles: string[];
    };
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    roles: string[];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    email: string;
    name: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    roles: string[];
    accessToken: string;
  }
}
