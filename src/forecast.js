export async function getWeather(id) {
  const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${process.env.API_KEY}`;

  const response = await fetch(base + query);
  const data = response.json();
  return data;
}

export async function getCity(city) {
  const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${process.env.API_KEY}&q=${city}`;

  const response = await fetch(base + query);

  const data = await response.json();

  return data[0];
}
