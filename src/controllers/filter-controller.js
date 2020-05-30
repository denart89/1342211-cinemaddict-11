import {FilterComponent} from "../components/filter-component.js";
import {FilterType} from "../const.js";
import {render, replace, renderPosition} from "../utils/render.js";
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
    const allFilmsByFilter = this._filmsModel.getFilmsByFilter();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        id: filterType.id,
        name: filterType.name,
        count: getFilmsByFilter(allFilmsByFilter, filterType.id).length,
        isActive: filterType.id === this._activeFilterType.id,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, renderPosition.PREPEND);
    }
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}

export {FilterController};
