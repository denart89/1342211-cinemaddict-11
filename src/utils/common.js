const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const generateRandomDate = () => {
  const start = new Date(`2020/01/01`).getTime();
  const end = new Date(`2020/05/30`).getTime();

  return new Date((Math.random() * (end - start)) + start);
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  generateRandomDate,
};
