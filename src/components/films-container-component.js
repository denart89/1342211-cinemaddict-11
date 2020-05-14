import {AbstractComponent} from "./abstract-component";

const createFilmsContainerTemplate = () => {
  return `<section class="films"></section>`;
};

class FilmsContainerComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}

export {FilmsContainerComponent};
