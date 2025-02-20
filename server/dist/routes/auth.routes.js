import express from "express";
import passport from "passport";
import config from "../config/config.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();
// Google OAuth2 login route : User clicks "Login with Google"
router.get("/google", passport.authenticate("google", {
    scope: [
        "profile",
        "email",
    ],
}));
// Google OAuth2 callback route : Google redirects back with code
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/auth/login-failed",
}), (req, res) => {
    res.redirect(`${config.clientUrl}/dashboard`);
});
// Get current user
router.get("/user", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.json(req.user);
});
// Login failure route
router.get("/login-failed", (req, res) => {
    res.status(401).json({ error: "Failed to authenticate with Google" });
});
// Logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ error: "Error logging out" });
        }
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
            }
            res.redirect(config.clientUrl);
        });
    });
});
export default router;
