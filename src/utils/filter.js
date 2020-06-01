import {FILTER_TYPES} from "../constants.js";

export const getAllFilms = (films) => films.filter((film) => film);

export const getWatchList = (films) => films.filter((film) => film.controls.isWatchlist);

export const getHistoryFilms = (films) => films.filter((film) => film.controls.isWatched);

export const getFavoriteFilms = (films) => films.filter((film) => film.controls.isFavorite);

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FILTER_TYPES.ALL.id:
      return getAllFilms(films);
    case FILTER_TYPES.WATCHLIST.id:
      return getWatchList(films);
    case FILTER_TYPES.HISTORY.id:
      return getHistoryFilms(films);
    case FILTER_TYPES.FAVORITES.id:
      return getFavoriteFilms(films);
  }

  return films;
};
