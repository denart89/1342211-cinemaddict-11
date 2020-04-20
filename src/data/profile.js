import {getRandomIntegerNumber} from "../utils";

const getRankName = () => {
  const randomIntegerNumber = getRandomIntegerNumber(0, 30);
  let userRankName = ``;

  if (randomIntegerNumber === 0) {
    userRankName = ``;
  }

  if (randomIntegerNumber >= 1 && randomIntegerNumber <= 10) {
    userRankName = `novice`;
  }

  if (randomIntegerNumber >= 11 && randomIntegerNumber <= 20) {
    userRankName = `fan`;
  }

  if (randomIntegerNumber >= 21) {
    userRankName = `movie buff`;
  }

  return userRankName;
};

export {getRankName};
