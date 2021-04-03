import {createTripMainInfoTemplate} from './view/trip-info.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSiteFiltersTemplate} from './view/site-filters.js';
import {createSiteSortTemplate} from './view/site-sort.js';
import {createTripPointsTemplate} from './view/trip-points.js';
import {createFormCreatingTemplate} from './view/form-create.js';
import {createFormEditingTemplate} from './view/form-edit.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector('.trip-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

render(mainElement, createTripMainInfoTemplate(), 'afterbegin');
render(navigationElement, createSiteMenuTemplate(), 'beforeend');
render(filtersElement, createSiteFiltersTemplate(), 'beforeend');
render(eventsElement, createSiteSortTemplate(), 'beforeend');
render(eventsElement, createTripPointsTemplate(), 'beforeend');

const eventsList = document.querySelector('.trip-events__list');
const eventsItem = eventsList.querySelector('.trip-events__item');

render(eventsList , createFormCreatingTemplate(), 'afterbegin');
render(eventsItem , createFormEditingTemplate(), 'beforeend');
