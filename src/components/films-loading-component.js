import AbstractComponent from "./abstract-component";

const createFilmsLoadingTemplate = () => {
  return `<h2 class="films-list__title">Loading ...</h2>`;
};

export default class FilmsLoadingComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsLoadingTemplate();
  }
}
