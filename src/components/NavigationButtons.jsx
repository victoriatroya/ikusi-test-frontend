import React from "react";

const NavigationButtons = ({
  showBack,
  showReset,
  onBack,
  onReset,
}) => {
  if (!showBack && !showReset) return null;

  return (
    <div className="flex gap-2">
      {showBack && (
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Atrás
        </button>
      )}
      {showReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
        >
          Resetear
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
