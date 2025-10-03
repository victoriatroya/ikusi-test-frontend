import { HIERARCHICAL_DATA } from "../mocks/hierarchicalData.js";

export const calculateStats = (selectedCity, selectedCountry, filteredData) => {
  let totalEmployees = 0;
  let totalRevenue = 0;
  let officeCount = 0;

  if (selectedCity) {
    selectedCity.offices.forEach((office) => {
      totalEmployees += office.employees;
      totalRevenue += office.revenue;
      officeCount++;
    });
  } else if (selectedCountry) {
    selectedCountry.cities.forEach((city) => {
      city.offices.forEach((office) => {
        totalEmployees += office.employees;
        totalRevenue += office.revenue;
        officeCount++;
      });
    });
  } else {
    filteredData.countries.forEach((country) => {
      country.cities.forEach((city) => {
        city.offices.forEach((office) => {
          totalEmployees += office.employees;
          totalRevenue += office.revenue;
          officeCount++;
        });
      });
    });
  }

  return { totalEmployees, totalRevenue, officeCount };
};

export const calculateChartData = (
  selectedCity,
  selectedCountry,
  filteredData,
) => {
  if (selectedCity) {
    return {
      labels: selectedCity.offices.map((office) => office.name),
      employees: selectedCity.offices.map((office) => office.employees),
      revenue: selectedCity.offices.map((office) => office.revenue / 1000000),
      offices: selectedCity.offices.map(() => 1),
      title: `Estadísticas por Oficina en ${selectedCity.name}`,
      color: "#E3CE4B",
    };
  } else if (selectedCountry) {
    return {
      labels: selectedCountry.cities.map((city) => city.name),
      employees: selectedCountry.cities.map((city) =>
        city.offices.reduce((sum, office) => sum + office.employees, 0),
      ),
      revenue: selectedCountry.cities.map(
        (city) =>
          city.offices.reduce((sum, office) => sum + office.revenue, 0) /
          1000000,
      ),
      offices: selectedCountry.cities.map((city) => city.offices.length),
      title: `Estadísticas por Ciudad en ${selectedCountry.name}`,
      color: "#3E51C2",
    };
  } else {
    return {
      labels: filteredData.countries.map((country) => country.name),
      employees: filteredData.countries.map((country) =>
        country.cities.reduce(
          (sum, city) =>
            sum + city.offices.reduce((s, office) => s + office.employees, 0),
          0,
        ),
      ),
      revenue: filteredData.countries.map(
        (country) =>
          country.cities.reduce(
            (sum, city) =>
              sum + city.offices.reduce((s, office) => s + office.revenue, 0),
            0,
          ) / 1000000,
      ),
      offices: filteredData.countries.map((country) =>
        country.cities.reduce((sum, city) => sum + city.offices.length, 0),
      ),
      title: "Estadísticas por País",
      color: "#563EC2",
    };
  }
};

const filterBySize = (totalEmployees, sizeFilter) => {
  if (sizeFilter === "all" || !sizeFilter) return true;
  if (sizeFilter === "0-100") return totalEmployees <= 100;
  if (sizeFilter === "101-300")
    return totalEmployees > 100 && totalEmployees <= 300;
  if (sizeFilter === "1800+") return totalEmployees > 1800;
  return true;
};

const sortOffices = (offices, sortBy) => {
  const sorted = [...offices];

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "employees-desc":
      return sorted.sort((a, b) => b.employees - a.employees);
    case "employees-asc":
      return sorted.sort((a, b) => a.employees - b.employees);
    case "revenue-desc":
      return sorted.sort((a, b) => b.revenue - a.revenue);
    case "revenue-asc":
      return sorted.sort((a, b) => a.revenue - b.revenue);
    default:
      return sorted;
  }
};

const sortCountries = (countries, sortBy) => {
  const sorted = [...countries];

  switch (sortBy) {
    case "employees-desc":
      return sorted.sort((a, b) => {
        const aTotal = a.cities.reduce(
          (sum, city) =>
            sum + city.offices.reduce((s, o) => s + o.employees, 0),
          0,
        );
        const bTotal = b.cities.reduce(
          (sum, city) =>
            sum + city.offices.reduce((s, o) => s + o.employees, 0),
          0,
        );
        return bTotal - aTotal;
      });
    case "employees-asc":
      return sorted.sort((a, b) => {
        const aTotal = a.cities.reduce(
          (sum, city) =>
            sum + city.offices.reduce((s, o) => s + o.employees, 0),
          0,
        );
        const bTotal = b.cities.reduce(
          (sum, city) =>
            sum + city.offices.reduce((s, o) => s + o.employees, 0),
          0,
        );
        return aTotal - bTotal;
      });
    case "revenue-desc":
      return sorted.sort((a, b) => {
        const aTotal = a.cities.reduce(
          (sum, city) => sum + city.offices.reduce((s, o) => s + o.revenue, 0),
          0,
        );
        const bTotal = b.cities.reduce(
          (sum, city) => sum + city.offices.reduce((s, o) => s + o.revenue, 0),
          0,
        );
        return bTotal - aTotal;
      });
    case "revenue-asc":
      return sorted.sort((a, b) => {
        const aTotal = a.cities.reduce(
          (sum, city) => sum + city.offices.reduce((s, o) => s + o.revenue, 0),
          0,
        );
        const bTotal = b.cities.reduce(
          (sum, city) => sum + city.offices.reduce((s, o) => s + o.revenue, 0),
          0,
        );
        return aTotal - bTotal;
      });
    case "offices-asc":
      return sorted.sort((a, b) => {
        const aTotal = a.cities.reduce(
          (sum, city) => sum + city.offices.length,
          0,
        );
        const bTotal = b.cities.reduce(
          (sum, city) => sum + city.offices.length,
          0,
        );
        return aTotal - bTotal;
      });
    default:
      return sorted;
  }
};

const sortCities = (cities, sortBy) => {
  const sorted = [...cities];

  switch (sortBy) {
    case "employees-desc":
      return sorted.sort((a, b) => {
        const aTotal = a.offices.reduce((sum, o) => sum + o.employees, 0);
        const bTotal = b.offices.reduce((sum, o) => sum + o.employees, 0);
        return bTotal - aTotal;
      });
    case "employees-asc":
      return sorted.sort((a, b) => {
        const aTotal = a.offices.reduce((sum, o) => sum + o.employees, 0);
        const bTotal = b.offices.reduce((sum, o) => sum + o.employees, 0);
        return aTotal - bTotal;
      });
    case "revenue-desc":
      return sorted.sort((a, b) => {
        const aTotal = a.offices.reduce((sum, o) => sum + o.revenue, 0);
        const bTotal = b.offices.reduce((sum, o) => sum + o.revenue, 0);
        return bTotal - aTotal;
      });
    case "revenue-asc":
      return sorted.sort((a, b) => {
        const aTotal = a.offices.reduce((sum, o) => sum + o.revenue, 0);
        const bTotal = b.offices.reduce((sum, o) => sum + o.revenue, 0);
        return aTotal - bTotal;
      });
    case "offices-asc":
      return sorted.sort((a, b) => a.offices.length - b.offices.length);
    default:
      return sorted;
  }
};

export const getFilteredData = (sizeFilter = "all", sortBy = "name-asc") => {
  let filtered = {
    countries: HIERARCHICAL_DATA.countries
      .map((country) => ({
        ...country,
        cities: country.cities
          .map((city) => ({
            ...city,
            offices: [...city.offices],
          }))
          .filter((city) => {
            const totalEmployees = city.offices.reduce(
              (sum, office) => sum + office.employees,
              0,
            );
            return (
              city.offices.length > 0 &&
              filterBySize(totalEmployees, sizeFilter)
            );
          }),
      }))
      .filter((country) => {
        const totalEmployees = country.cities.reduce(
          (sum, city) =>
            sum + city.offices.reduce((s, office) => s + office.employees, 0),
          0,
        );
        return (
          country.cities.length > 0 && filterBySize(totalEmployees, sizeFilter)
        );
      }),
  };

  filtered.countries = sortCountries(filtered.countries, sortBy);
  filtered.countries = filtered.countries.map((country) => ({
    ...country,
    cities: sortCities(
      country.cities.map((city) => ({
        ...city,
        offices: sortOffices(city.offices, sortBy),
      })),
      sortBy,
    ),
  }));

  return filtered;
};
