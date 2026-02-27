import Credentials from "next-auth/providers/credentials";
import { LoginResponse, MeResponse } from "@/types/api/auth"
import { UserConnected } from "@/types/app/auth"
import { getDisplayName } from "@/lib/auth/getDisplayName";

export const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email;
      const password = credentials?.password;
      if (!email || !password) return null;

  const loginResponse = await fetch(`${process.env.API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!loginResponse.ok) {
    const errorText = await loginResponse.text();
    throw new Error(`Login failed ${loginResponse.status}: ${errorText}`);
  }

  const loginData = (await loginResponse.json()) as LoginResponse;
      
      // 2) /me -> user complet
  const meResponse = await fetch(`${process.env.API_URL}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginData.token}`,
          "Content-Type": "application/json",
        }
      });

      if (!meResponse.ok) {
        const errorText = await meResponse.text();
        throw new Error(`Login failed ${meResponse.status}: ${errorText}`);
      }

      const meData = (await meResponse.json()) as MeResponse;

      const userConnected: UserConnected = {
        id: meData.id,
        email: meData.email,
        username: meData.username ?? null,
        firstName: meData.firstName ??  null,
        lastName: meData.lastName ?? null,
        roles: meData.roles ?? [],
        accessToken: loginData.token,
        name: getDisplayName({
          username: meData.username,
          firstName: meData.firstName,
          lastName: meData.lastName,
          email: meData.email,
        }),
      };
      return userConnected;
    },
  }),
];
