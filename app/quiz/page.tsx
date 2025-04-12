"use client";

import { useEffect, useState } from "react";

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: string; // Update the field name to match the API response
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const res = await fetch("/api/quiz");
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data = await res.json();
      const quizData = JSON.parse(data.response); // Parse the response field
      setQuiz(quizData); // Set the parsed data as the quiz
    } catch (err) {
      console.error("Failed to fetch quiz:", err);
      setQuiz(null); // In case of failure, set quiz to null
    } finally {
      setLoading(false); // Set loading to false once fetch is done
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading quiz...</p>;
  }

  if (!quiz) {
    return <p className="text-center text-gray-500">Quiz data not available.</p>;
  }

  if (!quiz.options || quiz.options.length === 0) {
    return <p className="text-center text-gray-500">Quiz options are missing or empty.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">{quiz.question}</h2>
        <ul className="grid gap-3">
          {quiz.options.map((option, index) => {
            const isCorrect = option === quiz.correctAnswer;
            const isSelected = option === selected;

            return (
              <li
                key={index}
                onClick={() => setSelected(option)}
                className={`border px-4 py-2 rounded-md cursor-pointer transition text-black ${
                  selected
                    ? isCorrect
                      ? "bg-green-200 border-green-600"
                      : isSelected
                      ? "bg-red-200 border-red-600"
                      : "opacity-60"
                    : "hover:bg-gray-100"
                }`}
              >
                {option}
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            setSelected(null);
            fetchQuiz(); // Fetch new quiz on next question
          }}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
        >
          Next Question
        </button>
      </div>
    </div>
  );
}

