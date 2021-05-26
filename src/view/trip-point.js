import he from 'he';
import {formatDate, formatTimeShort} from '../utils/date-format';
import AbstractView from './abstract';
import {filtredByFlag} from '../utils/filter';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const createTripItemsTemplate = (points) => {
  const {type, destination, startTime, endTime, basePrice, isFavorite, allOffers} = points;

  const renderChekedOffers = (allOffers) => {
    const result = allOffers.reduce((acc, el) => {
      return acc + `<li class="event__offer">
                      <span class="event__offer-title">${el.title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${el.price}</span>
                    </li>`;
    }, '');
    return result;
  };

  const getTimeDiff = (startTime, endTime) => {
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    const time =  end.diff(start);
    const tripDuration = dayjs.duration(time);
    const days = tripDuration.days();
    const hours = tripDuration.hours();
    const minutes = tripDuration.minutes();

    return `
        ${days > 0 ? days + 'D' : ''}
        ${hours > 0 ? hours + 'H' : ''}
        ${minutes > 0 ? minutes + 'M' : ''}
      `;
  };

  const timeDiff = getTimeDiff(startTime, endTime)

  const chekedOffers = renderChekedOffers(allOffers);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="2019-03-18">${formatDate(startTime)}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${type} ${he.encode(destination.name)}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">${formatTimeShort(startTime)}</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">${formatTimeShort(endTime)}</time>
                </p>
                <p class="event__duration">${timeDiff}</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${chekedOffers}
              </ul>
              <button class="event__favorite-btn ${favoriteClassName}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};

export default class TripPoint extends AbstractView {
  constructor(point) {
    super();
    this._data = point;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createTripItemsTemplate(this._data);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
