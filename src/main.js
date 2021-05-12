import {generateTripPoint} from './mock/trip-point';
import {getRandomInt} from './utils/random';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import TripPresenter from './presenter/trip';
import SiteMenuPresenter from './presenter/navigation';
import FilterPresenter from './presenter/filter';
import TripInfoPresenter from './presenter/trip-info';

const pointCounts = {
  MIN: 15,
  MAX: 20,
};

const points = new Array(getRandomInt(pointCounts.MIN, pointCounts.MAX)).fill().map(generateTripPoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const mainElement = document.querySelector('.trip-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(eventsElement, pointsModel, filterModel);
const siteMenuPresenter = new SiteMenuPresenter(navigationElement);
const filterPresenter = new FilterPresenter(filtersElement, filterModel);
const tripInfoPresenter = new TripInfoPresenter(mainElement, pointsModel);

tripPresenter.init();
siteMenuPresenter.init();
filterPresenter.init();
tripInfoPresenter.init();

const newEventButtton = mainElement.querySelector('.trip-main__event-add-btn');
newEventButtton.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
