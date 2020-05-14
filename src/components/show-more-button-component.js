import {AbstractComponent} from "./abstract-component";

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

class ShowMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export {ShowMoreButtonComponent};
