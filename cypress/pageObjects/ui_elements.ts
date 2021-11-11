export class UIElement {
  protected _selector: string;
  readonly isTextSelector: boolean;

  constructor(selector: string, isTextSelector = false) {
    this._selector = selector;
    this.isTextSelector = isTextSelector;
  }

  get() {
    return cy.get(this._selector);
  }

  contains() {
    return cy.contains(this._selector);
  }

  protected getElement(options?: { timeout: number }) {
    if (this.isTextSelector) {
      return cy.contains(this._selector, { timeout: options?.timeout });
    } else {
      return cy.get(this._selector, { timeout: options?.timeout });
    }
  }

  click() {
    this.getElement().click();
  }

  checkExists(options?: { timeout: number }) {
    return this.getElement(options).should("be.visible");
  }

  scrollIntoView(options?: { timeout: number }) {
    return this.getElement(options).contains(this._selector).scrollIntoView();
  }
}
