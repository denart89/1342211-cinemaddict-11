import {AbstractComponent} from "./abstract-component.js";
import {replace} from "../utils/render";

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(oldElement.parentNode, newElement, oldElement);
    this.recoveryListeners();
  }
}

export {AbstractSmartComponent};
