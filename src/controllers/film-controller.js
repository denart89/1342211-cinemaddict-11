import FilmComponent from "../components/film-component";
import FilmDetailsComponent from "../components/film-details-component";
import {render, renderPosition, replace, remove} from "../utils/render";
import CommentsModel from "../models/comments-model";
import {ButtonCode, ErrorMessage, SHAKE_ANIMATION_TIMEOUT} from "../constants";
import FilmModel from "../models/film-model";

export default class FilmController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._film = null;
    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._comments = null;
    this._api = api;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._body = document.querySelector(`body`);
    this._onFilmClick = this._onFilmClick.bind(this);
    this._onCommentClick = this._onCommentClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(this._film);
    this._createCardDataChangeHandlers();
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
      remove(this._filmDetailsComponent);
    }
  }

  _createButtonClickHandler(changedData) {
    return (evt) => {
      evt.preventDefault();

      const newFilm = FilmModel.clone(this._film);
      newFilm.controls[changedData] = !newFilm.controls[changedData];

      this._onDataChange(this, this._film, newFilm);
    };
  }

  _createCardDataChangeHandlers() {
    const watchListButtonClickHandler = this._createButtonClickHandler(`isWatchlist`);
    const watchedButtonClickHandler = this._createButtonClickHandler(`isWatched`);
    const favoriteButtonClickHandler = this._createButtonClickHandler(`isFavorite`);

    this._filmComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
  }

  _createFilmDetailsHandlers() {
    const watchListButtonClickHandler = this._createButtonClickHandler(`isWatchlist`);
    const watchedButtonClickHandler = this._createButtonClickHandler(`isWatched`);
    const favoriteButtonClickHandler = this._createButtonClickHandler(`isFavorite`);

    this._filmDetailsComponent.setWatchListButtonClickHandler(watchListButtonClickHandler);
    this._filmDetailsComponent.setWatchedButtonClickHandler(watchedButtonClickHandler);
    this._filmDetailsComponent.setFavoriteButtonClickHandler(favoriteButtonClickHandler);
    this._filmDetailsComponent.setCloseButtonClickHandler(() => remove(this._filmDetailsComponent));

    this._filmDetailsComponent.setRemoveCommentClickHandler(this._onCommentClick);
    this._filmDetailsComponent.setNewCommentSubmitHandler((newComment) => {
      this._filmDetailsComponent.disable();

      this._onCommentChange(null, newComment);
    });

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === ButtonCode.ESC) {
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    this._closeFilmDetails();
  }

  _onFilmClick() {
    this._onViewChange();
    this._api.getComments(this._film.id).then((comments) => {
      this._comments = new CommentsModel();
      this._comments.setComments(comments);
      this._filmDetailsComponent = new FilmDetailsComponent(this._film, this._comments);
      this._createFilmDetailsHandlers(this._film);
      render(this._body, this._filmDetailsComponent, renderPosition.APPEND);
    })
      .catch(() => {
        return Promise.reject(new Error(ErrorMessage.CONNECTION));
      });
  }

  _onCommentClick(commentId) {
    this._filmDetailsComponent.disableCommentButton(commentId);
    this._filmDetailsComponent.setDeletindButton(commentId);

    this._onCommentChange(commentId, null);
  }

  _onCommentChange(oldCommentId, newComment) {
    if (newComment === null) {
      this._api.removeComment(oldCommentId)
        .then(() => {
          this._comments.removeComment(oldCommentId);
          const newFilm = FilmModel.clone(this._film);

          this._onDataChange(this, this._film, newFilm);
        })
        .catch(() => {
          const commentsElements = this._filmDetailsComponent.getElement().querySelectorAll(`.film-details__comment`);
          const commentElement = Array.from(commentsElements).find((element) => element.dataset.id === oldCommentId);

          this._filmDetailsComponent.enableCommentButton(oldCommentId);
          this._filmDetailsComponent.shakeComment(commentElement);

          setTimeout(() => {
            this._filmDetailsComponent.setDeletindButton(null);
          }, SHAKE_ANIMATION_TIMEOUT);
        });
    } else if (oldCommentId === null) {
      this._api.addComment(this._film.id, newComment)
        .then((comment) => {
          this._filmDetailsComponent.enable();
          this._comments.addComment(comment);
          const newFilm = FilmModel.clone(this._film);
          this._onDataChange(this, this._film, newFilm);
        })
        .catch(() => {
          this._filmDetailsComponent.enable();
          this._filmDetailsComponent.shake();
        });
    }
  }
}
