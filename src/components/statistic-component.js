import {AbstractComponent} from "./abstract-component";
import {StatisticFilter} from "../const";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getRandomArrayItem} from "../utils/common";
import {genres} from "../data/film";

const createStatisticFilterTemplate = (filter, isChecked = false) => {
  const {name, label} = filter;

  return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${label}" value="${label}" ${isChecked ? `checked` : ``}>
      <label for="statistic-${label}" class="statistic__filters-label">${name}</label>`;
};

const createStatisticTemplate = (films) => {
  const filterList = Object.values(StatisticFilter).map((it) => createStatisticFilterTemplate(it, it.label === `all-time`)).join(`\n`);
  const filmsCount = films.length;
  const topGenre = getRandomArrayItem(genres);

  return `<section class="statistic visually-hidden">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filterList}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
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

const renderChart = (films, ctx) => {
  ctx.height = 50 * genres.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: [11, 8, 7, 4, 3, 4],
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

class StatisticsComponent extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
    this._renderChart();
  }

  getTemplate() {
    return createStatisticTemplate(this._films);
  }

  _renderChart() {
    const statisticChart = this.getElement().querySelector(`.statistic__chart`);
    const ctx = statisticChart.getContext(`2d`);

    renderChart(this._films, ctx);
  }
}

export {StatisticsComponent};
