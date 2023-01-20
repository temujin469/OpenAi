import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import asyncHandler from "express-async-handler";
import { Configuration, OpenAIApi } from "openai";
import MyError from "./utils/MyError.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAIApi(configuration);

app.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      message: "hello",
    });
  })
);

app.post(
  "/genImage",
  asyncHandler(async (req, res, next) => {
    const { prompt } = req.body;
    console.log(prompt);
    const response = await openai.createImage({
      prompt: prompt,
      n: 5,
      size: "1024x512",
    });
    res.status(200).json({
      data: response.data,
    });
  })
);

app.get(
  "/models",
  asyncHandler(async (req, res, next) => {
    const response = await openai.listEngines();
    // console.log()
    res.status(200).json({
      models: response.data,
    });
  })
);

app.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { prompt, model } = req.body;

    console.log("prompt==>", { prompt, model });
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      // stop: ['"""'],
    });

    !response && MyError(400, "aldaa garlaa");

    res.status(200).json({
      data: response.data.choices[0].text,
    });
  })
);
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
