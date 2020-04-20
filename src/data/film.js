import {getRandomArrayItem} from "../utils";
import {getCommentsCount} from "../data/comments";

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
    name: getRandomArrayItem(nameItems),
    originalName: `Invisible Man 2020`,
    image: getRandomArrayItem(posterItems),
    description: getRandomArrayItem(descriptionItems),
    rating: `7.4`,
    releaseDate: {
      day: 2,
      month: `April`,
      year: 1989,
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
    comments: getCommentsCount(),
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilm, generateFilms};
