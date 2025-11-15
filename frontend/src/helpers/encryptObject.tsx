import CryptoJS from "crypto-js";

export function encryptObject(obj) {
  const ivLength = parseInt(import.meta.env.VITE_CONTRACT_IV_LENGTH || "0", 10);
  if (isNaN(ivLength) || ivLength <= 0) {
    throw new Error("IV_LENGTH must be a valid number greater than 0.");
  }

  const secretKeyHex = import.meta.env.VITE_CONTRACT_SECRET_KEY;
  if (!secretKeyHex) {
    throw new Error("SECRET_KEY must be defined.");
  }

  const secretKey = CryptoJS.enc.Hex.parse(secretKeyHex);
  if (secretKey.words.length !== 8) {
    throw new Error("SECRET_KEY must contain exactly 32 bytes.");
  }

  const iv = CryptoJS.lib.WordArray.random(ivLength);

  const json = JSON.stringify(obj);
  const encrypted = CryptoJS.AES.encrypt(json, secretKey, {
    iv: iv,
  }).toString();

  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    content: encrypted,
  };
}
