import AbstractSmartComponent from "./abstract-smart-component";

const createFilterTemplate = (filters, isActive) => {
  const filterItems = filters.map((filter) => {
    const {id, name, count} = filter;
    const activeClass = isActive === id ? ` main-navigation__item--active` : ``;
    const itemCount = id !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;

    return `<a id="${id}" href="#" class="main-navigation__item${activeClass}">${name} ${itemCount}</a>`;
  }).join(``);

  return `<div class="main-navigation__items">
        ${filterItems}
    </div>`;
};

export default class FilterComponent extends AbstractSmartComponent {
  constructor(filter) {
    super();

    this._filter = filter;
    this._activeFilter = this.getActiveFilter(filter);

    this.filterChangeHandler = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filter, this._activeFilter);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName === `A` || evt.target.parentNode.tagName === `A`) {
        const selectedFilter = evt.target.parentNode.tagName === `A` ? evt.target.parentNode.getAttribute(`id`) : evt.target.getAttribute(`id`);

        if (selectedFilter === this._activeFilter) {
          return;
        }

        handler(selectedFilter);
        this._activeFilter = selectedFilter;
        this.rerender(this._filter);
      }
    });

    this.filterChangeHandler = handler;
  }

  getActiveFilter(filterData) {
    let activeFilter = ``;

    for (const item of filterData) {
      if (item.isActive) {
        activeFilter = item.id;
        break;
      }
    }

    return activeFilter;
  }

  rerender(filter) {
    this._filter = filter;
    super.rerender();
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this.filterChangeHandler);
  }
}
