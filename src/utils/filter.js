import {FilterType} from '../const';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

const today = dayjs();

const isFutureDate = (time) => {
  return dayjs(time).isSameOrAfter(today, 'date');
};

const isPastDate = (time) => {
  return dayjs(time).isBefore(today, 'date');
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.startTime)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.endTime)),
};

export const filtredByFlag = (el) => {
  return el.isChecked;
};
