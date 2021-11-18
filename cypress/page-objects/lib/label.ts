import { UIElement } from './ui-element'

export class Label extends UIElement {
  readonly labelText: string

  constructor(selector: string, labelText: string, isTextSelector = false) {
    super(selector, isTextSelector)
    this.labelText = labelText
  }

  checkLabelText(text?: string) {
    const defaultText = this.labelText !== '' ? this.labelText : text

    return this.getElement().should('have.text', defaultText)
  }
}
