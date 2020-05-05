import {AbstractComponent} from "./abstract-component";

const createFooterStatisticsTemplate = () => {
  return `<p>130 291 movies inside</p>`;
};

class FooterStatisticsComponent extends AbstractComponent {
  getTemplate() {
    return createFooterStatisticsTemplate();
  }
}

export {FooterStatisticsComponent};
