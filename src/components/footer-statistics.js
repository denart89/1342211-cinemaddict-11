import {createElement} from "../utils";

const createFooterStatisticsTemplate = () => {
  return `<p>130 291 movies inside</p>`;
};

class FooterStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate();
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

export {FooterStatistics};
