import AbstractSmartComponent from "./abstract-smart-component";

const createFilterTemplate = (filters, isActive) => {
  const filterItems = filters.map((filter) => {
    const {name, count} = filter;
    const activeClass = isActive === name ? ` main-navigation__item--active` : ``;
    const itemCount = name !== `All movies` ? `<span class="main-navigation__item-count">${count}</span>` : ``;

    return `<a id="${name}" href="#" class="main-navigation__item${activeClass}">${name} ${itemCount}</a>`;
  }).join(``);

  return `<div class="main-navigation__items">
        ${filterItems}
    </div>`;
};

export default class FilterComponent extends AbstractSmartComponent {
  constructor(filter) {
    super();

    this._filter = filter;
    this._activeFilter = this._getActiveFilter(filter);
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

  _getActiveFilter(filters) {
    let activeFilter = ``;

    for (const filter of filters) {
      if (filter.isActive) {
        activeFilter = filter.name;
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
