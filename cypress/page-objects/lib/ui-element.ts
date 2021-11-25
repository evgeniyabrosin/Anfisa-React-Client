export class UIElement {
  protected _selector: string
  readonly isTextSelector: boolean

  constructor(selector: string, isTextSelector = false) {
    this._selector = selector
    this.isTextSelector = isTextSelector
  }

  protected getElement() {
    return this.isTextSelector
      ? cy.contains(this._selector)
      : cy.get(this._selector)
  }

  contains(text: string) {
    return this.getElement().contains(text)
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

  getFilter(text: string) {
    return cy.get('.Dropdown-option').contains(text).click()
  }

  first() {
    return this.getElement().first()
  }

  eq(num: number) {
    return this.getElement().eq(num)
  }
}
