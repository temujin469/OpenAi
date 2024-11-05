import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import asyncHandler from "express-async-handler";

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey:
    "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", // Replace with your actual OpenAI API key
});

router.route("/").post(
  asyncHandler(async (req, res, next) => {
    const { prompt, model } = req.body;

    console.log("prompt==>", { prompt, model });

    // const response = await openai.createCompletion({
    //   model: model | "gpt-3.5-turbo",
    //   prompt: `${prompt}`,
    //   temperature: 0.7,
    //   max_tokens: 3000,
    //   top_p: 1,
    //   frequency_penalty: 0.5,
    //   presence_penalty: 0,
    //   // stop: ['"""'],
    // });

    const response = await openai.chat.completions.create({
      model: model || "gpt-3.5-turbo", // Use GPT-3.5 Turbo
      messages: [{ role: "user", content:`${prompt}`  }],
      max_tokens: 150,
      temperature: 0.7,
    });

    !response && MyError(400, "aldaa garlaa");

    res.status(200).json({
      // data: response.data.choices[0].text,
      data: response.choices[0].message.content.trim(),
    });
  })
);

router.route("/models").get(
  asyncHandler(async (req, res, next) => {
    const response = await openai.models.list();
    // console.log()
    res.status(200).json({
      models: response.data,
    });
  })
);

export default router;
