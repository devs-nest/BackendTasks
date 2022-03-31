const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// Create new Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientID: process.env.GOOGLE_CLIENT_ID,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists
        const isExistingUser = await User.findOne({ googleId: profile.id });

        // If exists return data of existing user
        if (isExistingUser) {
          return done(null, isExistingUser);
        }

        // If not existing, Create new User and save 
        const user = new User({
          name: profile.displayName,
          googleId: profile.id,
        });

        await user.save();

        return done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

// serialize user - setting id as cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user - getting id from cookie and use it to find user
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    return done(err, user);
  });
});
