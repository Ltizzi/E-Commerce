const express = require("express");
const cors = require("cors");
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const morgan = require("morgan");
const helmet = require("helmet");
const apiRouter = require("./routes/api.router");
const types = require("pg").types;
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Request, Response } from "express";
import { UserService } from "./services/UserService";
import { User } from "./models/User";
import { authenticateJWT } from "./utils/authMiddleware";
import { UserMapper } from "./dto/mappers/user.mapper";

const app = express();
const userServ = new UserService();
const userMapper = new UserMapper();

app.use(express.json());
startDBConnection();

const PORT: number = parseInt(process.env.DB_PORT!) || 5432;

app.use(helmet());

app.use(
  cors({
    origin: [process.env.DEV_CLIENT_URL],
    credentials: true,
  })
);
app.use(morgan("combined"));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        //  console.log("DATA FROM GOOGLE: ", profile);
        const name = profile.name?.givenName;
        const lastname = profile.name?.familyName;
        const username = profile.displayName.split(" ");
        const user = {
          email: profile.emails![0].value,
          username: username[0],
          name: name,
          lastname: lastname,
          avatar: profile.photos![0].value,
          roles: ["USER"],
        };
        console.log("User: ", user);
        const alreadyUser = (await userServ.getUserByEmail(user.email)) as User;
        if (!alreadyUser) {
          await userServ.saveUser(user as User);
        }
        const tokenUserData = {
          email: user.email,
          roles: user.roles,
        };
        const token = jwt.sign(tokenUserData, process.env.JWT_SECRET!, {
          expiresIn: 3600 * 12,
        });
        return done(null, token);
      } catch (err: any) {
        return done(err);
      }
    }
  )
);

types.setTypeParser(1700, function (val: any) {
  return parseFloat(val);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req: Request, res: Response) => {
    //const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET!);
    const url = process.env.DEV_CLIENT_URL;
    res.redirect(url + `/token?token=${req.user}`);
  }
);

app.get("/auth/user", authenticateJWT, async (req: Request, res: Response) => {
  const userInfo = req.user as any;
  if (userInfo) {
    const user = await userServ.getUserByEmail(userInfo.email as string);
    return res.status(200).json(userMapper.toUserResponse(user as User));
  } else return res.status(404).json({ error: "You are not logged in!" });
});

app.use("/", apiRouter);

async function startDBConnection() {
  await AppDataSource.initialize()
    .then(() => {})
    .catch((error) => console.log(error));
}

module.exports = app;
