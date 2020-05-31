import {FilterComponent} from "../components/filter-component.js";
import {FilterType} from "../const.js";
import {render, renderPosition} from "../utils/render.js";
import {getFilmsByFilter} from "../utils/filter.js";

class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const filterData = this._getFilterData();

    this._filterComponent = new FilterComponent(filterData);

    render(container, this._filterComponent, renderPosition.PREPEND);

    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
  }

  _getFilterData() {
    const allFilmsByFilter = this._filmsModel.getFilmsByFilter();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        id: filterType.id,
        name: filterType.name,
        count: getFilmsByFilter(allFilmsByFilter, filterType.id).length,
        isActive: filterType.id === this._activeFilterType.id,
      };
    });

    return filters;
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    const filterData = this._getFilterData();
    this._filterComponent.rerender(filterData);
  }
}

export {FilterController};
