import {createProfileTemplate} from './components/profile';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createFilmsContainerTemplate} from './components/films-list';
import {createFilmCardTemplate} from './components/film';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createFooterStatisticsTemplate} from './components/footer-statistics';
import {createFilmDetailsContainer} from './components/film-details';
import {createFullFilmDetailsTemplate} from './components/film-details';
import {generateFilms} from './data/film';
import {generateSort} from './data/sort';
import {generateFilter} from './data/filter';
import {getRankName} from './data/profile';
import {renderComponent} from './utils';

const FILMS_COUNT = 22;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer .footer__statistics`);

document.addEventListener(`DOMContentLoaded`, () => {
  renderComponent(body, createFilmDetailsContainer(), `beforeEnd`);
  renderComponent(header, createProfileTemplate(getRankName()), `beforeEnd`);
  renderComponent(main, createFilterTemplate(generateFilter()), `beforeEnd`);
  renderComponent(main, createSortTemplate(generateSort()), `beforeEnd`);
  renderComponent(main, createFilmsContainerTemplate(), `beforeEnd`);

  createFilm();
  showMoreFilms();
  closeFilmDetails();
  renderComponent(footerStatistics, createFooterStatisticsTemplate(), `beforeEnd`);
});

const createFilm = () => {
  const filmsList = document.querySelector(`.films-list`);
  const filmsListContainer = filmsList.querySelector(`.films-list__container`);
  const films = generateFilms(FILMS_COUNT);

  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
    renderComponent(filmsListContainer, createFilmCardTemplate(films[i]), `beforeEnd`);
  }

  const filmCards = filmsList.querySelectorAll(`.film-card`);

  showFilmDetails(filmCards, films);
};

const showMoreFilms = () => {
  const filmsList = document.querySelector(`.films-list`);
  const filmsListContainer = filmsList.querySelector(`.films-list__container`);
  const films = generateFilms(FILMS_COUNT);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  renderComponent(filmsList, createShowMoreButtonTemplate(), `beforeEnd`);

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => renderComponent(filmsListContainer, createFilmCardTemplate(film), `beforeend`));

    const filmCards = filmsList.querySelectorAll(`.film-card`);

    showFilmDetails(filmCards, films);

    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
};

const showFilmDetails = (filmCards, films) => {
  const filmDetailsContainer = document.querySelector(`.film-details`);

  for (let i = 0; i < filmCards.length; i++) {
    const filmCard = filmCards[i];

    filmCard.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        filmDetailsContainer.style = `display: block`;
        renderComponent(filmDetailsContainer, createFullFilmDetailsTemplate(films[i]), `beforeEnd`);
      }
    });
  }
};

const closeFilmDetails = () => {
  const filmDetailsContainer = document.querySelector(`.film-details`);

  filmDetailsContainer.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`film-details__close-btn`)) {
      const filmDetailsForm = filmDetailsContainer.querySelector(`.film-details__inner`);

      filmDetailsForm.remove();
      filmDetailsContainer.style = `display: none`;
    }
  });
};
