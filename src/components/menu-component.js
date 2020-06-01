import AbstractComponent from "./abstract-component";

const createFilterTemplate = () => {
  return `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MenuComponent extends AbstractComponent {
  getTemplate() {
    return createFilterTemplate();
  }

  setStatisticClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const hash = evt.target.hash;

      handler(hash);
    });
  }
}
