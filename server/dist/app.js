import express from "express";
const app = express();
import session from "express-session";
import config from "./config/config.js";
import cors from "cors";
// Middelware Setup
app.use(cors({
    origin: config.clientUrl,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express.json());
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
}));
app.get('/health-check', (req, res) => {
    res.json({ "message": "Server started" });
});
export default app;
// Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());
// import authRoutes from "./routes/auth.routes.js";
// Routes
//app.use("/auth", authRoutes);
