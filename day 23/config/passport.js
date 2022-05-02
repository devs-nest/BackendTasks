const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const User = require("../model/User");

// setup passport for user veification using local strategy
module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          // user not found
          if (!user)
            return done(null, false, { message: "email is not registered" });

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          // incorrect password
          if (!isPasswordCorrect)
            return done(null, false, {
              message: "email or password is not correct",
            });

            // check if user is verified 
          if (user.status === "Pending")
            return done(null, false, {
              message: "User is not verified, please check your email",
            });

          return done(null, user);
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ id }, (err, user) => {
      return done(err, user);
    });
  });
};
