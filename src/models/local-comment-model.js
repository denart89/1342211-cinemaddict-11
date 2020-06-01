import CommentModel from "../models/comment-model.js";
import FilmModel from "../models/film-model.js";

export default class LocalComment {
  constructor(comment) {
    this.message = comment[`comment`];
    this.date = comment[`date`];
    this.emotion = comment[`emotion`];
  }

  toRAW() {
    return {
      "comment": this.message,
      "date": this.date,
      "emotion": this.emotion,
    };
  }

  static parseComment(comment) {
    return {
      movie: new FilmModel(comment.movie),
      comments: new CommentModel(comment.comments[comment.comments.length - 1]),
    };
  }
}
