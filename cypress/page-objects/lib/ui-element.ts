import { Timeouts } from '../../shared/timeouts'

export class UIElement {
  protected _selector: string
  readonly isTextSelector: boolean

  constructor(selector: string, isTextSelector = false) {
    this._selector = selector
    this.isTextSelector = isTextSelector
  }
  public get element() {
    return cy.get(this._selector)
  }

  getElement() {
    return this.isTextSelector
      ? cy.contains(this._selector)
      : cy.get(this._selector, { timeout: Timeouts.FifteenSecondsTimeout })
  }

  contains(text: string) {
    return this.getElement().contains(text)
  }

  click() {
    this.getElement().click()
  }

  forceClick() {
    this.getElement().click({ force: true })
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

  first() {
    return this.getElement().first()
  }

  eq(num: number) {
    return this.getElement().eq(num)
  }
  beVisible() {
    return this.getElement().should('be.visible')
  }
  countElements(n: number) {
    return this.getElement().should('have.length', n)
  }
  getChildren(selector?: string) {
    return this.getElement().children(selector!)
  }
  scrollButtonIntoView(text: string) {
    cy.contains(text).scrollIntoView().click()
  }
}
