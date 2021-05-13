export const encode = (payload: {
  username: string;
  password: string;
}): string => {
  const str = `${payload.username}:${payload.password}`;
  return Buffer.from(str).toString("base64");
};

export const decode = (
  base64: string
): { username: string; password: string } => {
  const str = Buffer.from(base64, "base64").toString();
  const s = str.split(":");

  if (s.length < 2 || s.length > 2) throw Error("Invalid Base64 String");

  return {
    username: s[0],
    password: s[1],
  };
};
