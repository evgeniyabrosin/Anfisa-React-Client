import { UIElement } from './ui-element'

export class Checkbox extends UIElement {
  check() {
    return this.getElement().check({ force: true })
  }
}
