import {NoFilmsComponent} from "../components/no-films-component";
import {ShowMoreButtonComponent} from "../components/show-more-button-component";
import {FilmsListComponent} from "../components/film-list-component";
import {SortComponent, SortType} from "../components/sort-component";
import {remove, render, renderPosition} from "../utils/render";
import FilmController from "./film-controller";

class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showingFilmsCountOnStart = 5;
    this._showingFilmsCountByButton = 5;

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

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getFilms();
    this._renderSort();

    this._renderFilmsContainer();
    this._renderFilmsList();

    if (this._films.length === 0) {
      render(this._filmsListContainerComponent, this._noFilmsComponent, renderPosition.APPEND);
    } else {
      this._renderFilms(this._filmsListContainerComponent, this._films);
    }
  }

  _renderFilms(filmListElement, films) {
    const from = this._renderedFilms;
    const to = from + this._showingFilmsCountOnStart;

    if (this._renderedFilms < films.length) {
      films.slice(from, to).forEach((film) => {
        const filmController = new FilmController(filmListElement, this._onDataChange, this._onViewChange);

        filmController.render(film);

        this._showedFilmControllers = this._showedFilmControllers.concat(filmController);
      });
      this._renderedFilms = Math.min(to, films.length);

      if (films.length > this._renderedFilms) {
        this._renderShowMoreButton(films);
      }
    }
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

  _getSortedFilms(films, sortType) {
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

    return sortedFilms.slice();
  }

  _onSortTypeChange(sortType) {
    const sortedFilms = this._getSortedFilms(this._filmsModel.getFilmsByFilter(), sortType);
    this._removeFilms();

    this._renderFilms(this._filmsListContainerComponent, sortedFilms);
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

  _renderShowMoreButton(films) {
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, renderPosition.APPEND);

    const showMoreButtonClick = () => {
      this._renderFilms(this._filmsListContainerComponent, films);

      if (this._renderedFilms >= this._films.length) {
        this._showMoreButtonComponent.removeClickHandler(showMoreButtonClick);
        remove(this._showMoreButtonComponent);
      }
    };

    this._showMoreButtonComponent.setClickHandler(showMoreButtonClick);
  }
}

export {PageController};
