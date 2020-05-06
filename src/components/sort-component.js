import {AbstractComponent} from "./abstract-component";

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const createSortTemplate = () => {
  return `<ul class="sort">
            <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
            <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
            <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};

class SortComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  // TODO: Дописать переключение класса у элементов на активный
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const sortType = evt.target.dataset.sortType;
      const sortButtons = this.getElement().querySelectorAll(`.sort__button`);
      const sortButtonClassActive = `sort__button--active`;

      if (evt.target.tagName !== `A`) {
        return;
      }

      if (this._currentSortType === sortType) {
        return;
      }

      sortButtons.forEach((button) => {
        button.classList.remove(sortButtonClassActive);
      });

      evt.target.classList.add(sortButtonClassActive);

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}

export {
  SortType,
  SortComponent,
};
