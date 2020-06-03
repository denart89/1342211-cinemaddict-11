import AbstractSmartComponent from "./abstract-smart-component";

const createMenuTemplate = (isActive) => {
  return `<nav id="main-nav" class="main-navigation">
    <a href="#stats" class="main-navigation__additional${isActive ? ` main-navigation__item--active` : ``}">Stats</a>
  </nav>`;
};

export default class MenuComponent extends AbstractSmartComponent {
  constructor() {
    super();

    this._isActive = false;
    this.menuChangeHandler = null;
  }

  getTemplate() {
    return createMenuTemplate(this._isActive);
  }

  setStatisticClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const hash = evt.target.hash;

      handler(hash);
    });

    this.menuChangeHandler = handler;
  }

  setActiveClass() {
    this.getElement().querySelector(`.main-navigation__additional`).classList.add(`main-navigation__item--active`);
  }

  setRemoveActiveClass() {
    this.getElement().querySelector(`.main-navigation__additional`).classList.remove(`main-navigation__item--active`);
  }

  getStatisticActiveClass() {
    if (this.getElement().querySelector(`.main-navigation__additional`).classList.contains(`main-navigation__item--active`)) {
      return true;
    }

    return false;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setStatisticClickHandler(this.menuChangeHandler);
  }
}
