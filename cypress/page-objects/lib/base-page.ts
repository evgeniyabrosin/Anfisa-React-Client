let defaultUrl = Cypress.env('baseUrl')

export class BasePage {
  visit(
    baseUrl?: string | null,
    username?: string | null,
    password?: string | null,
  ): Cypress.Chainable<Cypress.AUTWindow> {
    defaultUrl = baseUrl
      ? Cypress.env('baseUrl') + baseUrl
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
