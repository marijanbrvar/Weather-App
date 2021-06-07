import AppUi from './ui/AppUi';
import { getCity, getWeather } from './forecast';
import night from './ui/night.svg';
import day from './ui/day.svg';

const app = new AppUi();

const render = function render() {
  app.createTempToggler();
  app.createLocationForm();
  app.createForecast();
};

render();

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const forecast = document.querySelector('.condition');
const cityName = document.querySelector('h5');
const temp = document.querySelector('#temp');
const unit = document.querySelector('#unit');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const button = document.querySelector('#converter');

const updateUi = (data) => {
  const { weather, cityDetails } = data;

  cityName.innerText = cityDetails.EnglishName;
  forecast.innerText = weather[0].WeatherText;
  if (button.dataset.temperature === 'C') {
    temp.innerText = weather[0].Temperature.Metric.Value;
    unit.innerHTML = '&deg;C';
  } else {
    temp.innerText = weather[0].Temperature.Imperial.Value;
    unit.innerHTML = '&deg;F';
  }

  if (card.classList.contains('d-none')) card.classList.remove('d-none');

  const iconSrc = `icons/${weather[0].WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  let timeSrc = null;

  if (weather[0].IsDayTime) {
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

button.addEventListener('click', (e) => {
  if (e.target.dataset.temperature === 'C') {
    e.target.dataset.temperature = 'F';
    e.target.innerHTML = 'Temp. in &deg;F';
    if (temp.innerText !== '') {
      const currentVal = parseFloat(temp.innerText, 10).toFixed(1);
      temp.innerText = ((currentVal * (9 / 5)) + 32).toFixed(1);
      unit.innerHTML = '&deg;F';
    }
  } else {
    e.target.dataset.temperature = 'C';
    e.target.innerHTML = 'Temp. in &deg;C';
    if (temp.innerText !== '') {
      const currentVal = parseFloat(temp.innerText, 10).toFixed(1);
      temp.innerText = ((currentVal - 32) * (5 / 9)).toFixed(1);
      unit.innerHTML = '&deg;C';
    }
  }
});
