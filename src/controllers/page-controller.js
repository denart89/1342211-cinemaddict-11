import {FilmDetailsComponent} from "../components/film-details-component";
import {CommentsComponent} from "../components/comments-component";
import {NoFilmsComponent} from "../components/no-films-component";
import {FilmComponent} from "../components/film-component";
import {ShowMoreButtonComponent} from "../components/show-more-button-component";
import {FilmsListComponent} from "../components/film-list-component";
import {SortComponent, SortType} from "../components/sort-component";
import {generateComments} from "../data/comments";
import {remove, render, renderPosition} from "../utils/render";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

class PageController {
  constructor(container) {
    this._container = container;

    this._showingFilmsCountOnStart = SHOWING_FILMS_COUNT_ON_START;
    this._showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;

    this._films = [];

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._filmsListContainerComponent = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._body = document.querySelector(`body`);
    this._main = document.querySelector(`.main`);
    this._navigation = document.querySelector(`.main-navigation`);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;

    this._renderSort();

    this._renderFilmsContainer();
    this._renderFilmsList();

    if (films.length === 0) {
      render(this._filmsListContainerComponent, this._noFilmsComponent, renderPosition.APPEND);
    } else {
      this._renderFilms(films.slice(0, this._showingFilmsCountOnStart));

      this._renderShowMoreButton();
    }
  }

  _renderSort() {
    render(this._navigation, this._sortComponent, renderPosition.AFTER);
  }

  _renderFilmsContainer() {
    render(this._main, this._container, renderPosition.APPEND);
  }

  _renderFilmsList() {
    render(this._container.getElement(), this._filmsListComponent, renderPosition.APPEND);
  }

  _getSortedTasks(films, sortType, from, to) {
    let sortedFilms = [];

    const showingFilms = films.slice();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = showingFilms.sort((a, b) => b.releaseDate.year - a.releaseDate.year);
        break;
      case SortType.RATING:
        sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = showingFilms;
        break;
    }

    return sortedFilms.slice(from, to);
  }

  _renderFilms(films) {
    films.forEach((film) => {
      const cardFilm = new FilmComponent(film);

      render(this._filmsListContainerComponent, cardFilm, renderPosition.APPEND);

      this._renderFilmDetails(cardFilm, film);
    });
  }

  _renderFilmDetails(card, film) {
    card.setClickHandler((evt) => {
      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        const filmDetails = new FilmDetailsComponent(film);

        render(this._body, filmDetails, renderPosition.APPEND);

        const comments = this._body.querySelector(`.film-details .form-details__bottom-container`);

        render(comments, new CommentsComponent(generateComments()), renderPosition.APPEND);

        this._closeFilmDetails(filmDetails);
      }
    });
  }

  // TODO: Пофиксить ошибку сортировки при нажатии на "show more" button
  _renderShowMoreButton() {
    if (this._showingFilmsCountOnStart >= this._films.length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, renderPosition.APPEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCountOnStart;
      this._showingFilmsCountOnStart = this._showingFilmsCountOnStart + this._showingFilmsCountByButton;

      const sortedFilms = this._getSortedTasks(this._films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCountOnStart);

      this._renderFilms(sortedFilms);

      if (this._showingFilmsCountOnStart >= this._films.length) {
        remove(this._showMoreButtonComponent);
        this._showMoreButtonComponent.removeElement();
      }
    });
  }

  _closeFilmDetails(filmDetails) {
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

  _onSortTypeChange(sortType) {
    const sortedFilms = this._getSortedTasks(this._films, sortType, 0, this._showingFilmsCountOnStart);

    this._filmsListContainerComponent.innerHTML = ``;

    this._renderFilms(sortedFilms);

    this._renderShowMoreButton();
  }
}

export {PageController};
