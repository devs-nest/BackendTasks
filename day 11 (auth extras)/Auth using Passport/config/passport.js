const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// Initializing Local Strategy
module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });

          if (!user)
            return done(null, false, { message: "Username is not registered" });

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordCorrect)
            return done(null, false, {
              message: "Username or Password does not match",
            });

          return done(null, user);
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  // Serialize User - Setting Id as cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize User - Retrieving data using id from cookie
  passport.deserializeUser((id, done) => {
    User.findOne({ id }, (err, user) => {
      return done(err, user);
    });
  });
};
