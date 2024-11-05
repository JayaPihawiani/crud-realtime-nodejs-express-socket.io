import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import db from "./config/Database.js";
import productRouter from "./router/ProductRouter.js";
// import Product from "./models/ProductModel.js";

try {
  await db.authenticate();
  //   Product.sync();
} catch (error) {
  console.log(error);
}

dotenv.config();
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", productRouter);

io.on("connection", (socket) => {
  console.log("User connected, " + socket.id);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("User disconnected, " + socket.id);
  });
});

server.listen(port, () => console.log("server running at port " + port));

export default io;
