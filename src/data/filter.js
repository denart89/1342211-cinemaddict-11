import {getRandomIntegerNumber} from "../utils/common";

const generateFilter = () => {
  return [
    {
      name: `All movies`,
      count: ``,
      hash: `all`,
      isActive: true,
    },
    {
      name: `Watchlist`,
      count: getRandomIntegerNumber(1, 20),
      hash: `watchlist`,
    },
    {
      name: `History`,
      count: getRandomIntegerNumber(1, 20),
      hash: `history`,
    },
    {
      name: `Favorites`,
      count: getRandomIntegerNumber(1, 20),
      hash: `favorites`,
    },
  ];
};

export {generateFilter};
