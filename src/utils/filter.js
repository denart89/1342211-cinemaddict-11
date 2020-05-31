import {FilterType} from "../const.js";

const getAllFilms = (films) => films.filter((film) => film);

const getWatchList = (films) => films.filter((film) => film.isWatchlist);

const getHistoryFilms = (films) => films.filter((film) => film.isHistory);

const getFavoriteFilms = (films) => films.filter((film) => film.isFavorites);

const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL.id:
      return getAllFilms(films);
    case FilterType.WATCHLIST.id:
      return getWatchList(films);
    case FilterType.HISTORY.id:
      return getHistoryFilms(films);
    case FilterType.FAVORITES.id:
      return getFavoriteFilms(films);
  }

  return films;
};

export {
  getAllFilms,
  getWatchList,
  getHistoryFilms,
  getFavoriteFilms,
  getFilmsByFilter,
};
