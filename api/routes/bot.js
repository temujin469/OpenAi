import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import asyncHandler from "express-async-handler";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").post(
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

router.route("/models").get(
  asyncHandler(async (req, res, next) => {
    const response = await openai.listEngines();
    // console.log()
    res.status(200).json({
      models: response.data,
    });
  })
);

export default router;
