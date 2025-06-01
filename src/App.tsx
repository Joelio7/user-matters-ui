import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          User Matters
        </h1>
        <p className="text-gray-600 mb-8">
          React + TypeScript + Vite + Tailwind CSS
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
          <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;