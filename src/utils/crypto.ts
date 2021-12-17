import sha256 from "crypto-js/sha256";

export function digestMessage(message: string) {
  return sha256(message).toString();
}
