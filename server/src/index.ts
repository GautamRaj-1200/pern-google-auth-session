import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app: Express = express();

// Environment variable validation
const PORT = process.env.PORT || 3000;
if (!process.env.PORT) {
    console.error("Error: PORT environment variable is not set");
    process.exit(1);
}

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Health check route
app.get("/health-check", (req, res) => {
    res.send("Server Health: OK");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
