import NoFilmsComponent from "../components/no-films-component";
import ShowMoreButtonComponent from "../components/show-more-button-component";
import FilmsListComponent from "../components/film-list-component";
import SortComponent from "../components/sort-component";
import {remove, render, renderPosition} from "../utils/render";
import FilmController from "./film-controller";
import {DISPLAY_FILMS_COUNT, SortType} from "../constants";
import moment from "moment";
import FilmsLoadingComponent from "../components/films-loading-component";

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;
    this._renderedFilms = 0;
    this._films = [];
    this._showedFilmControllers = [];
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsLoadingComponent = new FilmsLoadingComponent();
    this._sortComponent = new SortComponent();
    this._filmsListContainerComponent = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._main = document.querySelector(`.main`);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    this._setLoadingStatusOn();
    this._films = this._filmsModel.getFilmsByFilter();
    this._renderSort();

    this._renderFilmsContainer();
    this._renderFilmsList();

    if (!this._films.length) {
      this._setLoadingStatusOff();
      render(this._filmsListContainerComponent, this._noFilmsComponent, renderPosition.APPEND);
    } else {
      this._setLoadingStatusOff();
      this._renderFilms(this._filmsListContainerComponent, this._films);
    }
  }

  _setLoadingStatusOn() {
    render(this._filmsListContainerComponent, this._filmsLoadingComponent, renderPosition.BEFORE);
  }

  _setLoadingStatusOff() {
    remove(this._filmsLoadingComponent);
  }

  _renderFilms(filmListElement, films) {
    this._renderPartsFilms(filmListElement, films);

    if (films.length > DISPLAY_FILMS_COUNT) {
      this._renderShowMoreButton(films);
    }
  }

  _renderPartsFilms(filmListElement, films) {
    const from = this._renderedFilms;
    const to = from + DISPLAY_FILMS_COUNT;

    if (films.length) {
      films.slice(from, to).forEach((film) => {
        const filmController = new FilmController(filmListElement, this._onDataChange, this._onViewChange, this._api);

        filmController.render(film);

        this._showedFilmControllers = this._showedFilmControllers.concat(filmController);
      });

      this._renderedFilms = Math.min(to, films.length);
    }
  }

  _renderShowMoreButton(films) {
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, renderPosition.APPEND);

    const showMoreButtonClick = () => {
      this._renderPartsFilms(this._filmsListContainerComponent, films);

      if (this._renderedFilms >= films.length) {
        this._showMoreButtonComponent.removeClickHandler(showMoreButtonClick);
        remove(this._showMoreButtonComponent);
      }
    };

    this._showMoreButtonComponent.setClickHandler(showMoreButtonClick);
  }

  _renderSort() {
    render(this._main, this._sortComponent, renderPosition.BEFORE);
  }

  _renderFilmsContainer() {
    render(this._main, this._container, renderPosition.APPEND);
  }

  _renderFilmsList() {
    render(this._container.getElement(), this._filmsListComponent, renderPosition.APPEND);
  }

  _getSortedFilms(films, sortType) {
    let sortedFilms = [];

    if (films.length) {
      const showingFilms = films.slice();

      switch (sortType) {
        case SortType.DATE:
          sortedFilms = showingFilms.sort((a, b) => moment(b.releaseDate).format(`x`) - moment(a.releaseDate).format(`x`));
          break;
        case SortType.RATING:
          sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = showingFilms;
          break;
      }
    }

    return sortedFilms.slice();
  }

  _onSortTypeChange(sortType) {
    const sortedFilms = this._getSortedFilms(this._filmsModel.getFilmsByFilter(), sortType);
    this._removeFilms();

    this._renderFilms(this._filmsListContainerComponent, sortedFilms);
  }

  _onDataChange(filmController, oldFilm, newFilm) {
    this._api.updateFilm(oldFilm.id, newFilm)
      .then((newFilmCard) => {
        this._filmsModel.updateFilm(oldFilm.id, newFilmCard);
        this._films = this._filmsModel.getFilms();

        filmController.render(this._films[newFilmCard.id]);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((filmController) => filmController.setDefaultView());
  }

  _removeFilms() {
    this._filmsListContainerComponent.innerHTML = ``;
    this._renderedFilms = 0;
    remove(this._showMoreButtonComponent);
  }

  _onFilterChange() {
    this._removeFilms();
    this._sortComponent.clearSortMenu();
    this._films = this._filmsModel.getFilmsByFilter();
    this._renderFilms(this._filmsListContainerComponent, this._films);
  }

  show() {
    this._container.show();
    this._sortComponent.show();
  }

  hide() {
    const sortedFilms = this._getSortedFilms(this._films, SortType.DEFAULT);

    this._container.hide();
    this._removeFilms();
    this._renderFilms(this._filmsListContainerComponent, sortedFilms);
    this._sortComponent.clearSortMenu();
    this._sortComponent.hide();
  }
}
