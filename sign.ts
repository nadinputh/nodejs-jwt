import { readFileSync } from "fs";
import * as jwt from "jsonwebtoken";
import { join } from "path";
import { issuer, passphrase } from "./config";

export const issue = (
  payload: any,
  options: { keyId: string; path: string }
) => {
  const privateKey = readFileSync(join(options.path, ".private.key"));
  return jwt.sign(
    payload,
    {
      key: privateKey,
      passphrase,
    },
    {
      algorithm: "RS256",
      expiresIn: "15 days",
      issuer: issuer,
      keyid: options.keyId,
    }
  );
};
