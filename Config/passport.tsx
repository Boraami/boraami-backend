import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import mongoose from "mongoose";
import { PassportStatic } from "passport";
import User from "../Models/user"; //
import dotenv from "dotenv";

dotenv.config();

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "mySecret" // Using environment variable or a default value
};

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => done(err, false)); // Pass error to done callback
    })
  );
};
