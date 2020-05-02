import {remove, render, renderPosition} from "../utils/render";
import {FilmDetails} from "../components/film-details";
import {Comments} from "../components/comments";
import {generateComments} from "../data/comments";
import {NoFilms} from "../components/no-films";
import {Film} from "../components/film";
import {ShowMoreButton} from "../components/show-more-button";
import {FilmsList} from "../components/films-list";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

class PageController {
  constructor() {
    this._showMoreButton = new ShowMoreButton();
    this._filmsList = new FilmsList();
    this._noFilms = new NoFilms();
    this._filmsListContainer = this._filmsList.getElement().querySelector(`.films-list__container`);
    this._body = document.querySelector(`body`);
    this._main = document.querySelector(`.main`);
  }

  renderFilmsList() {
    render(this._main, this._filmsList, renderPosition.APPEND);
  }

  render(films) {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this.renderFilmsList();

    if (films.length === 0) {
      render(this._main, this._noFilms, renderPosition.APPEND);
    } else {
      films.slice(0, showingFilmsCount).forEach((film) => {
        const cardFilm = new Film(film);

        render(this._filmsListContainer, cardFilm, renderPosition.APPEND);

        this.renderFilmDetails(cardFilm, film);
      });

      render(this._filmsList.getElement(), this._showMoreButton, renderPosition.APPEND);

      this._showMoreButton.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
          const filmCard = new Film(film);

          render(this._filmsListContainer, filmCard, renderPosition.APPEND);

          this.renderFilmDetails(filmCard, film);
        });

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButton);
          this._showMoreButton.removeElement();
        }
      });
    }
  }

  renderFilmDetails(card, film) {
    card.setClickHandler((evt) => {
      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        const filmDetails = new FilmDetails(film);

        render(this._body, filmDetails, renderPosition.APPEND);

        const comments = this._body.querySelector(`.film-details .form-details__bottom-container`);

        render(comments, new Comments(generateComments()), renderPosition.APPEND);

        this.closeFilmDetails(filmDetails);
      }
    });
  }

  closeFilmDetails(filmDetails) {
    filmDetails.setClickHandler((evt) => {
      if (evt.target.classList.contains(`film-details__close-btn`)) {
        remove(filmDetails);
      }
    });

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        remove(filmDetails);
      }
    });
  }
}

export {PageController};
