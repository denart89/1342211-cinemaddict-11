import {getRandomArrayItem, getRandomIntegerNumber} from "../utils/common";

const nameItems = [
  `Джентльмены`,
  `Зеленая книга`,
  `Игра престолов`,
  `Джокер`,
  `Ford против Ferrari`,
];

const descriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `In rutrum ac purus sit amet tempus.`,
];

const posterItems = [
  `sagebrush-trail.jpg`,
  `the-dance-of-life.jpg`,
  `popeye-meets-sinbad.png`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const generateFilm = () => {
  return {
    id: String(new Date() + Math.random()),
    name: getRandomArrayItem(nameItems),
    originalName: `Invisible Man 2020`,
    image: getRandomArrayItem(posterItems),
    description: getRandomArrayItem(descriptionItems),
    rating: getRandomIntegerNumber(1, 9),
    releaseDate: {
      day: 2,
      month: `April`,
      year: getRandomIntegerNumber(2000, 2020),
    },
    director: `Denis Russkikh`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Anne Wigton, Heinz Herald, Richard Weil`,
    genre: `Drama, Film-Noir, Mystery`,
    runtime: {
      hours: 1,
      minutes: 54,
    },
    country: `USA`,
    ageRating: `18+`,
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilm, generateFilms};
