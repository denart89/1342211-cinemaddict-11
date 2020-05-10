import {FilmComponent} from "../components/film-component";
import {FilmDetailsComponent} from "../components/film-details-component";
import {render, renderPosition} from "../utils/render";

export default class FilmController {
  constructor(container) {
    this._container = container;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
  }

  render(film) {
    this._filmComponent = new FilmComponent(film);

    render(this._container, this._filmComponent, renderPosition.APPEND);
  }

  _renderFilmDetails(film) {
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    render(this._container, this._filmDetailsComponent, renderPosition.APPEND);
  }

  _closeFilmDetails() {
    this._filmDetailsComponent.getElement().remove();
  }
}
