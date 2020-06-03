import {StatusCode, SHAKE_ANIMATION_TIMEOUT, Rank} from "../constants";

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECTION) {
    return response;
  }

  return new Error(`${response.status}: ${response.statusText}`);
};

export const getRank = (count) => {
  let rank = ``;

  Object.keys(Rank).forEach((key) => {
    if (count > Rank[key].value) {
      rank = Rank[key].name;
    }
  });

  return rank;
};

export const shake = (element) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT}ms`;

  setTimeout(() => {
    element.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};
