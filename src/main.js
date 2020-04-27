import {Profile} from './components/profile';
import {Filter} from './components/filter';
import {Sort} from './components/sort';
import {ShowMoreButton} from './components/show-more-button';
import {FooterStatistics} from './components/footer-statistics';
import {Comments} from "./components/comments";
import {FilmsList} from './components/films-list';
import {FilmDetails} from './components/film-details';
import {Film} from './components/film';

import {generateFilms} from './data/film';
import {generateSort} from './data/sort';
import {generateFilter} from './data/filter';
import {generateComments} from "./data/comments";
import {getRankName} from './data/profile';

import {render, renderPosition} from './utils';

const body = document.querySelector(`body`);

const FILMS_COUNT = 22;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

document.addEventListener(`DOMContentLoaded`, () => {
  const header = body.querySelector(`.header`);
  const main = body.querySelector(`.main`);
  const footerStatistics = body.querySelector(`.footer .footer__statistics`);

  render(header, new Profile(getRankName()).getElement(), renderPosition.APPEND);

  render(main, new FilmsList().getElement(), renderPosition.APPEND);

  render(main, new Filter(generateFilter()).getElement(), renderPosition.PREPEND);

  const navigation = document.querySelector(`.main-navigation`);

  render(navigation, new Sort(generateSort()).getElement(), renderPosition.AFTER);

  renderFilm();
  showMoreFilms();

  render(footerStatistics, new FooterStatistics().getElement(), renderPosition.APPEND);
});

const renderFilm = () => {
  const filmsList = document.querySelector(`.films-list`);
  const filmsListContainer = filmsList.querySelector(`.films-list__container`);
  const films = generateFilms(FILMS_COUNT);

  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
    render(filmsListContainer, new Film(films[i]).getElement(), renderPosition.APPEND);
  }

  const filmCards = filmsList.querySelectorAll(`.film-card`);

  showFilmDetails(filmCards, films);
};

const showMoreFilms = () => {
  const filmsList = document.querySelector(`.films-list`);
  const filmsListContainer = filmsList.querySelector(`.films-list__container`);
  const films = generateFilms(FILMS_COUNT);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  render(filmsList, new ShowMoreButton().getElement(), renderPosition.APPEND);

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => render(filmsListContainer, new Film(film).getElement(), renderPosition.APPEND));

    const filmCards = filmsList.querySelectorAll(`.film-card`);

    showFilmDetails(filmCards, films);

    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
};

const showFilmDetails = (filmCards, films) => {
  for (let i = 0; i < filmCards.length; i++) {
    const filmCard = filmCards[i];

    filmCard.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        render(body, new FilmDetails(films[i]).getElement(), renderPosition.APPEND);

        const filmDetailsContainer = body.querySelector(`.film-details`);
        const comments = filmDetailsContainer.querySelector(`.form-details__bottom-container`);

        render(comments, new Comments(generateComments()).getElement(), renderPosition.APPEND);

        closeFilmDetails();
      }
    });
  }
};

const closeFilmDetails = () => {
  const filmDetailsContainer = body.querySelector(`.film-details`);

  filmDetailsContainer.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`film-details__close-btn`)) {
      filmDetailsContainer.remove();
    }
  });
};
