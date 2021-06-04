import AppUi from './ui/AppUi';
import { getCity, getWeather } from './forecast';
import night from './ui/night.svg';
import day from './ui/day.svg';

const app = new AppUi();

const render = function render() {
  app.createLocationForm();
  app.createForecast();
};

render();

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const forecast = document.querySelector('.condition');
const cityName = document.querySelector('h5');
const temp = document.querySelector('#temp');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUi = (data) => {
  const { weather, cityDetails } = data;

  cityName.innerText = cityDetails.EnglishName;
  forecast.innerText = weather[0].WeatherText;
  temp.innerText = weather[0].Temperature.Metric.Value;

  if (card.classList.contains('d-none')) card.classList.remove('d-none');

  const iconSrc = `icons/${weather[0].WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  let timeSrc = null;

  if (weather.isDayTyme) {
    timeSrc = day;
  } else {
    timeSrc = night;
  }

  time.setAttribute('src', timeSrc);
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUi(data))
    .catch((err) => console.error(err));
});
