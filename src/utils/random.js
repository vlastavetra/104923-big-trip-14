import dayjs from 'dayjs';

export const getRandomInt = (min = 0, max = 1000) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
export const getRandomeFlag = () => {
  return Boolean(getRandomInt(0, 1));
};
export const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * Math.round(arr.length - 1))];
};
export const getRandomTime = (timeGap, startTime, minutes) => {
  if (startTime) {
    return dayjs(startTime).add(minutes, 'minute').toDate();
  }

  return dayjs().add(getRandomInt(0, timeGap), 'hour').toDate();
};

export const getRandomLinksArr = (element, MIN, MAX) => {
  const arr = new Array(getRandomInt(MIN, MAX)).fill().map(() => `${element}${getRandomInt()}`);
  return arr;
};

export const getRandomProperty = (obj) => {
  const keys = Object.keys(obj);
  return obj[keys[getRandomInt(0, keys.length - 1)]];
};

export const noop = () => {};
