import {FilterType} from "../constants";
import {getFilmsByFilter} from "../utils/filter";
import {getRank} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

const createProfileTemplate = (films) => {
  const watchedFilmsCount = getFilmsByFilter(films, FilterType.HISTORY).length;
  const rank = getRank(watchedFilmsCount);

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileComponent extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createProfileTemplate(this._films.getFilms());
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {

  }
}
