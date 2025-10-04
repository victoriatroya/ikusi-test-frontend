import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Breadcrumb from "../components/common/BreadCrumbs.jsx";
import CityList from "../components/features/CityList.jsx";
import CountryList from "../components/features/CountryList.jsx";
import DashboardHeader from "../components/common/DashboardHeader.jsx";
import NavigationButtons from "../components/features/NavigationButtons.jsx";
import OfficeList from "../components/features/OfficeList.jsx";
import FullScreenSpinner from "../components/common/FullScreenSpinner.jsx";
import Card from "../components/ui/Card.jsx";
import BarChart from "../components/charts/BarChart.jsx";
import Select from "../components/ui/Select.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

import { useDashboardStore } from "../store/useDashboardStore.js";
import { logoutUser } from "../services/api.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const selectedCountry = useDashboardStore((state) => state.selectedCountry);
  const selectedCity = useDashboardStore((state) => state.selectedCity);
  const sortBy = useDashboardStore((state) => state.sortBy);
  const filteredData = useDashboardStore((state) => state.filteredData);
  const stats = useDashboardStore((state) => state.stats);
  const chartData = useDashboardStore((state) => state.chartData);
  const breadcrumb = useDashboardStore((state) => state.breadcrumb);
  const isLoading = useDashboardStore((state) => state.isLoading);
  const error = useDashboardStore((state) => state.error);

  const setSelectedCountry = useDashboardStore(
    (state) => state.setSelectedCountry,
  );
  const setSelectedCity = useDashboardStore((state) => state.setSelectedCity);
  const setSortBy = useDashboardStore((state) => state.setSortBy);
  const handleBack = useDashboardStore((state) => state.handleBack);
  const handleReset = useDashboardStore((state) => state.handleReset);
  const initialize = useDashboardStore((state) => state.initialize);
  const retry = useDashboardStore((state) => state.retry);
  const clearError = useDashboardStore((state) => state.clearError);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      localStorage.removeItem("token");
      navigate("/login");
    } catch {
      setIsLoggingOut(false);
    }
  };

  const countryOptions = useMemo(
    () =>
      (filteredData?.countries ?? []).map((country) => ({
        value: country.id,
        label: country.name,
      })),
    [filteredData],
  );

  const handleCountrySelect = useCallback(
    (countryId) => {
      const country = (filteredData?.countries ?? []).find(
        (c) => c.id === countryId,
      );
      if (country) {
        setSelectedCountry(country);
      }
    },
    [filteredData, setSelectedCountry],
  );

  const handleSortChange = useCallback(
    (sort) => {
      setSortBy(sort);
    },
    [setSortBy],
  );

  const handleClearFilters = useCallback(() => {
    setSortBy("");
    if (selectedCountry) {
      handleBack();
    }
  }, [setSortBy, selectedCountry, handleBack]);

  const statsCards = useMemo(
    () => [
      {
        title: "Total Empleados",
        value: stats.totalEmployees,
        color: "blue",
        icon: "users",
      },
      {
        title: "Ingresos Totales",
        value: `€${(stats.totalRevenue / 1_000_000).toFixed(1)}M`,
        color: "yellow",
        icon: "money",
      },
      {
        title: "Total Oficinas",
        value: stats.officeCount,
        color: "purple",
        icon: "building",
      },
    ],
    [stats],
  );

  const combinedDatasets = useMemo(
    () => [
      {
        label: "Empleados",
        data: chartData.employees ?? [],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgb(216,216,227)",
        borderWidth: 1,
      },
      {
        label: "Ingresos (M€)",
        data: chartData.revenue ?? [],
        backgroundColor: "rgba(227, 206, 75, 0.7)",
        borderColor: "rgb(216,216,227)",
        borderWidth: 1,
      },
      {
        label: "Oficinas",
        data: chartData.offices ?? [],
        backgroundColor: "rgba(168, 85, 247, 0.7)",
        borderColor: "rgb(216,216,227)",
        borderWidth: 1,
      },
    ],
    [chartData.employees, chartData.revenue, chartData.offices],
  );

  return (
    <>
      {(isLoggingOut || isLoading) && <FullScreenSpinner />}

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader onLogout={handleLogout} />

          {error && (
            <ErrorMessage
              message={error}
              onRetry={retry}
              onDismiss={clearError}
            />
          )}

          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <Breadcrumb items={breadcrumb} />
              <NavigationButtons
                showBack={Boolean(selectedCountry || selectedCity)}
                showReset={Boolean(selectedCountry || selectedCity)}
                onBack={handleBack}
                onReset={handleReset}
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-full lg:min-w-[200px]">
                <Select
                  label="Filtro"
                  options={[
                    { value: "employees-desc", label: "Más empleados" },
                    { value: "revenue-desc", label: "Mayor ingreso" },
                    { value: "offices-asc", label: "Menos oficinas" },
                  ]}
                  value={sortBy}
                  onChange={handleSortChange}
                  disabled={isLoading}
                />
              </div>
              <div className="flex-1 min-w-full lg:min-w-[200px]">
                <Select
                  options={countryOptions}
                  value={selectedCountry?.id ?? ""}
                  onChange={handleCountrySelect}
                  placeholder="Filtrar por país..."
                  searchPlaceholder="Buscar país..."
                  disabled={isLoading}
                />
              </div>
              {(sortBy || selectedCountry) && (
                <button
                  onClick={handleClearFilters}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Limpiar filtros"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span className="hidden sm:inline">Limpiar filtros</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {statsCards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                value={card.value}
                color={card.color}
                icon={card.icon}
              />
            ))}
          </div>

          <div className="relative z-[1] bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-6 sm:p-8">
            {!selectedCountry && (filteredData?.countries?.length ?? 0) > 0 && (
              <CountryList
                countries={filteredData.countries}
                onCountryClick={setSelectedCountry}
              />
            )}

            {selectedCountry && !selectedCity && (
              <CityList
                country={selectedCountry}
                onCityClick={setSelectedCity}
              />
            )}

            {selectedCity && <OfficeList city={selectedCity} />}
          </div>

          {chartData.labels?.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-6 mb-6 mt-7">
              <BarChart
                key={`${selectedCountry?.id || "all"}-${selectedCity?.id || "none"}-${sortBy}`}
                labels={chartData.labels}
                datasets={combinedDatasets}
                title={chartData.title}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
