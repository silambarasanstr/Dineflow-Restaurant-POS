import { askAI } from "../services/aiService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await askAI(message);

    res.status(200).json({
      success: true,
      message: response,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      success: false,
      message: "AI request failed",
      error: error.message,
    });
  }
};