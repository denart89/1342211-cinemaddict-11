import {STATISTIC_FILTERS, GENRES} from "../constants";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractSmartComponent from "./abstract-smart-component";
import {getFilmsByFilter} from "../utils/filter";
import moment from "moment";
import {getRank} from "../utils/common";

const createStatisticFilterTemplate = (filter, isChecked = false) => {
  const {name, label} = filter;

  return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${label}" value="${label}" ${isChecked ? `checked` : ``}>
      <label for="statistic-${label}" class="statistic__filters-label">${name}</label>`;
};

const createStatisticsTemplate = (films, currentFilter) => {
  const duration = films.reduce((filmsDuration, film) => {
    filmsDuration += film.runtime;
    return filmsDuration;
  }, 0);

  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration % 60;

  let timeFiltersMarkup = ``;
  for (const filter in STATISTIC_FILTERS) {
    if (filter) {
      timeFiltersMarkup = timeFiltersMarkup.concat(createStatisticFilterTemplate(STATISTIC_FILTERS[filter], currentFilter === STATISTIC_FILTERS[filter].label));
    }
  }

  const topGenre = films.length > 0 ? getTopGenre(films) : ``;
  const rank = getRank(films.length);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${timeFiltersMarkup}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${durationHours} <span class="statistic__item-description">h</span> ${durationMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

const getCountedGenres = (films) => {
  const values = GENRES.map((genre) =>
    films.filter((film) =>
      film.genres.includes(genre))
      .length);

  const genresCount = [];
  GENRES.forEach((genre, i) => genresCount.push({name: genre, count: values[i]}));

  return genresCount.sort((a, b) => b.count - a.count);
};

const getTopGenre = (films) => getCountedGenres(films)[0].name;

const renderChart = (films, ctx) => {
  ctx.height = 50 * GENRES.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getCountedGenres(films).map((genre) => genre.name),
      datasets: [{
        data: getCountedGenres(films).map((genre) => genre.count),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const getWatchedFilmsByPeriod = (films, period) => {
  const watchedFilms = getFilmsByFilter(films, `History`);

  if (period === STATISTIC_FILTERS.ALLTIME.label) {
    return watchedFilms;
  }

  const startOfPeriod = moment().startOf(period);

  return watchedFilms.filter((film) => moment(film.watchingDate).isAfter(startOfPeriod));
};

export default class StatisticsComponent extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
    this._renderChart();
    this._currentTimeFilter = STATISTIC_FILTERS.ALLTIME.label;

    this._setTimeFilterHandlers();
  }

  getTemplate() {
    return createStatisticsTemplate(getWatchedFilmsByPeriod(this._films.getFilms(), this._currentTimeFilter), this._currentTimeFilter);
  }

  _renderChart() {
    const statisticChart = this.getElement().querySelector(`.statistic__chart`);
    const ctx = statisticChart.getContext(`2d`);
    const watchedFilmsByPeriod = getWatchedFilmsByPeriod(this._films.getFilms(), this._currentTimeFilter);

    if (watchedFilmsByPeriod.length > 0) {
      renderChart(watchedFilmsByPeriod, ctx);
    }
  }

  _setTimeFilterHandlers() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const filterData = evt.target.getAttribute(`for`);

      if (filterData) {
        this._currentTimeFilter = filterData.substring(filterData.length, `statistic-`.length);
      }

      this.rerender();
    });
  }

  show() {
    super.show();
    this.rerender();
    this._setTimeFilterHandlers();
  }

  rerender() {
    super.rerender();
    this._renderChart();
    this.recoveryListeners();
  }

  recoveryListeners() {
    this._setTimeFilterHandlers();
  }
}
