const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const renderComponent = (container, html, place) => {
  container.insertAdjacentHTML(place, html);
};

export {getRandomIntegerNumber, getRandomArrayItem, renderComponent};
