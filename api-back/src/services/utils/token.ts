// @ts-ignore
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";

/**
 * Helper pour récupérer une variable d'env obligatoire
 */
function getSecretOrThrow(envKey: string): string {
  const secret = process.env[envKey];
  if (!secret) throw new Error(`Missing environment variable: ${envKey}`);
  return secret;
}

/**
 * Génère un token générique
 */
function createToken(
  id: Types.ObjectId | string,
  envKey: string,
  duration: string = "30d"
): string {
  const secret = getSecretOrThrow(envKey);
  const payload: JwtPayload = { id: id.toString() };
  const options: SignOptions = { expiresIn: duration };
  return jwt.sign(payload, secret, options);
}

/**
 * Vérifie un token générique
 */
function verifyToken(token: string, envKey: string): JwtPayload | null {
  const secret = process.env[envKey];
  if (!secret) return null;
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Token Builder
 */
export function createTokenBuilder(id: Types.ObjectId, duration?: string): string {
  return createToken(id, "SECRET_TOKEN_BUILDER", duration);
}

export function verifyAccessTokenBuilder(token: string) {
  return verifyToken(token, "SECRET_TOKEN_BUILDER");
}

/**
 * Token HederaApp
 */
export function createTokenHederaApp(id: Types.ObjectId, duration?: string): string {
  return createToken(id, "SECRET_TOKEN_HEDERA_APP", duration);
}

export function verifyAccessTokenHederaApp(token: string) {
  return verifyToken(token, "SECRET_TOKEN_HEDERA_APP");
}
