import {Profile} from './components/profile';
import {Filter} from './components/filter';
import {Sort} from './components/sort';
import {ShowMoreButton} from './components/show-more-button';
import {FooterStatistics} from './components/footer-statistics';
import {Comments} from "./components/comments";
import {FilmsList} from './components/films-list';
import {FilmDetails} from './components/film-details';
import {Film} from './components/film';
import {NoFilms} from './components/no-films';

import {generateFilms} from './data/film';
import {generateSort} from './data/sort';
import {generateFilter} from './data/filter';
import {generateComments} from "./data/comments";
import {getRankName} from './data/profile';

import {remove, render, renderPosition} from './utils/render';

const FILMS_COUNT = 10;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);
const footerStatistics = body.querySelector(`.footer .footer__statistics`);

render(header, new Profile(getRankName()), renderPosition.APPEND);

render(main, new FilmsList(), renderPosition.APPEND);

const filmsList = document.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

render(main, new Filter(generateFilter()), renderPosition.PREPEND);

const navigation = document.querySelector(`.main-navigation`);

render(navigation, new Sort(generateSort()), renderPosition.AFTER);

const films = generateFilms(FILMS_COUNT);

const closeFilmDetails = (filmDetails) => {
  filmDetails.setClickHandler((evt) => {
    if (evt.target.classList.contains(`film-details__close-btn`)) {
      remove(filmDetails);
    }
  });

  body.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      remove(filmDetails);
    }
  });
};

const renderFilmDetails = (card, film) => {
  card.setClickHandler((evt) => {
    if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
      const filmDetails = new FilmDetails(film);

      render(body, filmDetails, renderPosition.APPEND);

      const comments = body.querySelector(`.film-details .form-details__bottom-container`);

      render(comments, new Comments(generateComments()), renderPosition.APPEND);

      closeFilmDetails(filmDetails);
    }
  });
};

const renderFilms = () => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  if (films.length === 0) {
    render(filmsList, new NoFilms(), renderPosition.PREPEND);
  } else {
    films.slice(0, showingFilmsCount).forEach((film) => {
      const filmCard = new Film(film);

      render(filmsListContainer, filmCard, renderPosition.APPEND);

      renderFilmDetails(filmCard, film);
    });

    const showMoreButton = new ShowMoreButton();
    render(filmsList, showMoreButton, renderPosition.APPEND);

    showMoreButton.setClickHandler(() => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
        const filmCard = new Film(film);

        render(filmsListContainer, filmCard, renderPosition.APPEND);

        renderFilmDetails(filmCard, film);
      });

      if (showingFilmsCount >= films.length) {
        remove(showMoreButton);
        showMoreButton.removeElement();
      }
    });
  }
};

renderFilms();

render(footerStatistics, new FooterStatistics(), renderPosition.APPEND);
