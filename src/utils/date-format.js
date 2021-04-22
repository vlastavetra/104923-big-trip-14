import dayjs from 'dayjs';

export const letFormatDate = (date) => {
  return dayjs(date).format('D MMMM');
};

export const letFormatTimeShort = (date) => {
  return dayjs(date).format('HH:mm');
};

export const letFormatTimeLong = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};
