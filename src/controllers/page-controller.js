import {NoFilmsComponent} from "../components/no-films-component";
import {ShowMoreButtonComponent} from "../components/show-more-button-component";
import {FilmsListComponent} from "../components/film-list-component";
import {SortComponent, SortType} from "../components/sort-component";
import {remove, render, renderPosition} from "../utils/render";
import FilmController from "./film-controller";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showingFilmsCountOnStart = SHOWING_FILMS_COUNT_ON_START;
    this._showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;

    this._films = [];
    this._showedFilmControllers = [];
    this._renderedFilms = 0;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._filmsListContainerComponent = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    this._main = document.querySelector(`.main`);
    this._navigation = document.querySelector(`.main-navigation`);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();
    this._renderSort();

    this._renderFilmsContainer();
    this._renderFilmsList();

    if (films.length === 0) {
      render(this._filmsListContainerComponent, this._noFilmsComponent, renderPosition.APPEND);
    } else {
      this._renderFilms(this._filmsListContainerComponent, films.slice(0, this._showingFilmsCountOnStart), this._onDataChange, this._onViewChange);

      this._renderShowMoreButton();
    }
  }

  _renderFilms(filmListElement, films, onDataChange, onViewChange) {
    films.map((film) => {
      const filmController = new FilmController(filmListElement, onDataChange, onViewChange);

      filmController.render(film);

      this._showedFilmControllers = this._showedFilmControllers.concat(filmController);

      return filmController;
    });
  }

  _renderSort() {
    render(this._navigation, this._sortComponent, renderPosition.AFTER);
  }

  _renderFilmsContainer() {
    render(this._main, this._container, renderPosition.APPEND);
  }

  _renderFilmsList() {
    render(this._container.getElement(), this._filmsListComponent, renderPosition.APPEND);
  }

  _getSortedFilms(films, sortType, from, to) {
    let sortedFilms = [];
    const showingFilms = films.slice();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = showingFilms.sort((a, b) => b.releaseDate.year - a.releaseDate.year);
        break;
      case SortType.RATING:
        sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = showingFilms;
        break;
    }

    return sortedFilms.slice(from, to);
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCountOnStart >= this._filmsModel.getFilmsByFilter().length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, renderPosition.APPEND);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onSortTypeChange(sortType) {
    const sortedFilms = this._getSortedFilms(this._filmsModel.getFilmsByFilter(), sortType, 0, this._showingFilmsCountOnStart);

    this._removeFilms();

    this._renderFilms(this._filmsListContainerComponent, sortedFilms, this._onDataChange, this._onViewChange);

    this._renderShowMoreButton();
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      filmController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it._setDefaultView());
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsListContainerComponent, this._filmsModel.getFilmsByFilter().slice(0, count), this._onDataChange, this._onViewChange);
    this._renderShowMoreButton();
  }

  _onFilterChange() {
    this._updateFilms(this._showingFilmsCountOnStart);
  }

  _onShowMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCountOnStart;
    const films = this._filmsModel.getFilms();
    this._showingFilmsCountOnStart = this._showingFilmsCountOnStart + this._showingFilmsCountByButton;

    const sortedFilms = this._getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCountOnStart);

    this._renderFilms(this._filmsListContainerComponent, sortedFilms, this._onDataChange, this._onViewChange);

    if (this._showingFilmsCountOnStart >= films.length) {
      remove(this._showMoreButtonComponent);
      this._showMoreButtonComponent.removeElement();
    }
  }
}

export {PageController};
