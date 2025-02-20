import dotenv from "dotenv";
dotenv.config();
const config = {
    port: Number(process.env.PORT) || 3000,
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
    sessionSecret: process.env.SESSION_SECRET || "",
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackUrl: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
    },
};
// Validate required environment variables
const validateConfig = () => {
    if (!config.sessionSecret) {
        throw new Error("SESSION_SECRET is required");
    }
    if (!config.google.clientId || !config.google.clientSecret) {
        throw new Error("Google OAuth credentials are required");
    }
};
validateConfig();
export default config;
