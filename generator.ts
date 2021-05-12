import { generateKeyPairSync } from "crypto";
import fs from "fs";
import path, { join } from "path";
import { passphrase } from "./config";

export const generator = (path: string = "") => {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase,
    },
  });
  writeFileSyncRecursive(join(path, ".private.key"), privateKey);
  writeFileSyncRecursive(join(path, ".public.key.pem"), publicKey);

  console.log("Private and Public Keys are generated");
};

const writeFileSyncRecursive = (filename: string, content: any) => {
  const folders = filename.split(path.sep).slice(0, -1);
  if (folders.length > 0) {
    // create folder path if it doesn't exist
    folders.reduce((last, folder) => {
      const folderPath = last ? last + path.sep + folder : folder;
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      return folderPath;
    });
  }
  fs.writeFileSync(filename, content);
};
