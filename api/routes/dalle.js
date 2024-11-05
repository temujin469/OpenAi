import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);\

const openai = new OpenAI({
  apiKey:
    "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", // Replace with your actual OpenAI API key
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("prompt: ", prompt);

    // const aiResponse = await openai.createImage({
    //   prompt,
    //   n: 1,
    //   size: "1024x1024",
    //   response_format: "b64_json",
    // });

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });


    const image = aiResponse.data[0].b64_json; // Updated path for the data

    // console.log("res: ",image)


    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error,
    });
  }
});

export default router;
