import React from "react";
import Button from "../ui/Button.jsx";

const DashboardHeader = ({ onLogout }) => {
  const logoutIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );

  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-6 sm:p-8 mb-6">
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Visualización de métricas y gráficas
          </p>
        </div>
        <Button
          onClick={onLogout}
          className="p-2 flex md:hidden"
          icon={logoutIcon}
          title="Cerrar Sesión"
        />
        <Button
          onClick={onLogout}
          className="hidden md:inline-flex"
          icon={logoutIcon}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
