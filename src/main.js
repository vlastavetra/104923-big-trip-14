import {MenuItem, UpdateType} from './const';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import TripPresenter from './presenter/trip';
import SiteMenuPresenter from './presenter/navigation';
import FilterPresenter from './presenter/filter';
import TripInfoPresenter from './presenter/trip-info';
import StatsPresenter from './presenter/stat';
import Api from './api';
const AUTHORIZATION = 'Basic vlv15h2IKissu6SH';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const mainElement = document.querySelector('.trip-main');
const pageBodyMain = document.querySelector('.page-body__page-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');
const pageBodyContainer = pageBodyMain.querySelector('.page-body__container');
const newEventButtton = mainElement.querySelector('.trip-main__event-add-btn');

const tripPresenter = new TripPresenter(eventsElement, pointsModel, filterModel);
const siteMenuPresenter = new SiteMenuPresenter(navigationElement);
const filterPresenter = new FilterPresenter(filtersElement, filterModel);
const tripInfoPresenter = new TripInfoPresenter(mainElement, pointsModel);
const statsPresenter = new StatsPresenter(pageBodyContainer, pointsModel);

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statsPresenter.destroy();
      tripPresenter.showTripBoard();
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.hideTripBoard();
      tripPresenter.destroy();
      statsPresenter.init();
      break;
  }
};

tripPresenter.init();

newEventButtton.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

api.getAllData()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    tripInfoPresenter.init();
    siteMenuPresenter.init();
    filterPresenter.init();
    siteMenuPresenter.setMenuClickHandler(handleMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    tripInfoPresenter.init();
    siteMenuPresenter.init();
    filterPresenter.init();
    siteMenuPresenter.setMenuClickHandler(handleMenuClick);
  });
