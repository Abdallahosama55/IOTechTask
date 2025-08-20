"use client";

import React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = "We couldn’t fetch the data. Please try again.",
  onRetry,
}) => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center min-h-screen bg-brown-900 text-center px-4">
        {/* Error Icon */}
        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-100">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85L21 17V7a2 2 0 00-1.85-1.995L19 5H5a2 2 0 00-1.995 1.85L3 7v10c0 1.054.816 1.918 1.85 1.995L5 19z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-gray-300 mb-4">{message}</p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 rounded-lg bg-[#A0522D] text-white font-medium hover:bg-[#8B4513] transition"
          >
            Retry
          </button>
        )}
      </div>
    </section>
  );
};

export default ErrorState;
