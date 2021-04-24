import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import FiltersView from './view/site-filters.js';
import SortView from './view/site-sort.js';
import TripListView from './view/trip-list.js';
import EmptyTripList from './view/trip-list-empty.js';
import TripPointView from './view/trip-point.js';
import FormEditView from './view/form-edit.js';
import {generateTripPoint} from './mock/trip-point';
import {render, RenderPosition, replace} from './utils/render.js';
import {getRandomInt} from './utils/random';
import {sortByDate} from './utils/filter';

const pointCounts = {
  MIN: 15,
  MAX: 20,
};

const tripListComponent = new TripListView();

const points = new Array(getRandomInt(pointCounts.MIN, pointCounts.MAX)).fill().map(generateTripPoint).sort(sortByDate);

const renderPoint = (tripListComponent, point) => {
  const pointComponent = new TripPointView(point);
  const pointEditComponent = new FormEditView(point);

  const replacePointToForm = () => {
    replace(tripListComponent, pointEditComponent, pointComponent);

    document.addEventListener('keydown', onEscKeyDown);

    pointEditComponent.setEditClickHandler(() => {
      replace(tripListComponent, pointComponent, pointEditComponent);
    });
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(tripListComponent, pointComponent, pointEditComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
  });

  pointEditComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replace(tripListComponent, pointComponent, pointEditComponent);
  });

  render(tripListComponent, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const mainElement = document.querySelector('.trip-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

render(navigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(filtersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
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
