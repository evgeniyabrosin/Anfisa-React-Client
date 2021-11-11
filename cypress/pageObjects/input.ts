import { UIElement } from "./ui_elements";

export class Input extends UIElement {
  type(value: string): void {
    this.getElement().type(value);
  }

  clear(): void {
    this.getElement().clear();
  }
}
