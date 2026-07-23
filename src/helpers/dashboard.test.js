import { describe, it, expect } from "vitest";
import { calculateStats, calculateChartData } from "./dashboard.js";


const city = {
  name: "Bogotá",
  offices: [
    { name: "Norte", employees: 100, revenue: 2000000 },
    { name: "Sur", employees: 50, revenue: 1000000 },
  ],
};

const country = {
  name: "Colombia",
  cities: [
    city,
    {
      name: "Medellín",
      offices: [{ name: "Centro", employees: 30, revenue: 500000 }],
    },
  ],
};

const filteredData = {
  countries: [
    country,
    {
      name: "Perú",
      cities: [
        {
          name: "Lima",
          offices: [{ name: "Miraflores", employees: 20, revenue: 300000 }],
        },
      ],
    },
  ],
};

describe("calculateStats", () => {
  it("suma solo las oficinas de la ciudad cuando hay ciudad seleccionada", () => {
    const result = calculateStats(city, country, filteredData);
    expect(result).toEqual({
      totalEmployees: 150,
      totalRevenue: 3000000,
      officeCount: 2,
    });
  });

  it("suma todas las ciudades del país cuando no hay ciudad pero sí país", () => {
    const result = calculateStats(null, country, filteredData);
    expect(result).toEqual({
      totalEmployees: 180,
      totalRevenue: 3500000,
      officeCount: 3,
    });
  });

  it("suma todos los países cuando no hay selección", () => {
    const result = calculateStats(null, null, filteredData);
    expect(result).toEqual({
      totalEmployees: 200,
      totalRevenue: 3800000,
      officeCount: 4,
    });
  });

  it("prioriza la ciudad sobre el país cuando ambos existen", () => {
    const result = calculateStats(city, country, filteredData);
    expect(result.officeCount).toBe(2);
  });
});

describe("calculateChartData", () => {
  it("genera labels con nombres de oficinas cuando hay ciudad", () => {
    const result = calculateChartData(city, null, filteredData);
    expect(result.labels).toEqual(["Norte", "Sur"]);
    expect(result.title).toBe("Estadísticas por Oficina en Bogotá");
  });

  it("convierte revenue a millones", () => {
    const result = calculateChartData(city, null, filteredData);
    expect(result.revenue).toEqual([2, 1]); // 2000000/1000000 y 1000000/1000000
  });

  it("agrupa por ciudad cuando hay país seleccionado", () => {
    const result = calculateChartData(null, country, filteredData);
    expect(result.labels).toEqual(["Bogotá", "Medellín"]);
    expect(result.employees).toEqual([150, 30]);
  });
});