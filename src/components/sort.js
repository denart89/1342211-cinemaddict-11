import {createElement} from "../utils.js";

const createSortItem = (title, hash, isActive) => {
  return `<li><a href="#${hash}" class="sort__button ${isActive === true ? `sort__button--active` : ``}">${title}</a></li>`;
};

const createSortTemplate = (sort) => {
  const sortItems = sort.map((it) => createSortItem(it.title, it.hash, it.isActive)).join(`\n`);

  return `<ul class="sort">
            ${sortItems}
  </ul>`;
};

class Sort {
  constructor(sort) {
    this._sort = sort;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._sort);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {Sort};
