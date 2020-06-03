import {FilterType} from "../constants.js";

export const getAllFilms = (films) => films.filter((film) => film);

export const getWatchList = (films) => films.filter((film) => film.controls.isWatchlist);

export const getHistoryFilms = (films) => films.filter((film) => film.controls.isWatched);

export const getFavoriteFilms = (films) => films.filter((film) => film.controls.isFavorite);

export const getFilmsByFilter = (films, filterType) => {
  if (films.length) {
    switch (filterType) {
      case FilterType.ALL:
        return getAllFilms(films);
      case FilterType.WATCHLIST:
        return getWatchList(films);
      case FilterType.HISTORY:
        return getHistoryFilms(films);
      case FilterType.FAVORITES:
        return getFavoriteFilms(films);
    }
  }

  return films;
};
