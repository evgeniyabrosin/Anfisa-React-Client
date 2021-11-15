export class UIElement {
  protected _selector: string;
  readonly isTextSelector: boolean;

  constructor(selector: string, isTextSelector = false) {
    this._selector = selector;
    this.isTextSelector = isTextSelector;
  }

  contains() {
    return cy.contains(this._selector);
  }

  protected getElement(options?: string) {
    if (this.isTextSelector) {
      return cy.contains(this._selector);
    } else {
      return cy.get(this._selector);
    }
  }

  click() {
    this.getElement().click();
  }

  checkExists(options?: string) {
    return this.getElement(options).should("be.visible");
  }

  scrollIntoView(options?: string) {
    return this.getElement(options).contains(this._selector).scrollIntoView();
  }

  haveText(value: string) {
    this.getElement().should('have.text', value)
  }
}
