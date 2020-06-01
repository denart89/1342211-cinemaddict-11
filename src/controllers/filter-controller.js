import FilterComponent from "../components/filter-component.js";
import {FILTER_TYPES} from "../constants.js";
import {render, renderPosition} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._activeFilterType = FILTER_TYPES.ALL;
    this._filterComponent = null;
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this._filmsModel.setFilmsChangeHandlers(this.onDataChange);
  }

  render() {
    const filterData = this._getFilterData();

    this._filterComponent = new FilterComponent(filterData);

    render(this._container, this._filterComponent, renderPosition.PREPEND);

    this._filterComponent.setFilterChangeHandler(this.onFilterChange);
  }

  _getFilterData() {
    const allFilms = this._filmsModel.getFilms();
    const filters = Object.values(FILTER_TYPES).map((filterType) => {
      return {
        id: filterType.id,
        name: filterType.name,
        count: getFilmsByFilter(allFilms, filterType.id).length,
        isActive: filterType.id === this._activeFilterType.id,
      };
    });

    return filters;
  }

  onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  onDataChange() {
    const filterData = this._getFilterData();
    this._filterComponent.rerender(filterData);
  }
}
