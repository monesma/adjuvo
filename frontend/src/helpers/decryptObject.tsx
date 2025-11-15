import CryptoJS from "crypto-js";

export function decryptObject(encryptedData: { iv: string; content: string }) {
  const { iv, content } = encryptedData;

  const secretKeyHex = import.meta.env.VITE_CONTRACT_SECRET_KEY;
  if (!secretKeyHex) {
    throw new Error("SECRET_KEY must be defined.");
  }

  const secretKey = CryptoJS.enc.Hex.parse(secretKeyHex);

  if (secretKey.words.length !== 8) {
    throw new Error("SECRET_KEY must contain exactly 32 bytes.");
  }

  const ivWordArray = CryptoJS.enc.Hex.parse(iv);

  try {
    const decrypted = CryptoJS.AES.decrypt(content, secretKey, {
      iv: ivWordArray,
    });

    const decryptedJson = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedJson) {
      throw new Error("Decryption failed.");
    }

    return JSON.parse(decryptedJson);
  } catch {
    throw new Error("Error during decryption: invalid data or incorrect key.");
  }
}
