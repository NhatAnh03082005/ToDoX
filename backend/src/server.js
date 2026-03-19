import express from "express";
import taskRouter from "./routers/taskRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }),
  );
}

app.use("/api/task", taskRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
