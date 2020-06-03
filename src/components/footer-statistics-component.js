import AbstractSmartComponent from "./abstract-smart-component";

const createFooterStatisticsTemplate = (films) => {
  const filmsCount = films.length;

  return `<p>${filmsCount ? `${filmsCount} movies inside` : `0 movies inside`}</p>`;
};

export default class FooterStatisticsComponent extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._films.getFilms());
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {

  }
}
