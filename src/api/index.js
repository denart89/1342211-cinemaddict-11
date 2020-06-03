import FilmModel from "../models/film-model.js";
import {Url, Method} from "../constants";
import {checkStatus} from "../utils/common.js";
import CommentModel from "../models/comment-model";
import LocalCommentModel from "../models/local-comment-model";

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getFilms() {
    return this._load({url: Url.MOVIES})
      .then((response) => response.json())
      .then(FilmModel.parseFilms);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  getComments(id) {
    return this._load({url: `${Url.COMMENTS}/${id}`})
      .then((response) => response.json())
      .then(CommentModel.parseComments);
  }

  addComment(id, comment) {
    return this._load({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(LocalCommentModel.parseComment)
      .then((film) => film.comments);
  }

  updateFilm(id, film) {
    return this._load({
      url: `${Url.MOVIES}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(FilmModel.parseFilm);
  }

  removeComment(id) {
    return this._load({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.DELETE,
    });
  }
}
