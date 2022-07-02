import express from "express";
import cookieParser from "cookie-parser";
import user from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

app.use(cors());
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send("React native Todo App Server is running");
});
