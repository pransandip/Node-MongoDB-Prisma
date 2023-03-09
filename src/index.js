import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import printServerLogs from "../helpers/Logs/server.logger.js";
import { userRouter } from "../routes/user.routes.js";
import { postRouter } from "../routes/post.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/post", postRouter);

/*---- Welcome Screen ----*/
app.get("/", (req, res) => {
  printServerLogs(req);
  return res.status(200).json({ msg: "Healthy" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Node-mongodb-prisma: server is running on port ${PORT}.`);
});
