const renderPosition = {
  APPEND: `append`,
  PREPEND: `prepend`,
  BEFORE: `before`,
  AFTER: `after`
};

const render = (container, component, place) => {
  switch (place) {
    case renderPosition.BEFORE:
      container.before(component.getElement());
      break;
    case renderPosition.AFTER:
      container.after(component.getElement());
      break;
    case renderPosition.APPEND:
      container.append(component.getElement());
      break;
    case renderPosition.PREPEND:
      container.prepend(component.getElement());
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (parent, newElement, oldElement) => {
  const isExistElements = !!(parent && newElement && oldElement);

  if (isExistElements && parent.contains(oldElement)) {
    parent.replaceChild(newElement, oldElement);
  }
};

export {
  renderPosition,
  render,
  createElement,
  remove,
  replace,
};
