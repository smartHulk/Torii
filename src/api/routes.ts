import { ApiRoute } from "@/types/api/api"
import { LoginRequest,LoginResponse,MeResponse } from "@/types/api/auth";
import { ChallengeCreateRequest,ChallengeResponse,ChallengeListResponse } from "@/types/api/challenge";

export const API_ROUTES = {
  auth: {
    login: {
      path: "/login",
      auth: false,
      method: "POST",
    } as ApiRoute<LoginRequest, LoginResponse>,
  },

  user: {
      me: {
      path: "/me",
      auth: true,
      method: "GET",
    } as ApiRoute<void, MeResponse>,
  },

  challenge: {
    list: {
      path: "/challenge",
      auth: true,
      method: "GET",
    } as ApiRoute<void, ChallengeListResponse>,

    create: {
      path: "/challenge",
      auth: true,
      method: "POST",
    } as ApiRoute<ChallengeCreateRequest, ChallengeResponse>,

    read: (id: string) =>
      ({
        path: `/challenge/${id}`,
        auth: true,
        method: "GET",
      } as ApiRoute<void, ChallengeResponse>),
  },

    enum: {
    challenge_unit: {
      path: "/enum/challenge_unit",
      auth: true,
      method: "GET",
    } as ApiRoute<void, Array<string>>,

    periodicity: {
      path: "/enum/periodicity",
      auth: true,
      method: "GET",
    } as ApiRoute<void, Array<string>>,

    validation_criteria: {
        path: "/enum/validation_criteria",
        auth: true,
        method: "GET",
      } as ApiRoute<void, Array<string>>,
  },
} as const;