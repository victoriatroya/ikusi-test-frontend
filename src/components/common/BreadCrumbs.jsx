import React from "react";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-1 text-sm flex-wrap bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg px-4 py-2.5 shadow-sm">
      <svg
        className="w-4 h-4 text-indigo-500 mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {index > 0 && (
            <svg
              className="w-4 h-4 text-indigo-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          <span
            className={
              index === items.length - 1
                ? "font-semibold text-indigo-700 bg-white px-2.5 py-1 rounded-md shadow-sm"
                : "text-gray-600 hover:text-indigo-600 transition-colors"
            }
          >
            {item}
          </span>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
