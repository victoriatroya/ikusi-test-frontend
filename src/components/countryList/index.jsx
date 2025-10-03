import React from "react";

const CountryList = ({ countries, onCountryClick }) => {
  const calculateCountryRevenue = (country) => {
    return country.cities.reduce(
      (totalRevenue, city) =>
        totalRevenue +
        city.offices.reduce((cityRevenue, office) => cityRevenue + office.revenue, 0),
      0,
    );
  };

  const formatRevenue = (revenue) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(revenue);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Países</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <button
            key={country.id}
            onClick={() => onCountryClick(country)}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-2 border-indigo-200 rounded-xl p-6 text-left transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <h3 className="text-xl font-bold text-indigo-900 mb-2">
              {country.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {country.cities.length} ciudad
              {country.cities.length !== 1 ? "es" : ""}
            </p>
            <p className="text-gray-600 text-sm">
              {country.cities.reduce(
                (acc, city) => acc + city.offices.length,
                0,
              )}{" "}
              oficina
              {country.cities.reduce(
                (acc, city) => acc + city.offices.length,
                0,
              ) !== 1
                ? "s"
                : ""}
            </p>
            <p className="text-indigo-700 font-semibold text-sm mt-2">
              Ingreso: {formatRevenue(calculateCountryRevenue(country))}
            </p>
            <div className="mt-4 flex justify-end">
              <svg
                className="w-6 h-6 text-indigo-600"
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

export default CountryList;
