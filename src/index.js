import AppUi from './ui/AppUi';

const app = new AppUi();

const render = function render() {
  app.createLocationForm();
  app.createForecast();
};

render();

console.log(app);