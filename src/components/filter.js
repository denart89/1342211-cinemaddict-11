import {AbstractComponent} from "./abstract-component";

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

class Filter extends AbstractComponent {
  constructor(filter) {
    super();

    this._filter = filter;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }
}

export {Filter};
