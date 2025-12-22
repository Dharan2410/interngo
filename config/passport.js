import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../src/modules/user/user_model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,      
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/interngo/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const picture = profile.photos?.[0]?.value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name,
            email,
            profileImage: picture,
            authProvider: "google",
            role: "intern", // default
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
