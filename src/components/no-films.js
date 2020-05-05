import {AbstractComponent} from "./abstract-component";

const createNoFilmsTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

class NoFilmsComponent extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}

export {NoFilmsComponent};
