import AbstractComponent from "./abstract-component";

const createFilmsListTemplate = () => {
  return `<section class="films-list">
      <div class="films-list__container">

      </div>
    </section>`;
};

export default class FilmsListComponent extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
