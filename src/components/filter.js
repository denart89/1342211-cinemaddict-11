import {createElement} from "../utils";

const createFilterItem = (name, count, hash, isActive) => {
  return (
    `<a href="#${hash}" class="main-navigation__item${isActive ? ` main-navigation__item--active` : ``}">${name} ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};

const createFilterTemplate = (filter) => {
  const filterItems = filter.map((it) => createFilterItem(it.name, it.count, it.hash, it.isActive)).join(`\n`);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
        ${filterItems}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

class Filter {
  constructor(filter) {
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
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

export {Filter};
