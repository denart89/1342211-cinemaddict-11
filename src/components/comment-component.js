import AbstractComponent from "./abstract-component";
import {encode} from "he";
import moment from "moment";
import {MILLISECONDS_PER_DAY, ONE_DAY, WEEK} from "../constants";

const createCommentItem = (comment, isDeletingButton) => {
  const {id, message: currentMessage, emotion, date, authorName} = comment;
  const message = encode(currentMessage);
  const formattedDate = getFormattedDate(date);
  const buttonText = isDeletingButton ? `Deleting…` : `Delete`;

  return `<li class="film-details__comment" data-id="${id}">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${message}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${authorName}</span>
                <span class="film-details__comment-day">${formattedDate}</span>
                <button class="film-details__comment-delete" data-id="${id}">${buttonText}</button>
              </p>
            </div>
          </li>`;
};

const getFormattedDate = (date) => {
  const currentDate = new Date();
  let newDate;

  const quantityDays = Math.round(((currentDate.getTime() - moment(date).unix()) / MILLISECONDS_PER_DAY));

  if (quantityDays > WEEK) {
    newDate = moment(date).format(`YYYY/MM/DD HH:mm`);
  } else if (quantityDays > ONE_DAY) {
    newDate = `${quantityDays} days ago`;
  } else {
    newDate = `Today`;
  }

  return newDate;
};

export default class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();

    this._comment = comment;
  }

  getTemplate() {
    return createCommentItem(this._comment);
  }
}
