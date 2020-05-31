import {FilmComponent} from "../components/film-component";
import {FilmDetailsComponent} from "../components/film-details-component";
import {render, renderPosition, replace, remove} from "../utils/render";
import {generateComments} from "../data/comments";
import {CommentsModel} from "../models/comments-model";

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._film = null;
    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._comments = new CommentsModel();

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._isCommentsChanged = false;

    this._onFilmClick = this._onFilmClick.bind(this);

    this._onCommentClick = this._onCommentClick.bind(this);
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._comments.setComments(generateComments());

    this._filmComponent = new FilmComponent(this._film, this._comments);
    this._createCardDataChangeHandlers(this._film);

    this._filmComponent.setClickHandler(this._onFilmClick);

    if (!oldFilmComponent) {
      render(this._container, this._filmComponent, renderPosition.APPEND);
    } else {
      replace(oldFilmComponent.getElement().parentNode, this._filmComponent.getElement(), oldFilmComponent.getElement());

      if (oldFilmDetailsComponent) {
        this._filmDetailsComponent = new FilmDetailsComponent(this._film, this._comments);
        replace(oldFilmDetailsComponent.getElement().parentNode, this._filmDetailsComponent.getElement(), oldFilmDetailsComponent.getElement());
        this._createFilmDetailsHandlers(film);
      }
    }
  }

  _closeFilmDetails() {
    if (this._filmDetailsComponent) {
      this._filmDetailsComponent.getElement().remove();
    }
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

    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === 27) {
        remove(this._filmDetailsComponent);
      }
    });
  }

  _setDefaultView() {
    this._closeFilmDetails();
  }

  _onFilmClick() {
    const footer = document.querySelector(`.footer`);

    this._onViewChange();
    this._filmDetailsComponent = new FilmDetailsComponent(this._film, this._comments);
    this._createFilmDetailsHandlers(this._film);
    render(footer, this._filmDetailsComponent, renderPosition.APPEND);
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
