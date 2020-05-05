import {FilmDetailsComponent} from "../components/film-details";
import {CommentsComponent} from "../components/comments";
import {NoFilmsComponent} from "../components/no-films";
import {FilmComponent} from "../components/film";
import {ShowMoreButtonComponent} from "../components/show-more-button";
import {FilmsListComponent} from "../components/films-list";
import {SortComponent, SortType} from "../components/sort";
import {generateComments} from "../data/comments";
import {remove, render, renderPosition} from "../utils/render";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

class Page {
  constructor() {
    this._showMoreButton = new ShowMoreButtonComponent();
    this._filmsList = new FilmsListComponent();
    this._noFilms = new NoFilmsComponent();
    this._sort = new SortComponent();
    this._filmsListContainer = this._filmsList.getElement().querySelector(`.films-list__container`);
    this._body = document.querySelector(`body`);
    this._main = document.querySelector(`.main`);
    this._navigation = document.querySelector(`.main-navigation`);
  }

  renderSort() {
    render(this._navigation, this._sort, renderPosition.AFTER);
  }

  renderFilmsList() {
    render(this._main, this._filmsList, renderPosition.APPEND);
  }

  getSortedTasks(films, sortType, from, to) {
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
  };

  renderFilms(films) {
    films.forEach((film) => {
      const cardFilm = new FilmComponent(film);

      render(this._filmsListContainer, cardFilm, renderPosition.APPEND);

      this.renderFilmDetails(cardFilm, film);
    });
  }

  render(films) {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this.renderSort();
    this.renderFilmsList();

    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(this._filmsList.getElement(), this._showMoreButton, renderPosition.APPEND);

      this._showMoreButton.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        this.renderFilms(films.slice(prevFilmsCount, showingFilmsCount));

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButton);
          this._showMoreButton.removeElement();
        }
      });
    };

    if (films.length === 0) {
      render(this._main, this._noFilms, renderPosition.APPEND);
    } else {
      this.renderFilms(films.slice(0, SHOWING_FILMS_COUNT_ON_START));

      renderShowMoreButton();
    }

    // TODO: Проверить, что не так с сортировкой при нажатии на кнопку "Show more"
    this._sort.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = this.getSortedTasks(films, sortType, 0, showingFilmsCount);

      this._filmsListContainer.innerHTML = ``;

      this.renderFilms(sortedFilms);

      renderShowMoreButton();
    });
  }

  renderFilmDetails(card, film) {
    card.setClickHandler((evt) => {
      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        const filmDetails = new FilmDetailsComponent(film);

        render(this._body, filmDetails, renderPosition.APPEND);

        const comments = this._body.querySelector(`.film-details .form-details__bottom-container`);

        render(comments, new CommentsComponent(generateComments()), renderPosition.APPEND);

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

export {Page};
