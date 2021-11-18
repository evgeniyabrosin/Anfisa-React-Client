export class BasePage {
  visit(
    baseUrl?: string | null,
    username?: string | null,
    password?: string | null,
  ): Cypress.Chainable<Cypress.AUTWindow> {
    const defaultUrl = baseUrl ?? Cypress.env('baseUrl')

    return cy.visit(defaultUrl, {
      auth: {
        username: username ?? Cypress.env('basic_username'),
        password: password ?? Cypress.env('basic_password'),
      },
      failOnStatusCode: false,
    })
  }
}
