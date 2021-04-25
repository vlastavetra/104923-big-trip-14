import {getRandomInt, getRandomeFlag, getRandomElement, getRandomTime, getRandomLinksArr, noop} from '../utils/random';
import {filtredByFlag} from '../utils/filter';
import {nanoid} from 'nanoid';

const pointType = ['Check-in', 'Sightseeing', 'Restaurant', 'Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight'];
const pointName = ['Amsterdam', 'Berlin', 'Barcelona', 'Lisboa', 'Budapest'];
const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const photoSource = 'http://picsum.photos/248/152?r=';
const PriceLimit = {
  MIN: 10,
  MAX: 100,
};
const SentencesLimit = {
  MIN: 1,
  MAX: 5,
};
const PhotosLimit = {
  MIN: 1,
  MAX: 10,
};
const TimeLimit = {
  MIN: 10,
  MAX: 1000,
};

const MinTimeGap = {
  MIN: 24,
  MAX: 36,
};

export const offersByTypes = {
  'Check-in': [
    {
      id: 'breakfast',
      title: 'Add breakfast',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Sightseeing: [
    {
      id: 'tickets',
      title: 'Book tickets',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'lunch',
      title: 'Lunch in city',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Restaurant: [
    {
      id: 'tips',
      title: 'Tips',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Taxi: [
    {
      id: 'uber',
      title: 'Order Uber',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Bus: [
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Train: [
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Ship: [
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Transport: [
    {
      id: 'luggage',
      title: 'Add luggage',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Drive: [
    {
      id: 'car',
      title: 'Rent a car',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Flight: [
    {
      id: 'luggage',
      title: 'Add luggage',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'train',
      title: 'Travel by train',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
};

const renderChekedOffers = (type) => {
  const result = offersByTypes[type].filter(filtredByFlag).reduce((acc, el) => {
    return acc + `<li class="event__offer">
                    <span class="event__offer-title">${el.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${el.cost}</span>
                  </li>`;
  }, '');
  return result;
};

const renderAllOffers = (type, id) => {
  const result = offersByTypes[type].reduce((acc, el) => {
    return acc + `<div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${el.id}-${id}" type="checkbox" name="event-offer-${el.id}" ${el.isChecked === true ? 'checked' : ''}>
                    <label class="event__offer-label" for="event-offer-${el.id}-${id}">
                      <span class="event__offer-title">${el.title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${el.cost}</span>
                    </label>
                  </div>`;
  }, '');

  return result;
};

const renderPhotos = (arr) => {
  const result = arr.reduce((acc, el) => {
    return acc + `<img class="event__photo" src="${el}" alt="Event photo">`;
  }, '');
  return result;
};

export const generateTripPoint = () => {
  const id = nanoid();
  const type = getRandomElement(pointType);
  const place = getRandomElement(pointName);
  const startTime = getRandomTime(getRandomInt(MinTimeGap.MIN, MinTimeGap.MAX));
  const duration = getRandomInt(TimeLimit.MIN, TimeLimit.MAX);
  const endTime = getRandomTime(noop, startTime, duration);
  const basePrice = getRandomInt(PriceLimit.MIN, PriceLimit.MAX);
  const destinationText = mockText.split('.').splice(0, getRandomInt(SentencesLimit.MIN, SentencesLimit.MAX));
  const destinationPhotos = renderPhotos(getRandomLinksArr(photoSource, PhotosLimit.MIN, PhotosLimit.MAX));
  const isFavorite = getRandomeFlag();
  const chekedOffers = renderChekedOffers(type);
  const allOffers = renderAllOffers(type, id);

  return {
    id,
    type,
    place,
    startTime,
    duration,
    endTime,
    basePrice,
    destinationText,
    destinationPhotos,
    isFavorite,
    chekedOffers,
    allOffers,
  };
};
