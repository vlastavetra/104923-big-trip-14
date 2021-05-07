import AbstractView from './abstract';
import {formatDate} from '../utils/date-format';

const createTripMainInfoTemplate = (points) => {
  const getTripRoute = (points) => {
    const place = [...new Set(points.map((point) => point.destinationName))];
    return place.join(' — ');
  };

  const getTripPeriod = (startTime, endTime) => {
    const tripStartDate = formatDate(startTime);
    const tripEndDate = formatDate(endTime);

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

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._data = points;
  }

  getTemplate() {
    return createTripMainInfoTemplate(this._data);
  }
}
