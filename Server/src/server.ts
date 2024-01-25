const http = require("http");
import { config } from "dotenv";

config();

const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
