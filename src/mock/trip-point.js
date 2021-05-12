import {getRandomInt, getRandomeFlag, getRandomElement, getRandomLinksArr, getRandomProperty} from '../utils/random';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const pointType = ['Check-in', 'Sightseeing', 'Restaurant', 'Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight'];
const pointName = ['Amsterdam', 'Berlin', 'Barcelona', 'Lisboa', 'Budapest'];
const photoSource = 'http://picsum.photos/248/152?r=';
const PriceLimit = {
  MIN: 10,
  MAX: 100,
};
const PhotosLimit = {
  MIN: 1,
  MAX: 10,
};
const DurationDays = {
  MIN: 0,
  MAX: 3,
};

const renderPhotos = (arr) => {
  const result = arr.reduce((acc, el) => {
    return acc + `<img class="event__photo" src="${el}" alt="Event photo">`;
  }, '');
  return result;
};

export const destinations = {
  Amsterdam: {
    name: 'Amsterdam',
    description: 'Cтолица Нидерландов, известная сложной сетью каналов, узкими домами с остроконечными крышами и богатым художественным наследием, в том числе XVII века, ставшего золотым в истории этой страны. В городе есть Музейная площадь, где расположены Музей Ван Гога, Рейксмузеум с картинами Рембрандта и Вермеера и Городской музей Амстердама, посвященный современному искусству. Также в Амстердаме очень популярны велосипеды, и здесь большое количество велодорожек.',
    photos: renderPhotos(getRandomLinksArr(photoSource, PhotosLimit.MIN, PhotosLimit.MAX)),
  },
  Berlin: {
    name: 'Berlin',
    description: 'Столица Германии, история которой восходит к XIII в. О непростой истории города в XX в. напоминают Мемориал жертвам Холокоста и граффити на руинах Берлинской стены. Бранденбургские ворота, возведенные в XVIII в., известны как символ воссоединения Берлина, разделенного во время Холодной войны на две части. Также город славится своими художественными галереями и современными достопримечательностями, например построенной в 1963 г. филармонией золотого цвета с крышей в форме циркового шатра.',
    photos: renderPhotos(getRandomLinksArr(photoSource, PhotosLimit.MIN, PhotosLimit.MAX)),
  },
  Barcelona: {
    name: 'Barcelona',
    description: 'Столица автономной области Каталония. Этот многонациональный город знаменит своей архитектурой и искусством. Одни из главных достопримечательностей – здания архитектора Антонио Гауди, например храм Святого Семейства. Также в городе находятся музеи современного искусства: Музей Пикассо и Фонд Жоана Миро. В Музее истории Барселоны можно посмотреть не только экспонаты, относящиеся к римскому периоду, но и места археологических раскопок в подземной части.',
    photos: renderPhotos(getRandomLinksArr(photoSource, PhotosLimit.MIN, PhotosLimit.MAX)),
  },
  Lisboa: {
    name: 'Lisboa',
    description: 'Столица Португалии, расположенная на нескольких холмах и омываемая водами Атлантического океана. Из величественного замка Святого Георгия открывается запоминающийся вид на здания пастельных цветов в старом городе, устье реки Тахо и висячий мост Двадцать пятого апреля. В экспозиции Национального музея азулежу представлены португальские изразцы, созданные на протяжении пяти веков. Близ Лиссабона расположены пляжные курорты Кашкайш и Эшторил.',
    photos: renderPhotos(getRandomLinksArr(photoSource, PhotosLimit.MIN, PhotosLimit.MAX)),
  },
  Budapest: {
    name: 'Budapest',
    description: 'Столица Венгрии, разделенная на две части рекой Дунай. Цепной мост, построенный в XIX веке, соединяет холмистый район Буда и равнинный Пешт. На фуникулере можно подняться на Крепостную гору, где находится Старый город района Буда и Музей истории Будапешта, коллекция которого знакомит с историей города начиная с римской эпохи. На площади Святой Троицы расположена церковь Матьяша, построенная в XIII веке, и Рыбацкий бастион, с башен которого открывается великолепный вид на город.',
    photos: renderPhotos(getRandomLinksArr(photoSource, PhotosLimit.MIN, PhotosLimit.MAX)),
  },
};

export const offersByTypes = {
  'Check-in': [
    {
      id: 0,
      name: 'breakfast',
      title: 'Add breakfast',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Sightseeing: [
    {
      id: 0,
      name: 'tickets',
      title: 'Book tickets',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 1,
      name: 'lunch',
      title: 'Lunch in city',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Restaurant: [
    {
      id: 0,
      name: 'tips',
      title: 'Tips',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Taxi: [
    {
      id: 0,
      name: 'uber',
      title: 'Order Uber',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Bus: [
    {
      id: 0,
      name: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 1,
      name: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 2,
      name: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Train: [
    {
      id: 0,
      name: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 1,
      name: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 2,
      name: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Ship: [
    {
      id: 0,
      name: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 1,
      name: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 2,
      name: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Transport: [
    {
      id: 0,
      name: 'luggage',
      title: 'Add luggage',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 1,
      name: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 2,
      name: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 3,
      name: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Drive: [
    {
      id: 0,
      name: 'car',
      title: 'Rent a car',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
  Flight: [
    {
      id: 1,
      name: 'luggage',
      title: 'Add luggage',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 2,
      name: 'comfort',
      title: 'Switch to comfort',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 3,
      name: 'meal',
      title: 'Add meal',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 4,
      name: 'seats',
      title: 'Choose seats',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    },
    {
      id: 5,
      name: 'train',
      title: 'Travel by train',
      cost: getRandomInt(PriceLimit.MIN, PriceLimit.MAX),
      isChecked: getRandomeFlag(),
    }],
};

const renderOptions = (arr) => {
  const result = arr.reduce((acc, el) => {
    return acc + `<option value="${el}"></option>`;
  }, '');
  return result;
};

const getTripPeriod = () => {
  const tripDuration = getRandomInt(DurationDays.MIN, DurationDays.MAX);
  const start = dayjs().subtract(getRandomInt(DurationDays.MIN, DurationDays.MAX), 'day').add(getRandomInt(0, 24), 'hour').add(getRandomInt(0, 60), 'minute');
  const end = start.add(tripDuration, 'day').add(getRandomInt(0, 24), 'hour').add(getRandomInt(0, 60), 'minute');

  return [start, end];
};

const getTimeDiff = (startDate, endDate) => {
  const time =  endDate.diff(startDate);
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

export const generateTripPoint = () => {
  const id = nanoid();
  const type = getRandomElement(pointType);
  const allOffers = offersByTypes[type];

  const destination = getRandomProperty(destinations);
  const destinationName = destination.name;
  const destinationDescription = destination.description;
  const destinationPhotos = destination.photos;

  const [start, end] = getTripPeriod();
  const startTime = start.toDate();
  const endTime = end.toDate();
  const timeDiff = getTimeDiff(start, end);

  const basePrice = getRandomInt(PriceLimit.MIN, PriceLimit.MAX);
  const pointOptions = renderOptions(pointName);
  const isFavorite = getRandomeFlag();

  return {
    id,
    type,
    destinationName,
    destinationDescription,
    destinationPhotos,
    startTime,
    endTime,
    timeDiff,
    basePrice,
    pointOptions,
    isFavorite,
    allOffers,
  };
};

export const generateEmptyTripPoint = () => {
  const id = nanoid();
  const type = pointType[0];
  const allOffers = offersByTypes[type];

  const destination = destinations[pointName[0]];
  const destinationName = destination.name;
  const destinationDescription = destination.description;
  const destinationPhotos = destination.photos;

  const [start, end] = getTripPeriod();
  const startTime = start.toDate();
  const endTime = end.toDate();
  const timeDiff = getTimeDiff(start, end);

  const basePrice = '';
  const pointOptions = renderOptions(pointName);
  const isNewPoint = true;

  return {
    id,
    type,
    destinationName,
    destinationDescription,
    destinationPhotos,
    startTime,
    endTime,
    timeDiff,
    basePrice,
    pointOptions,
    isNewPoint,
    allOffers,
  };
};
