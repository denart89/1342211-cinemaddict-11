import {AbstractComponent} from "./abstract-component";
import {encode} from "he";

const createCommentItem = (comment) => {
  const {id, text: commentText, emoji, date, author} = comment;
  const text = encode(commentText);
  const formattedDate = getFormattedDate(date);

  return `<li class="film-details__comment" data-id="${id}">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${formattedDate}</span>
                <button class="film-details__comment-delete" data-id="${id}">Delete</button>
              </p>
            </div>
          </li>`;
};

const getFormattedDate = (date) => {
  const moment = require(`moment`);
  const currentDate = new Date();
  const quantityDays = Math.round(((currentDate.getTime() - date.getTime()) / 86400000));
  let newDate;

  if (quantityDays > 7) {
    newDate = moment(date).format(`YYYY/MM/DD HH:mm`);
  } else if (quantityDays > 1) {
    newDate = `${quantityDays} days ago`;
  } else {
    newDate = `Today`;
  }

  return newDate;
};

class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentItem(this._comment);
  }
}

export {CommentComponent};
