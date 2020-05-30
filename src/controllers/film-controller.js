import {FilmComponent} from "../components/film-component";
import {FilmDetailsComponent} from "../components/film-details-component";
import {render, renderPosition, replace, remove} from "../utils/render";
import {generateComments} from "../data/comments";
import {CommentsModel} from "../models/comments-model";

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._comments = new CommentsModel();

    this._body = document.querySelector(`body`);

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._isCommentsChanged = false;

    this._onCommentClick = this._onCommentClick.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._comments.setComments(generateComments());

    this._filmComponent = new FilmComponent(film, this._comments);
    this._createCardDataChangeHandlers(film);

    this._filmDetailsComponent = new FilmDetailsComponent(film, this._comments);
    this._createFilmDetailsHandlers(film);

    if (!oldFilmComponent && !oldFilmDetailsComponent) {
      render(this._container, this._filmComponent, renderPosition.APPEND);
    } else {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      this._createFilmDetailsHandlers(film);
    }
  }

  destroy() {
    remove(this._filmComponent);
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
      isHistory: !film.isHistory,
    });
    const favoriteButtonClickHandler = this._createButtonClickHandler(film, {
      isFavorites: !film.isFavorites,
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
      isHistory: !film.isHistory,
    });
    const favoriteButtonClickHandler = this._createButtonClickHandler(film, {
      isFavorites: !film.isFavorites,
    });

    this._filmDetailsComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmDetailsComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmDetailsComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
    this._filmDetailsComponent.setCloseButtonClickHandler(() => remove(this._filmDetailsComponent));

    this._filmDetailsComponent.setRemoveCommentClickHandler(this._onCommentClick);
    this._filmDetailsComponent.setNewCommentSubmitHandler((newComment) => {
      this._filmDetailsComponent.disable();

      this._onCommentsChange(null, newComment);
    });

    this._filmComponent.setClickHandler((evt) => {
      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        render(this._body, this._filmDetailsComponent, renderPosition.APPEND);

        this._closeFilmDetails();
      }
    });
  }

  _setDefaultView() {
    this._closeFilmDetails();
  }

  _onCommentClick(commentId) {
    this._filmDetailsComponent.setDeleteButton(commentId);
  }

  _onCommentsChange(oldCommentId, newComment) {
    this._isCommentsChanged = true;

    if (oldCommentId === null) {
      this._filmDetailsComponent.enable();
      this._comments.addComment(newComment);
    }
  }
}
