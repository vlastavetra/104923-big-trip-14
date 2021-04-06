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

export const getRandomTime = (startTime, minutes) => {

  if (startTime) {
    return dayjs(startTime).add(minutes, 'minute').toDate();
  }
  const gap = 36;

  return dayjs().add(getRandomInt(0, gap), 'hour').toDate();
};

export const getRandomLinksArr = (element, MIN, MAX) => {
  const arr = new Array(getRandomInt(MIN, MAX)).fill().map(() => `${element}${getRandomInt()}`);

  return arr;
};

export const letFormatDate = (date) => {
  return dayjs(date).format('D MMMM');
};

export const letFormatTimeShort = (date) => {
  return dayjs(date).format('HH:mm');
};

export const letFormatTimeLong = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

export const filtredByFlag = (el) => {
  if (el.isChecked) {
    return true;
  } return false;
};

export const sortByDate = (a, b) => {
  if (a.startTime > b.startTime) {
    return 1;
  }
  if (a.startTime < b.startTime) {
    return -1;
  }
  return 0;
};
