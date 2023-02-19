import axios from "axios";
import { surpriseMePrompts } from "../constants";

export default function getRandomPrompt(prompt: any): string {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}
