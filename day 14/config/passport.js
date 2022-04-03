const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.id });

    // if user does not exist
    if (!user) return done(null, false);

    // if user exists, and doesn't have auth token
    if (user.token == " ") return done(null, false);

    // successfully authenticated
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
