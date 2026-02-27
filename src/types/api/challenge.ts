export type ChallengeListResponse = {
  data: ChallengeResponse[];
  limit: number;
  items: number;
  totalItems: number;
  page: number;
  totalPages: number;
};

export type ChallengeResponse = {
  id: string;
  title: string;
  description: string | null;
  schedule: string;
  value: number;
  unit: string;
  validationCriteria: string;
  createdAt: string;
  updatedAt: string;
};

export type ChallengeCreateRequest = {
  title: string;
  description: string | null;
  schedule: string;
  value: number;
  unit: string;
  validationCriteria: string;
};