import React from "react";
import { ICONS } from "../../constants/card.jsx";

const Card = ({ title, value, color = "blue", icon = "users" }) => {
  const colorMap = {
    blue: "bg-blue-800",
    green: "bg-green-700",
    purple: "bg-purple-700",
    orange: "bg-orange-700",
    red: "bg-red-700",
    yellow: "bg-yellow-500",
    indigo: "bg-indigo-700",
    pink: "bg-pink-700",
  };

  const textColorMap = {
    blue: "text-blue-100",
    green: "text-green-100",
    purple: "text-purple-100",
    orange: "text-orange-100",
    red: "text-red-100",
    yellow: "text-yellow-100",
    indigo: "text-indigo-100",
    pink: "text-pink-100",
  };

  return (
    <div className={`${colorMap[color]} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${textColorMap[color]} text-lg font-medium mb-1`}>
            {title}
          </p>
          <p className="text-2xl lg:text-3xl font-bold">{value}</p>
        </div>
        <div className="bg-white/20 p-3 rounded-lg">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {ICONS[icon]}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Card;
