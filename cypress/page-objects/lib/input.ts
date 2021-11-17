import { UIElement } from "./ui-elements";

export class Input extends UIElement {
  type(value: string): void {
    this.getElement().type(value);
  }

  clear(): void {
    this.getElement().clear();
  }

  clearAndType(value: string): void {
    this.getElement().clear().type(value);
  }
}