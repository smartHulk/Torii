export type MeResponse = {
  id: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  roles: string[];
};


export type LoginResponse = {
  token: string;
};


export type LoginRequest = {
  email: string;
  password: string;
};