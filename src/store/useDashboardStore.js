import { fetchHierarchicalData } from "../services/api.js";
import {
  calculateChartData,
  calculateStats,
  getFilteredData,
} from "../helpers/dashboard.js";
import { getBreadcrumb } from "../helpers/breadCrumb.js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { HIERARCHICAL_DATA } from "../mocks/hierarchicalData.js";

export const useDashboardStore = create()(
  devtools((set, get) => ({
    selectedCountry: null,
    selectedCity: null,
    sortBy: "",
    filteredData: HIERARCHICAL_DATA,
    stats: { totalEmployees: 0, totalRevenue: 0, officeCount: 0 },
    chartData: { labels: [], employees: [], revenue: [], title: "" },
    breadcrumb: ["Todos los países"],
    isLoading: false,
    error: null,

    setSortBy: (sort) => {
      const state = get();
      const newFilteredData = getFilteredData("all", sort);

      let updatedCountry = state.selectedCountry;
      let updatedCity = state.selectedCity;

      if (state.selectedCountry) {
        updatedCountry = newFilteredData.countries.find(
          (c) => c.id === state.selectedCountry.id,
        );

        if (state.selectedCity && updatedCountry) {
          updatedCity = updatedCountry.cities.find(
            (city) => city.id === state.selectedCity.id,
          );
        }
      }

      const newStats = calculateStats(
        updatedCity,
        updatedCountry,
        newFilteredData,
      );
      const newChartData = calculateChartData(
        updatedCity,
        updatedCountry,
        newFilteredData,
      );

      set({
        sortBy: sort,
        filteredData: newFilteredData,
        selectedCountry: updatedCountry,
        selectedCity: updatedCity,
        stats: newStats,
        chartData: newChartData,
      });
    },

    setSelectedCountry: (country) => {
      const state = get();
      const newFilteredData = getFilteredData("all", state.sortBy);
      const newStats = calculateStats(null, country, newFilteredData);
      const newChartData = calculateChartData(null, country, newFilteredData);
      const newBreadcrumb = getBreadcrumb(country, null);

      set({
        selectedCountry: country,
        selectedCity: null,
        filteredData: newFilteredData,
        stats: newStats,
        chartData: newChartData,
        breadcrumb: newBreadcrumb,
      });
    },

    setSelectedCity: (city) => {
      const state = get();
      const newFilteredData = getFilteredData("all", state.sortBy);
      const newStats = calculateStats(
        city,
        state.selectedCountry,
        newFilteredData,
      );
      const newChartData = calculateChartData(
        city,
        state.selectedCountry,
        newFilteredData,
      );
      const newBreadcrumb = getBreadcrumb(state.selectedCountry, city);

      set({
        selectedCity: city,
        filteredData: newFilteredData,
        stats: newStats,
        chartData: newChartData,
        breadcrumb: newBreadcrumb,
      });
    },

    handleBack: () => {
      const state = get();

      if (state.selectedCity) {
        const newFilteredData = getFilteredData("all", state.sortBy);
        const newStats = calculateStats(
          null,
          state.selectedCountry,
          newFilteredData,
        );
        const newChartData = calculateChartData(
          null,
          state.selectedCountry,
          newFilteredData,
        );
        const newBreadcrumb = getBreadcrumb(state.selectedCountry, null);

        set({
          selectedCity: null,
          filteredData: newFilteredData,
          stats: newStats,
          chartData: newChartData,
          breadcrumb: newBreadcrumb,
        });
        return;
      }

      if (state.selectedCountry) {
        const newFilteredData = getFilteredData("all", state.sortBy);
        const newStats = calculateStats(null, null, newFilteredData);
        const newChartData = calculateChartData(null, null, newFilteredData);
        const newBreadcrumb = getBreadcrumb(null, null);

        set({
          selectedCountry: null,
          filteredData: newFilteredData,
          stats: newStats,
          chartData: newChartData,
          breadcrumb: newBreadcrumb,
        });
      }
    },

    handleReset: () => {
      const newFilteredData = getFilteredData("all", "");
      const newStats = calculateStats(null, null, newFilteredData);
      const newChartData = calculateChartData(null, null, newFilteredData);
      const newBreadcrumb = getBreadcrumb(null, null);

      set({
        selectedCountry: null,
        selectedCity: null,
        sortBy: "",
        filteredData: newFilteredData,
        stats: newStats,
        chartData: newChartData,
        breadcrumb: newBreadcrumb,
      });
    },

    initialize: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetchHierarchicalData();
        if (!response?.success)
          throw new Error(response?.error?.message || "Error");

        const newFilteredData = response.data;
        const newStats = calculateStats(null, null, newFilteredData);
        const newChartData = calculateChartData(null, null, newFilteredData);
        const newBreadcrumb = getBreadcrumb(null, null);

        set({
          filteredData: newFilteredData,
          stats: newStats,
          chartData: newChartData,
          breadcrumb: newBreadcrumb,
          isLoading: false,
        });
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Error al cargar los datos";
        set({ error: message, isLoading: false });
      }
    },

    clearError: () => set({ error: null }),

    retry: async () => {
      await get().initialize();
    },
  })),
  { name: "dashboard-store" },
);
