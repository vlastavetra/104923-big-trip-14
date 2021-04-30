export const sortByDate = (a, b) => {
  if (a.startTime > b.startTime) {
    return 1;
  }
  if (a.startTime < b.startTime) {
    return -1;
  }
  return 0;
};

export const sortByPrice = (a, b) => {
  if (a.basePrice < b.basePrice) {
    return 1;
  }
  if (a.basePrice > b.basePrice) {
    return -1;
  }
  return 0;
};

export const sortByTime = (a, b) => {
  if (a.timeDiff < b.timeDiff) {
    return 1;
  }
  if (a.timeDiff > b.timeDiff) {
    return -1;
  }
  return 0;
};
