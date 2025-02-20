import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2";
import { prisma } from "../index.js";
import config from "../config/config.js";

// Configure Passport OAuth2 strategy
passport.use(
    new OAuth2Strategy.Strategy(
        {
            clientID: config.google.clientId,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackUrl,
            passReqToCallback: true,
        },
        async (request: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                let user = await prisma.user.findUnique({
                    where: { googleId: profile.id },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            profilePicture: profile.photos[0].value,
                            accessToken,
                            refreshToken,
                        },
                    });
                } else {
                    user = await prisma.user.update({
                        where: { googleId: profile.id },
                        data: { accessToken, refreshToken },
                    });
                }

                return done(null, user);
            } catch (error) {
                console.error("OAuth2 verification error:", error);
                return done(error, null);
            }
        }
    )
);

// Serialize user for the session
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;