export function fetchCountries(searchQuery) {
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const properties = 'fields=name,capital,population,flags,languages';
  
    return fetch(`${BASE_URL}${searchQuery}?${properties}`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }