const express = require("express");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const helmet = require("helmet");
const apiRouter = require("./routes/api.router");

import "reflect-metadata";
import connectPgSimple from "connect-pg-simple";
import { AppDataSource } from "./data-source";

const app = express();
app.use(express.json());
startDBConnection();

// const pgSession = connectPgSimple(session);

const PORT: number = parseInt(process.env.DB_PORT!) || 5432;

app.use(helmet());

app.use(
  cors({
    origin: [process.env.DEV_CLIENT_URL],
    credentials: true,
  })
);
app.use(morgan("combined"));

// app.use(
//   session({
//     store: new pgSession({
//       conObject: {
//         user: process.env.DB_USER,
//         host: process.env.DB_HOST,
//         database: process.env.DB_DATABASE,
//         password: process.env.DB_PASSWORD,
//         port: PORT,
//       },
//     }),
//     secret: "tu-secreto-aqui",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.use("/", apiRouter);

async function startDBConnection() {
  await AppDataSource.initialize()
    .then(() => {})
    .catch((error) => console.log(error));
}

module.exports = app;
