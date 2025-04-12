// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Quiz App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Test your knowledge with exciting quiz questions! Get started by clicking the button below.
        </p>
        <Link
          href="/quiz"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
