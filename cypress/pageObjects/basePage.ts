export class BasePage {
  visit(url?: string): Cypress.Chainable<Cypress.AUTWindow> {
    const defaultUrl = url ?? "";

    return cy.visit(defaultUrl, {
      auth: {
        username: "forome",
        password: "forome1!",
      },
    });
  }
}
