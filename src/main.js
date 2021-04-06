import {createTripMainInfoTemplate} from './view/trip-info.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSiteFiltersTemplate} from './view/site-filters.js';
import {createSiteSortTemplate} from './view/site-sort.js';
import {createTripListTemplate, createTripItemsTemplate} from './view/trip-points.js';
import {createFormCreatingTemplate} from './view/form-create.js';
import {createFormEditingTemplate} from './view/form-edit.js';
import {generateTripPoint} from './mock/trip-point';
import {getRandomInt, sortByDate} from './utils.js';

const pointCounts = {
  MIN: 15,
  MAX: 20,
};

const points = new Array(getRandomInt(pointCounts.MIN, pointCounts.MAX)).fill().map(generateTripPoint).sort(sortByDate);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector('.trip-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

render(mainElement, createTripMainInfoTemplate(points), 'afterbegin');
render(navigationElement, createSiteMenuTemplate(), 'beforeend');
render(filtersElement, createSiteFiltersTemplate(), 'beforeend');
render(eventsElement, createSiteSortTemplate(), 'beforeend');
render(eventsElement, createTripListTemplate(), 'beforeend');

const eventsList = document.querySelector('.trip-events__list');

points.forEach((point) => {
  render(eventsList, createTripItemsTemplate(point), 'beforeend');
});

const eventsItem = eventsList.querySelector('.trip-events__item');

render(eventsItem , createFormEditingTemplate(points[0]), 'beforeend');
render(eventsList , createFormCreatingTemplate(points[getRandomInt(0, points.length - 1)]), 'afterbegin');
