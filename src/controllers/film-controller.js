import {FilmComponent} from "../components/film-component";
import {FilmDetailsComponent} from "../components/film-details-component";
import {render, renderPosition} from "../utils/render";
import {CommentsComponent} from "../components/comments-component";
import {generateComments} from "../data/comments";

export default class FilmController {
  constructor(container) {
    this._container = container;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._body = document.querySelector(`body`);
  }

  render(film) {
    this._filmComponent = new FilmComponent(film);
    render(this._container, this._filmComponent, renderPosition.APPEND);

    this._renderFilmDetails(film);
  }

  _renderFilmDetails(film) {
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmComponent.setClickHandler((evt) => {
      if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
        render(this._body, this._filmDetailsComponent, renderPosition.APPEND);

        const comments = this._body.querySelector(`.film-details .form-details__bottom-container`);

        render(comments, new CommentsComponent(generateComments()), renderPosition.APPEND);

        this._closeFilmDetails();
      }
    });
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
}
