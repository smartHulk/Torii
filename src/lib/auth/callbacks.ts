import type { NextAuthOptions } from "next-auth";

export const callbacks: NextAuthOptions["callbacks"] = {
  
  async jwt({ token, user }) {
    if (user) {
      token.userId = user.id;
      token.email = user.email;
      token.name = user.name;
      token.username = user.username;
      token.firstName = user.firstName;
      token.lastName = user.lastName;
      token.roles = user.roles;
      token.accessToken = user.accessToken;
    }
    return token;
  },

  async session({ session, token }) {
    session.user = {
      id: token.userId,
      email: token.email,
      name: token.name,
      username: token.username,
      firstName: token.firstName,
      lastName: token.lastName,
      roles: token.roles,
    };
    session.accessToken = token.accessToken;
    return session;
  },
};
