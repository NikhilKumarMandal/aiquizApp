import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(req: NextRequest) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `Generate a multiple-choice quiz question in valid JSON format only. Do NOT include Markdown formatting. 
   Example:
        {
            "question": "What is the capital of France?",
            "options": ["Berlin", "Paris", "Madrid", "Rome"],
            "correctAnswer": "Paris"
        }
        {
            "question": "What is a correct syntax to output "Hello World" in Python?",
            "options": ["print("Hello World")", "p("Hello")", "echo "hello world"", "echo("hello world")"],
            "correctAnswer": "Paris"
        }    
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response.text();

    console.log("Raw Response:", response); 
    
        const cleanedResponse = response.replace(/```json|```/g, "").trim();

        const quizData = JSON.parse(cleanedResponse); 

    return NextResponse.json({ response: response.trim() });
  } catch (error) {
    console.error("Persona API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch completion" },
      { status: 500 }
    );
  }
}