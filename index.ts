// Generate RSA Keys
import * as gen from "./generator";

// Issue JWT Token
import * as sign from "./sign";

// Verify JWT Token
import * as ver from "./verify";

export const generator = gen.generator;
export const issue = sign.issue;
export const verify = ver.verify;
