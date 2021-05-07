import he from 'he';
import {formatTimeLong} from '../utils/date-format';
import {capitalizeString} from '../utils/render';
import {generateEmptyTripPoint, offersByTypes, destinations} from '../mock/trip-point';
import SmartView from './smart';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createFormEditingTemplate = (point) => {
  const {id, type, allOffers, destinationName, destinationDescription, destinationPhotos, isSubmitDisabled, isDestinationInfo, startTime, endTime, basePrice, pointOptions, isNewPoint} = point;

  const renderAllOffers = (allOffers) => {
    const result = allOffers.reduce((acc, el) => {
      return acc + `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${el.name}-${el.id}" type="checkbox" name="event-offer-${el.name}" ${el.isChecked === true ? 'checked' : ''}>
                      <label class="event__offer-label" for="event-offer-${el.name}-${el.id}">
                        <span class="event__offer-title">${el.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${el.cost}</span>
                      </label>
                    </div>`;
    }, '');

    return result;
  };

  const offers = renderAllOffers(allOffers, id);

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>

                      <div class="event__type-item">
                        <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi"
                        ${type === 'Taxi' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus"
                        ${type === 'Bus' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train"
                        ${type === 'Train' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship"
                        ${type === 'Ship' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-transport-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport"
                        ${type === 'Transport' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--transport" for="event-type-transport-${id}">Transport</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive"
                        ${type === 'Drive' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight"
                        ${type === 'Flight' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in"
                        ${type === 'Check-in' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"
                        ${type === 'Sightseeing' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"
                        ${type === 'Restaurant' ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1" required>
                  <datalist id="destination-list-1">
                    ${pointOptions}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatTimeLong(startTime)}" required>
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatTimeLong(endTime)}" required>
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${basePrice}" required>
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? '' : 'disabled'}>Save</button>
                <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : 'Delete'}</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                  <div class="event__available-offers">
                    ${offers}
                  </div>
                </section>

                <section class="event__section  event__section--destination ${isDestinationInfo ? '' : 'visually-hidden'}">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${destinationDescription}</p>

                  <div class="event__photos-container">
                    <div class="event__photos-tape">
                      ${destinationPhotos}
                    </div>
                  </div>
                </section>
              </section>
            </form>
          </li>`;
};

export default class FormEdit extends SmartView{
  constructor(point = generateEmptyTripPoint()) {
    super();
    this._data = FormEdit.parsePointToData(point);
    this._datepickerStartTime = null;
    this._datepickerEndTime = null;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._eventTypeSelectHandler = this._eventTypeSelectHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);
    this._offersClickHandler = this._offersClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  getTemplate() {
    return createFormEditingTemplate(this._data);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isSubmitDisabled: true,
        isDestinationInfo: point.destinationDescription !== null,
      },
    );
  }

  static parseDataToPoint(data) {
    const newData = Object.assign({}, data);

    delete newData.isSubmitDisabled;
    delete newData.isDestinationInfo;
    return newData;
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepickerStartTime.destroy();
      this._datepickerEndTime.destroy();

      this._datepickerStartTime = null;
      this._datepickerEndTime = null;
    }

    if (this._data.startTime) {
      this._datepickerStartTime = flatpickr(
        this.getElement().querySelector('input[name="event-start-time"]'),
        {
          altFormat: 'd/m/y H:i',
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          time_24hr: true,
          defaultDate: this._data.startTime,
          onChange: this._startTimeChangeHandler,
        },
      );
    }

    if (this._data.endTime) {
      this._datepickerEndTime = flatpickr(
        this.getElement().querySelector('input[name="event-end-time"]'),
        {
          altFormat: 'd/m/y H:i',
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          time_24hr: true,
          defaultDate: this._data.endTime,
          minDate: this._data.startTime,
          onChange: this._endTimeChangeHandler,
        },
      );
    }
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({
      startTime: userDate,
    });
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      endTime: userDate,
    });
  }

  _eventTypeSelectHandler(evt) {
    if (evt.target.name === 'event-type') {
      const newType = capitalizeString(evt.target.value);
      this.updateData({
        type: newType,
        allOffers: new Object(offersByTypes[newType]),
      });
    }
  }

  _destinationChangeHandler(evt) {
    const newDestination = evt.target.value;

    if (!destinations[newDestination]) {
      this.updateData({
        destinationName: newDestination,
        isDestinationInfo: false,
      });
    }

    if (newDestination === '') {
      this.updateData({
        isSubmitDisabled: false,
      });
    }

    this.updateData({
      destinationName: newDestination,
      destinationDescription: destinations[newDestination].description,
      destinationPhotos: destinations[newDestination].photos,
      isDestinationInfo: true,
      isSubmitDisabled: true,
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(FormEdit.parseDataToPoint(this._data));
  }

  _editClickHandler() {
    this._callback.editClick();
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormEdit.parseDataToPoint(this._data));
  }

  _offersClickHandler(evt) {
    const state = evt.target.checked;
    const id = evt.target.id.match(/\d/);

    const offers = Object.assign(
      {},
      this._data.allOffers,
      {[id]: Object.assign({}, this._data.allOffers[id], {isChecked: state})},
    );

    this.updateData({
      allOffers: Object.values(offers),
    }, true);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._eventTypeSelectHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._priceInputHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);

    const availableOffers = this.getElement().querySelectorAll('.event__available-offers input');
    availableOffers.forEach((offer) => offer.addEventListener('click', this._offersClickHandler));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this._setDatepicker();
  }

  reset(data) {
    this.updateData(
      FormEdit.parsePointToData(data),
    );
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }
}
