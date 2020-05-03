import {AbstractComponent} from "./abstract-component";

const createFilmsContainerTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <div class="films-list__container">

      </div>
    </section>
  </section>`;
};

class FilmsList extends AbstractComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}

export {FilmsList};
