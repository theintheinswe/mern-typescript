import { getEnv } from "../utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api"),
  MONGO_URI: getEnv("MONGO_URI", ""),

  JWT_SECRET: getEnv("JWT_EXPIRATION_SECONDS"),
  JWT_EXPIRATION_SECONDS: getEnv("JWT_EXPIRATION_SECONDS"),
  JWT_ALGORITHM: getEnv("JWT_ALGORITHM", "HS256"),
  BCRYPT_SALTROUNDS: getEnv("BCRYPT_SALTROUNDS"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
});

export const config = appConfig();
