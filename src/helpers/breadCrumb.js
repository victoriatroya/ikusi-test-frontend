export const getBreadcrumb = (selectedCountry, selectedCity) => {
  const crumbs = ["Todos los países"];
  if (selectedCountry) crumbs.push(selectedCountry.name);
  if (selectedCity) crumbs.push(selectedCity.name);
  return crumbs;
};
