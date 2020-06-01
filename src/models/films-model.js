import {getFilmsByFilter} from "../utils/filter.js";
import {FILTER_TYPES} from "../constants.js";

export default class FilmsModel {
  constructor() {
    this._films = [];

    this._activeFilterType = FILTER_TYPES.ALL;

    this.filmsChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = films;
  }

  getFilmsByFilter() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this.filmsChangeHandlers);

    return true;
  }

  setFilmsChangeHandlers(handler) {
    this.filmsChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
