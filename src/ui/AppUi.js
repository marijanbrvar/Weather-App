import './style.css';

export default class AppUi {
  constructor() {
    this.container = document.querySelector('.container');
    this.container.classList.add('my-2', 'mx-auto');
    this.header = document.createElement('div');
    this.header.classList.add('text-center');
    this.header.id = 'header';
    this.title = document.createElement('h1');
    this.title.classList.add('text-muted', 'text-center', 'mt-4', 'mb-2', 'h3');
    this.title.innerText = 'Weather App';
    this.header.append(this.title);
    this.location = document.createElement('form');
    this.location.classList.add('change-location', 'mt-2', 'mb-4', 'text-center', 'text-muted');
    this.forecast = document.createElement('div');
    this.forecast.classList.add('card', 'rounded', 'd-none');
    this.container.append(this.header, this.location, this.forecast);
  }

  createLocationForm() {
    this.target = document.querySelector('form');
    this.label = document.createElement('label');
    this.label.setAttribute('for', 'city');
    this.label.innerText = 'Enter location for weather info!';
    this.input = document.createElement('input');
    this.input.classList.add('form-control', 'p-2');
    this.input.type = 'text';
    this.input.name = 'city';

    this.target.append(this.label, this.input);
  }

  createTempToggler() {
    this.target = document.querySelector('#header');
    this.button = document.createElement('button');
    this.button.id = 'converter';
    this.button.setAttribute('data-temperature', 'C');
    this.button.classList.add('btn', 'btn-primary', 'btn-sm');
    this.button.innerHTML = 'Temp. in &deg;C';
    this.target.append(this.button);
  }

  createForecast() {
    this.image = document.createElement('img');
    this.image.classList.add('time', 'card-img-top');
    this.image.src = 'https://via.placeholder.com/400x300';

    this.icon = document.createElement('div');
    this.icon.classList.add('icon', 'bg-light', 'mx-auto', 'text-center');
    this.iconimg = document.createElement('img');
    this.iconimg.src = 'https://via.placeholder.com/64x64';

    this.icon.append(this.iconimg);

    this.forecastContent = document.createElement('div');
    this.forecastContent.classList.add('text-muted', 'text-uppercase', 'text-center', 'details');
    this.cityName = document.createElement('h5');
    this.cityName.classList.add('my-3');
    this.cityName.innerText = 'City name';
    this.weatherCondition = document.createElement('div');
    this.weatherCondition.classList.add('my-3', 'condition');
    this.weatherCondition.innerText = 'Wather condition';

    this.temperature = document.createElement('div');
    this.temperature.classList.add('my-4', 'display-4');
    this.mark = document.createElement('span');
    this.mark.innerText = '';
    this.mark.id = 'temp';
    this.sign = document.createElement('span');
    this.sign.id = 'unit';

    this.temperature.append(this.mark, this.sign);
    this.forecastContent.append(this.icon, this.cityName, this.weatherCondition, this.temperature);
    this.forecast.append(this.image, this.forecastContent);
  }
}
