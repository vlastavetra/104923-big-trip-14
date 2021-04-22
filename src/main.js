import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import FiltersView from './view/site-filters.js';
import SortView from './view/site-sort.js';
import TripListView from './view/trip-list.js';
import EmptyTripList from './view/trip-list-empty.js';
import TripPointView from './view/trip-point.js';
import FormEditView from './view/form-edit.js';
import {generateTripPoint} from './mock/trip-point';
import {render, RenderPosition, getRandomInt, sortByDate} from './utils.js';

const pointCounts = {
  MIN: 15,
  MAX: 20,
};

const points = new Array(getRandomInt(pointCounts.MIN, pointCounts.MAX)).fill().map(generateTripPoint).sort(sortByDate);

const renderPoint = (tripListComponent, task) => {
  const pointComponent = new TripPointView(task);
  const pointEditComponent = new FormEditView(task);

  const replacePointToForm = () => {
    tripListComponent.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
    pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', replaceFormToPoint);
  };

  const replaceFormToPoint = () => {
    tripListComponent.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(tripListComponent, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const mainElement = document.querySelector('.trip-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

render(navigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(filtersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const tripListComponent = new TripListView();
render(eventsElement, tripListComponent.getElement(), RenderPosition.BEFOREEND);

const renderList = (arr) => {
  if (arr.length === 0) {
    render(eventsElement, new EmptyTripList().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(eventsElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);
    render(mainElement, new TripInfoView(arr).getElement(), RenderPosition.AFTERBEGIN);

    arr.forEach((el) => {
      renderPoint(tripListComponent.getElement(), el);
    });
  }
};

renderList(points);
