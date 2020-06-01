import AbstractComponent from "./abstract-component";
import {FILTER_TYPES} from "../constants";
import {getFilmsByFilter} from "../utils/filter";
import {getRank} from "../utils/common";

const createProfileTemplate = (films) => {
  const watchedFilmsCount = getFilmsByFilter(films, FILTER_TYPES.HISTORY.id).length;
  const rank = getRank(watchedFilmsCount);

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

class ProfileComponent extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
  }
}

export {ProfileComponent};
