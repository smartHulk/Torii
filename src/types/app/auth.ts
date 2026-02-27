
export type UserConnected = {
  id: string;
  email: string;
  name: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  roles: string[];
  accessToken: string;
};
