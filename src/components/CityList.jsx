import React from "react";

const CityList = ({ country, onCityClick }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Ciudades en {country.name}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {country.cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onCityClick(city)}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 rounded-xl p-6 text-left transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              {city.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {city.offices.length} oficina
              {city.offices.length !== 1 ? "s" : ""}
            </p>
            <p className="text-gray-600 text-sm">
              {city.offices.reduce((acc, office) => acc + office.employees, 0)}{" "}
              empleados
            </p>
            <div className="mt-4 flex justify-end">
              <svg
                className="w-6 h-6 text-blue-600"
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
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityList;
