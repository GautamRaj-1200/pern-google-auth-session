var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2";
import { prisma } from "../index.js";
import config from "../config/config.js";
// Configure Passport OAuth2 strategy
passport.use(new OAuth2Strategy.Strategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
    passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield prisma.user.findUnique({
            where: { googleId: profile.id },
        });
        if (!user) {
            user = yield prisma.user.create({
                data: {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    profilePicture: profile.photos[0].value,
                    accessToken,
                    refreshToken,
                },
            });
        }
        else {
            user = yield prisma.user.update({
                where: { googleId: profile.id },
                data: { accessToken, refreshToken },
            });
        }
        return done(null, user);
    }
    catch (error) {
        console.error("OAuth2 verification error:", error);
        return done(error, null);
    }
})));
// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize user from the session
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id },
        });
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
export default passport;
