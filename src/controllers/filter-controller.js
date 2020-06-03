import FilterComponent from "../components/filter-component.js";
import {FilterType} from "../constants.js";
import {render, renderPosition} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {remove} from "../utils/render";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._filmsModel.setFilmsChangeHandlers(this._onDataChange);
  }

  render() {
    const filterData = this._getFilterData();

    this._filterComponent = new FilterComponent(filterData);

    render(this._container, this._filterComponent, renderPosition.PREPEND);

    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
  }

  _getFilterData() {
    const allFilms = this._filmsModel.getFilms();
    const filters = Object.values(FilterType).map((filterType) => {
      const countFilms = allFilms.length ? getFilmsByFilter(allFilms, filterType).length : 0;

      return {
        name: filterType,
        count: countFilms,
        isActive: filterType === this._activeFilterType,
      };
    });

    return filters;
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._filmsModel.setFilter(filterType);
  }

  _onDataChange() {
    const filterData = this._getFilterData();
    this._filterComponent.rerender(filterData);
  }

  _rerender() {
    this._onFilterChange(``);
    remove(this._filterComponent);
    this.render();
  }
}
