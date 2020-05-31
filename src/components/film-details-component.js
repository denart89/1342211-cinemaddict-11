import {CommentComponent} from "./comment-component";
import {AbstractSmartComponent} from "./abstract-smart-component";
import {CommentModel} from "../models/comment-model";
import {getRandomArrayItem} from "../utils/common";
import {commentsAuthor, commentsEmoji} from "../data/comments";

const createCommentsListTemplate = (comments) => {
  let commentItem = ``;

  for (const comment of comments) {
    commentItem = commentItem.concat(new CommentComponent(comment).getTemplate());
  }

  return commentItem;
};

const createEmojiItem = (emoji, isChecked) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="smile" ${isChecked ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

const createEmojiTemplate = (emoji) => {
  return commentsEmoji.map((it) => createEmojiItem(it, it === emoji)).join(``);
};

const createEmojiImage = (emoji) => {
  const emojiImage = `<img src="./images/emoji/${emoji}.png" width="55" height="55">`;
  return emoji ? emojiImage : ``;
};

const createFullFilmDetailsTemplate = (film, comments, options = {}) => {
  const {name, description, image, rating, releaseDate, runtime, genre, originalName, director, writers, actors, country} = film;
  const commentsCount = comments.length;
  const {emoji, text} = options;

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${image}" alt="">

                <p class="film-details__age">18+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${name}</h3>
                    <p class="film-details__title-original">${originalName}</p>
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
                    <td class="film-details__cell">${writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${releaseDate.day} ${releaseDate.month} ${releaseDate.year}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${runtime.hours}h ${runtime.minutes}m</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      <span class="film-details__genre">${genre}</span>
                    </td>
                  </tr>
                </table>

                <p class="film-details__film-description">${description}</p>
              </div>
            </div>

            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.isWatchlist ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.isHistory ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.isFavorites ? `checked` : ``}>
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
                    ${createEmojiImage(emoji)}
                </div>
      
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text ? text : ``}</textarea>
                </label>
      
                <div class="film-details__emoji-list">
                    ${createEmojiTemplate(emoji)}
                </div>
              </div>    
            </section>
          </div>
        </form>
    </section>`;
};

class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    this._emoji = null;
    this._comments = comments;
    this._commentText = null;
    this._deleteButtonId = null;
    this._setRemoveCommentClickHandler = null;
    this._setNewCommentSubmitHandler = null;
    this.setEmojiClickHandler();
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._comments.setDataChangeHandler(this._onCommentsChange);
  }

  getTemplate() {
    return createFullFilmDetailsTemplate(this._film, this._comments.getComments(), {
      emoji: this._emoji,
      text: this._commentText,
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

  setDeleteButton(id) {
    this._deleteButtonId = id;
    this._comments.removeComment(id);

    this.rerender();
  }

  setNewCommentSubmitHandler(handler) {
    const commentInput = this.getElement().querySelector(`.film-details__comment-input`);

    commentInput.addEventListener(`input`, (evt) => {
      this._commentText = evt.target.value;
    });

    commentInput.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === 13 && (evt.ctrlKey || evt.metaKey)) {
        if (this._emoji && this._commentText) {
          const newCommentData = this._createNewComment(this._commentText, this._emoji);

          const newComment = new CommentModel(newCommentData);
          handler(newComment);
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

        this._emoji = label.getAttribute(`for`).substring(`emoji-`.length);

        createEmojiImage(this._emoji);

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

  _createNewComment(text, emoji) {
    const currentCommentId = this._comments.getComments().length;
    const currentRandomAuthor = getRandomArrayItem(commentsAuthor);

    return {
      id: currentCommentId,
      text,
      emoji,
      date: new Date(),
      author: currentRandomAuthor,
    };
  }

  _clearNewComment() {
    this._emoji = null;
    this._commentText = null;
  }

  _onCommentsChange() {
    this._clearNewComment();
    this.rerender();
  }
}

export {FilmDetailsComponent};
