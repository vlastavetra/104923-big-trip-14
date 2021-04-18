import dayjs from 'dayjs';
import {createElement} from '../utils.js';

const createTripMainInfoTemplate = (points) => {
  const getTripRoute = (points) => {
    const place = [...new Set(points.map((point) => point.place))];
    return place.join(' — ');
  };

  const getTripPeriod = (startTime, endTime) => {
    const tripStartDate = dayjs(startTime).format('D MMM');
    const tripEndDate = dayjs(endTime).format('D MMM');

    return `${tripStartDate} – ${tripEndDate}`;
  };

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getTripRoute(points)}</h1>

              <p class="trip-info__dates">${getTripPeriod(points[0].startTime, points[points.length - 1].endTime)}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
          </section>`;
};

export default class TripInfo {
  constructor(points) {
    this._data = points;
    this._element = null;
  }

  getTemplate() {
    return createTripMainInfoTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
