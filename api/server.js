import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

dotenv.config();

import postRoutes from "./routes/posts.js";
import dalleRoutes from "./routes/dalle.js";
import botRoutes from "./routes/bot.js";

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/genImage", dalleRoutes);
app.use("/api/v1/bot", botRoutes);

// console.log(process.env.OPENAI_API_KEY);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

const port = 8000;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
