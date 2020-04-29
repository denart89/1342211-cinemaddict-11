import {createElement} from "../utils";

const createFilmsContainerTemplate = () => {
  return `<section class="films">
    <section class="films-list">
      <div class="films-list__container">

      </div>
    </section>
  </section>`;
};

class FilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {FilmsList};
