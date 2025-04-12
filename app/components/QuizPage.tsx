"use client";

import { useEffect, useState } from "react";

interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null); 
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  // Fetch quiz data
const fetchQuiz = async () => {
  try {
    const res = await fetch("/api/quiz");
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const data: Quiz = await res.json();
    setQuiz(data);
  } catch (err) {
    console.error("Failed to fetch quiz:", err);
    setQuiz(null);  // Optionally handle the error by setting quiz to null
  } finally {
    setLoading(false);  // Ensure loading state is turned off even in case of error
  }
};

  // Fetch quiz data on mount
  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) {
    // If quiz is loading, render loading state
    return <p className="text-center text-gray-500">Loading quiz...</p>;
  }

  if (!quiz) {
    // Handle case when quiz data is still not available
    return <p className="text-center text-gray-500">No quiz available</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">{quiz.question}</h2>
        <ul className="grid gap-3">
          {quiz.options.map((option, index) => {
            const isCorrect = option === quiz.answer;
            const isSelected = option === selected;

            return (
              <li
                key={index}
                onClick={() => setSelected(option)}
                className={`border px-4 py-2 rounded-md cursor-pointer transition ${
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