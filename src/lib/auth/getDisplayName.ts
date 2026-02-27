type Identity = {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
};

export function getDisplayName({
  username,
  firstName,
  lastName,
  email,
}: Identity): string {
  if (username && username.trim().length > 0) {
    return username;
  }

  const fullName = [firstName, lastName]
    .filter((v): v is string => Boolean(v && v.trim()))
    .join(" ");

  if (fullName.length > 0) {
    return fullName;
  }

  return email;
}
