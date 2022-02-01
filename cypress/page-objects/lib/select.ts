import { UIElement } from './ui-element'

export class Select extends UIElement {
  select(value: string): void {
    this.getElement().select(value)
  }
}
