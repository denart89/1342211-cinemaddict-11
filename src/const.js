const FilterType = {
  ALL: {
    id: `all`,
    name: `All movies`
  },
  WATCHLIST: {
    id: `Watchlist`,
    name: `Watchlist`
  },
  HISTORY: {
    id: `history`,
    name: `History`,
  },
  FAVORITES: {
    id: `favorites`,
    name: `Favorites`
  },
};

const StatisticFilter = {
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

export {FilterType, StatisticFilter};
