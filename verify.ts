import { readFileSync } from "fs";
import * as jwt from "jsonwebtoken";
import { join } from "path";
import { issuer } from "./config";

export const verify = (token: string, options: any): any | object => {
  try {
    const publicKey = readFileSync(join(options.path, ".public.key.pem"));

    const decodedToken = jwt.verify(token, publicKey, {
      issuer,
      algorithms: ["RS256"],
      maxAge: "15 day",
    });

    return decodedToken;
  } catch (e: any) {
    console.error(e);
    return false;
  }
};
