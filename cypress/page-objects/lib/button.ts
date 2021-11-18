import { UIElement } from './ui-element'

export class Button extends UIElement {
  /**
   * Get current element and check inner text.
   */
  checkButtonText(text: string) {
    return this.getElement().should('have.text', text)
  }
  getButtonByText(text: string) {
    return this.getElement().contains(text)
  }
}
