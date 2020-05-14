import {FilmComponent} from "../components/film-component";
import {FilmDetailsComponent} from "../components/film-details-component";
import {render, renderPosition, replace} from "../utils/render";
import {CommentsComponent} from "../components/comments-component";
import {generateComments} from "../data/comments";

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._body = document.querySelector(`body`);

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._createCardDataChangeHandlers(film);

    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._createFilmDetailsHandlers(film);

    if (!oldFilmComponent && !oldFilmDetailsComponent) {
      render(this._container, this._filmComponent, renderPosition.APPEND);
    } else {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      this._createFilmDetailsHandlers(film);
    }
  }

  _closeFilmDetails() {
    this._filmDetailsComponent.setClickHandler((evt) => {
      if (evt.target.classList.contains(`film-details__close-btn`)) {
        this._filmDetailsComponent.getElement().remove();
      }
    });

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._filmDetailsComponent.getElement().remove();
      }
    });
  }

  _createButtonClickHandler(film, changedData) {
    return (evt) => {
      evt.preventDefault();

      this._onDataChange(this, film, Object.assign({}, film, changedData));
    };
  }

  _createCardDataChangeHandlers(film) {
    const watchListButtonClickHandler = this._createButtonClickHandler(film, {
      isWatchlist: !film.isWatchlist,
    });
    const watchedButtonClickHandler = this._createButtonClickHandler(film, {
      isWatched: !film.isWatched,
    });
    const favoriteButtonClickHandler = this._createButtonClickHandler(film, {
      isFavorite: !film.isFavorite,
    });

    this._filmComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
  }

  _createFilmDetailsHandlers(film) {
    const watchListButtonClickHandler = this._createButtonClickHandler(film, {
      isWatchlist: !film.isWatchlist,
    });
    const watchedButtonClickHandler = this._createButtonClickHandler(film, {
      isWatched: !film.isWatched,
    });
    const favoriteButtonClickHandler = this._createButtonClickHandler(film, {
      isFavorite: !film.isFavorite,
    });

    this._filmDetailsComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmDetailsComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmDetailsComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);

    this._filmComponent.setClickHandler((evt) => {
      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        render(this._body, this._filmDetailsComponent, renderPosition.APPEND);

        const comments = this._body.querySelector(`.film-details .form-details__bottom-container`);

        render(comments, new CommentsComponent(generateComments()), renderPosition.APPEND);

        this._closeFilmDetails();
      }
    });
  }

  _setDefaultView() {
    this._closeFilmDetails();
  }
}
