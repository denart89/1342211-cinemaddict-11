const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderPosition = {
  APPEND: `append`,
  PREPEND: `prepend`,
  BEFORE: `before`,
  AFTER: `after`
};

const render = (container, element, place) => {
  switch (place) {
    case renderPosition.BEFORE:
      container.before(element);
      break;
    case renderPosition.AFTER:
      container.after(element);
      break;
    case renderPosition.APPEND:
      container.append(element);
      break;
    case renderPosition.PREPEND:
      container.prepend(element);
      break;
  }
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  createElement,
  renderPosition,
  render,
};
