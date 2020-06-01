import CommentComponent from "./comment-component";
import AbstractSmartComponent from "./abstract-smart-component";
import LocalComment from "../models/local-comment-model";
import {SHAKE_ANIMATION_TIMEOUT, EMOTIONS, BUTTONS_CODE} from "../constants";
import moment from "moment";
import {getFormattedRuntime} from "./film-component";
import {shake} from "../utils/common";

const createCommentsListTemplate = (comments) => {
  return comments
    .map((comment) => new CommentComponent(comment).getTemplate())
    .join(``);
};

const createEmojiItem = (emotion, isChecked) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="smile" ${isChecked ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

const createEmojiTemplate = (emotion) => {
  return EMOTIONS.map((it) => createEmojiItem(it, it === emotion)).join(``);
};

const createEmojiImage = (emotion) => {
  const emotionImage = `<img src="./images/emoji/${emotion}.png" width="55" height="55">`;
  return emotion ? emotionImage : ``;
};

const createFullFilmDetailsTemplate = (film, comments, options = {}) => {
  const {title, description, poster, rating, releaseDate, runtime, genres, originalTitle, director, writers, actors, country, age} = film;
  const commentsCount = comments.length;
  const {emotion, message} = options;
  const formattedReleaseDate = moment(releaseDate).format(`YYYY`);
  const formattedRuntime = getFormattedRuntime(runtime);
  const getGenres = genres.map((it) => `<span class="film-details__genre">${it}</span>`).join(``);

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${poster}" alt="">

                <p class="film-details__age">${age}+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">${originalTitle}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${rating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${writers.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actors.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${formattedReleaseDate}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${formattedRuntime}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                    <td class="film-details__cell">
                      <span class="film-details__genre">${getGenres}</span>
                    </td>
                  </tr>
                </table>

                <p class="film-details__film-description">${description}</p>
              </div>
            </div>

            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.controls.isWatchlist ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.controls.isWatched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.controls.isFavorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
      
              <ul class="film-details__comments-list">
                  ${createCommentsListTemplate(comments)}
              </ul>
  
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                    ${createEmojiImage(emotion)}
                </div>
      
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${message ? message : ``}</textarea>
                </label>
      
                <div class="film-details__emoji-list">
                    ${createEmojiTemplate(emotion)}
                </div>
              </div>    
            </section>
          </div>
        </form>
    </section>`;
};

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    this._emotion = null;
    this._comments = comments;
    this._message = null;
    this._setRemoveCommentClickHandler = null;
    this._setNewCommentSubmitHandler = null;
    this.setEmojiClickHandler();
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._comments.setDataChangeHandler(this._onCommentsChange);
  }

  getTemplate() {
    return createFullFilmDetailsTemplate(this._film, this._comments.getComments(), {
      emotion: this._emotion,
      message: this._message,
    });
  }

  setCloseButtonClickHandler(handler) {
    const filmDetailsCloseBtnElement = this.getElement().querySelector(`.film-details__close-btn`);
    filmDetailsCloseBtnElement.addEventListener(`click`, handler);
    this._setCloseBtnHandler = handler;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, handler);
    this._setWatchListHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, handler);
    this._setWatchedHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, handler);
    this._setFavorite = handler;
  }

  setRemoveCommentClickHandler(handler) {
    const commentDelete = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    commentDelete.forEach((comment) => {
      comment.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const commentId = evt.target.dataset.id;

        handler(commentId);
      });
    });

    this._setRemoveCommentClickHandler = handler;
  }

  setNewCommentSubmitHandler(handler) {
    const commentInput = this.getElement().querySelector(`.film-details__comment-input`);

    commentInput.addEventListener(`input`, (evt) => {
      this._message = evt.target.value;
    });

    commentInput.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === BUTTONS_CODE.ENTER && (evt.ctrlKey || evt.metaKey)) {
        if (this._emotion && this._message) {
          const newCommentData = this._createNewComment(this._emotion, this._message);

          const newComment = new LocalComment(newCommentData);
          handler(newComment);
        } else {
          this.shakeCommentInput(this.getElement().querySelector(`.film-details__comment-input`));
        }
      }
    });

    this._setNewCommentSubmitHandler = handler;
  }

  setEmojiClickHandler() {
    const emojiLabel = this.getElement().querySelectorAll(`.film-details__emoji-label`);

    emojiLabel.forEach((label) => {
      label.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this._emotion = label.getAttribute(`for`).substring(`emoji-`.length);

        createEmojiImage(this._emotion);

        this.rerender();

        const inputField = this.getElement().querySelector(`.film-details__comment-input`);
        inputField.focus();
        inputField.selectionStart = inputField.value.length;
      });
    });
  }

  disable() {
    this.getElement().querySelector(`.film-details__inner`).setAttribute(`disabled`, `disabled`);
    this.getElement().querySelector(`.film-details__comment-input`).setAttribute(`disabled`, `disabled`);
  }

  enable() {
    this.getElement().querySelector(`.film-details__inner`).removeAttribute(`disabled`);
    this.getElement().querySelector(`.film-details__comment-input`).removeAttribute(`disabled`);
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setRemoveCommentClickHandler(this._setRemoveCommentClickHandler);
    this.setCloseButtonClickHandler(this._setCloseBtnHandler);
    this.setWatchListButtonClickHandler(this._setWatchListHandler);
    this.setWatchedButtonClickHandler(this._setWatchedHandler);
    this.setFavoriteButtonClickHandler(this._setFavorite);
    this.setNewCommentSubmitHandler(this._setNewCommentSubmitHandler);
    this.setEmojiClickHandler();
  }

  _createNewComment(emotion, message) {
    return {
      date: new Date(),
      emotion,
      comment: message,
    };
  }

  _clearNewComment() {
    this._emotion = null;
    this._message = null;
  }

  _onCommentsChange() {
    this._clearNewComment();
    this.rerender();
  }

  disableCommentButton(id) {
    const commentsButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    const commentButton = Array.from(commentsButtons).find((button) => button.dataset.id === id);

    commentButton.setAttribute(`disabled`, `disabled`);
  }

  enableCommentButton(id) {
    const commentsButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    const commentButton = Array.from(commentsButtons).find((button) => {
      return button.dataset.id === id;
    });
    commentButton.removeAttribute(`disabled`);
  }

  shake() {
    shake(this.getElement());

    const formInput = this.getElement().querySelector(`.film-details__comment-input`);
    formInput.style.boxShadow = `0px 0px 5px 2px red`;

    setTimeout(() => {
      formInput.style.border = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeCommentInput() {
    this.shake();
  }

  shakeComment(comment) {
    shake(comment);
  }
}
