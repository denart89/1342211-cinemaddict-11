export const MILLISECONDS_PER_DAY = 86400000;
export const ONE_DAY = 1;
export const WEEK = 7;
export const DISPLAY_FILMS_COUNT = 5;
export const AUTHORIZATION = `Basic zW0fqB32ZgN2ec3wCAxY`;
export const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
export const SHAKE_ANIMATION_TIMEOUT = 1000;

export const ButtonCode = {
  ESC: 27,
  ENTER: 13,
};

export const Url = {
  MOVIES: `movies`,
  COMMENTS: `comments`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const StatusCode = {
  SUCCESS: 200,
  REDIRECTION: 300,
};

export const ErrorMessage = {
  CONNECTION: `No internet connection`,
  CONSTRUCTOR: `Can't instantiate AbstractComponent, only concrete one.`,
  SYNCHRONIZATION: `Sync data failed`,
};

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};

export const StatisticFilter = {
  ALLTIME: {
    name: `All time`,
    label: `all-time`,
  },
  TODAY: {
    name: `Today`,
    label: `today`,
  },
  WEEK: {
    name: `Week`,
    label: `week`,
  },
  MONTH: {
    name: `Month`,
    label: `month`,
  },
  YEAR: {
    name: `Year`,
    label: `year`,
  },
};

export const Rank = {
  NOVICE: {
    name: `Novice`,
    value: 1,
  },
  FAN: {
    name: `Fan`,
    value: 11,
  },
  MOVIE_BUFF: {
    name: `Movie Buff`,
    value: 21,
  },
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];
