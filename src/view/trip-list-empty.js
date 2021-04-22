import AbstractView from './abstract.js';

const createTripListTemplate = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class EmptyTripList extends AbstractView {
  getTemplate() {
    return createTripListTemplate();
  }
}
