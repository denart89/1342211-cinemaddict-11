import {getRandomIntegerNumber, getRandomArrayItem, generateRandomDate} from '../utils/common';

const commentsEmoji = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const commentsText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const commentsAuthor = [
  `Ivan Ivanov`,
  `Peter Petrov`,
  `Slava Myasnikov`,
  `Alex Frost`,
];

const generateComment = (currentElement, index) => {
  return {
    id: index,
    text: getRandomArrayItem(commentsText),
    emoji: getRandomArrayItem(commentsEmoji),
    date: generateRandomDate(),
    author: getRandomArrayItem(commentsAuthor),
  };
};

const generateComments = () => {
  const count = getRandomIntegerNumber(1, 5);

  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments, commentsAuthor, commentsEmoji};
