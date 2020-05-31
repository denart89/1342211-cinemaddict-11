import {AbstractComponent} from "./abstract-component";

const createFilterTemplate = () => {
  return `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

class MenuComponent extends AbstractComponent {
  getTemplate() {
    return createFilterTemplate();
  }
}

export {MenuComponent};
