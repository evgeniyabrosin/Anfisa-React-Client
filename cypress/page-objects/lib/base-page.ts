let defaultUrl = Cypress.env('baseUrl');
export class BasePage {
  visit(
    baseUrl?: string | null,
    username?: string | null,
    password?: string | null,
  ): Cypress.Chainable<Cypress.AUTWindow> {
    if (baseUrl) {
      defaultUrl = Cypress.env('baseUrl') + baseUrl
    } else {
      defaultUrl = Cypress.env('baseUrl')
    }


    return cy.visit(defaultUrl, {
      auth: {
        username: username ?? Cypress.env('basic_username'),
        password: password ?? Cypress.env('basic_password'),
      },
      failOnStatusCode: false,
    })
  }
}
