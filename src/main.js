import {generateTripPoint} from './mock/trip-point';
import {getRandomInt} from './utils/random';
import {sortByDate} from './utils/sort';
import TripPresenter from './presenter/trip';
import SiteMenuPresenter from './presenter/navigation';
import FilterPresenter from './presenter/filter';

const pointCounts = {
  MIN: 15,
  MAX: 20,
};

const points = new Array(getRandomInt(pointCounts.MIN, pointCounts.MAX)).fill().map(generateTripPoint).sort(sortByDate);

const mainElement = document.querySelector('.trip-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(eventsElement, mainElement);
const siteMenuPresenter = new SiteMenuPresenter(navigationElement);
const filterPresenter = new FilterPresenter(filtersElement);

tripPresenter.init(points);
siteMenuPresenter.init();
filterPresenter.init();
