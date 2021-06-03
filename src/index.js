import AppUi from './ui/AppUi';
import getCity from './forecast';

const app = new AppUi();

const render = function render() {
  app.createLocationForm();
  app.createForecast();
};

render();
getCity('Beogrqad');