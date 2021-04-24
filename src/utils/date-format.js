import dayjs from 'dayjs';

export const formatDate = (date) => {
  return dayjs(date).format('D MMMM');
};

export const formatTimeShort = (date) => {
  return dayjs(date).format('HH:mm');
};

export const formatTimeLong = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};
