import AbstractComponent from "./abstract-component";
import {SortType} from "../constants";

const createSortTemplate = () => {
  return `<ul class="sort">
            <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
            <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
            <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class SortComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

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

  clearSortMenu() {
    const activeButton = this.getElement().querySelector(`.sort__button--active`);
    activeButton.classList.remove(`sort__button--active`);
    this.getElement().querySelector(`.sort__button`).classList.add(`sort__button--active`);
    this._currentSortType = SortType.DEFAULT;
  }
}
