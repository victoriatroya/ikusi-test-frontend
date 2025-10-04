import React from "react";

const OfficeList = ({ city }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Oficinas en {city.name}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {city.offices.map((office) => (
          <div
            key={office.id}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-base lg:text-xl font-bold text-green-900 mb-2">
                  {office.name}
                </h3>
                <p className="text-gray-600 text-sm">ID: {office.id}</p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-gray-500 text-xs mb-1">Empleados</p>
                  <p className="text-2xl font-bold text-green-900">
                    {office.employees}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-xs mb-1">Ingresos</p>
                  <p className="text-2xl font-bold text-green-900">
                    €{(office.revenue / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeList;
