let defaultUrl = Cypress.env('baseUrl')

export class BasePage {
  visit(
    customUrl?: string | null,
    username?: string | null,
    password?: string | null,
  ): Cypress.Chainable<Cypress.AUTWindow> {
    defaultUrl = customUrl
      ? Cypress.env('baseUrl') + customUrl
      : Cypress.env('baseUrl')

    return cy.visit(defaultUrl, {
      auth: {
        username: username ?? Cypress.env('basic_username'),
        password: password ?? Cypress.env('basic_password'),
      },
      failOnStatusCode: false,
    })
  }
}
