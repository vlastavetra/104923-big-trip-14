import {getRandomInt, getRandomeFlag, getRandomElement, getRandomTime, getRandomLinksArr, filtredByFlag} from '../utils.js';

const pointType = ['Check-in', 'Sightseeing', 'Restaurant', 'Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight'];
const pointName = ['Amsterdam', 'Berlin', 'Barcelona', 'Lisboa', 'Budapest'];
const priceLimit = {
  MIN: 10,
  MAX: 100,
};
const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const sentencesLimit = {
  MIN: 1,
  MAX: 5,
};
const photosLimit = {
  MIN: 1,
  MAX: 10,
};
const timeLimit = {
  MIN: 10,
  MAX: 3000,
};
const photoSource = 'http://picsum.photos/248/152?r=';

export const OffersByTypes = {
  'Check-in': [
    {
      id: 'breakfast',
      title: 'Add breakfast',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Sightseeing: [
    {
      id: 'tickets',
      title: 'Book tickets',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'lunch',
      title: 'Lunch in city',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Restaurant: [
    {
      id: 'tips',
      title: 'Tips',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Taxi: [
    {
      id: 'uber',
      title: 'Order Uber',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Bus: [
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Train: [
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Ship: [
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Transport: [
    {
      id: 'luggage',
      title: 'Add luggage',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Drive: [
    {
      id: 'car',
      title: 'Rent a car',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Flight: [
    {
      id: 'luggage',
      title: 'Add luggage',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'meal',
      title: 'Add meal',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 'train',
      title: 'Travel by train',
      cost: getRandomInt(priceLimit.MIN, priceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
};

const createChekedOffers = (type) => {
  const arr = OffersByTypes[type].filter(filtredByFlag);
  let offers = '';

  arr.forEach((el) => {
    offers = `${offers}<li class="event__offer">
                  <span class="event__offer-title">${el.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${el.cost}</span>
                </li>`;
  });

  return offers;
};

const createAllOffers = (type, id) => {
  const arr = OffersByTypes[type];
  let offers = '';

  arr.forEach((el) => {
    offers = `${offers}<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${el.id}-${id}" type="checkbox" name="event-offer-${el.id}" ${el.isChecked === true ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-${el.id}-${id}">
                          <span class="event__offer-title">${el.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${el.cost}</span>
                        </label>
                      </div>`;
  });

  return offers;
};

const renderPhotos = (destinationPhotos) => {
  let photos = '';

  destinationPhotos.forEach((el) => {
    photos = `${photos}<img class="event__photo" src="${el}" alt="Event photo">`;
  });

  return photos;
};

export const generateTripPoint = () => {
  let index = 1;
  index += 1;

  const id = index;
  const type = getRandomElement(pointType);
  const place = getRandomElement(pointName);
  const startTime = getRandomTime();
  const duration = getRandomInt(timeLimit.MIN, timeLimit.MAX);
  const endTime = getRandomTime(startTime, duration);
  const basePrice = getRandomInt(priceLimit.MIN, priceLimit.MAX);
  const destinationText = mockText.split('.').splice(0, getRandomInt(sentencesLimit.MIN, sentencesLimit.MAX));
  const destinationPhotos = renderPhotos(getRandomLinksArr(photoSource, photosLimit.MIN, photosLimit.MAX));
  const isFavourite = getRandomeFlag();
  const chekedOffers = createChekedOffers(type);
  const allOffers = createAllOffers(type, id);

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
    isFavourite,
    chekedOffers,
    allOffers,
  };
};
