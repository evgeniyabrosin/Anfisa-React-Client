let defaultUrl = Cypress.env('basic_url')

export class BasePage {
  visit(
    customUrl?: string | null,
    username?: string | null,
    password?: string | null,
  ): Cypress.Chainable<Cypress.AUTWindow> {
    defaultUrl = customUrl
      ? Cypress.env('basic_url') + customUrl
      : Cypress.env('basic_url')

    return cy.visit(defaultUrl, {
      auth: {
        username: username ?? Cypress.env('basic_username'),
        password: password ?? Cypress.env('basic_password'),
      },
      failOnStatusCode: false,
    })
  }
}
