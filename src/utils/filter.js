export const filtredByFlag = (el) => {
  return el.isChecked;
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
