import {AbstractComponent} from "./abstract-component";

const createFilmsContainerTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <div class="films-list__container">

      </div>
    </section>
  </section>`;
};

class FilmsListComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}

export {FilmsListComponent};
