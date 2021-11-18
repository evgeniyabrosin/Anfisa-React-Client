export class UIElement {
  protected _selector: string
  readonly isTextSelector: boolean

  constructor(selector: string, isTextSelector = false) {
    this._selector = selector
    this.isTextSelector = isTextSelector
  }

  contains() {
    return cy.contains(this._selector)
  }

  protected getElement() {
    return this.isTextSelector
      ? cy.contains(this._selector)
      : cy.get(this._selector)
  }

  click() {
    this.getElement().click()
  }

  checkExists() {
    return this.getElement().should('be.visible')
  }

  scrollIntoView() {
    return this.getElement().contains(this._selector).scrollIntoView()
  }

  haveText(value: string) {
    this.getElement().should('have.text', value)
  }
}
