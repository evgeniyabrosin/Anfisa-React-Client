import { UIElement } from './ui-element'

export class Input extends UIElement {
  type(value: string, delay?: number): void {
    this.getElement().type(value, { delay })
  }

  clear(): void {
    this.getElement().clear()
  }

  clearAndType(value: string): void {
    this.getElement().clear().type(value)
  }
}
