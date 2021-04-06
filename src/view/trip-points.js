import {letFormatDate, letFormatTimeShort} from '../utils.js';

export const createTripListTemplate = () => {
  return `<ul class="trip-events__list">
          </ul>`;
};

export const createTripItemsTemplate = (points) => {
  const {type, place, startTime, duration, endTime, basePrice, isFavourite, chekedOffers} = points;

  const favoriteClassName = isFavourite
    ? 'event__favorite-btn--active'
    : '';

  const letFormatDuration = (duration) => {
    const hour = duration / 60;
    const day = hour / 24;

    if (day < 1 && hour < 1) {
      return `${Math.floor(duration % 60)}M`;
    } else if (day < 1) {
      return `${Math.floor(hour % 24)}H ${Math.floor(duration % 60)}M`;
    } return `${Math.floor(hour / 24)}D ${Math.floor(hour % 24)}H ${Math.floor(duration % 60)}M`;
  };

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="2019-03-18">${letFormatDate(startTime)}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${type} ${place}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">${letFormatTimeShort(startTime)}</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">${letFormatTimeShort(endTime)}</time>
                </p>
                <p class="event__duration">${letFormatDuration(duration)}</p>
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
