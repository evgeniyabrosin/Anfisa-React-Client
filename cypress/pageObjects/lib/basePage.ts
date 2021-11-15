export class BasePage {
  visit(url?: string | null, username?: string | null, password?: string | null): Cypress.Chainable<Cypress.AUTWindow> {
    const defaultUrl = url ?? Cypress.env("host");

    return cy.visit(defaultUrl, {
      auth: {
        username: username ?? Cypress.env("username"),
        password: password ?? Cypress.env("password"),
      },
      failOnStatusCode: false
    }
    );
  }

  castomCredsVisit(url: string, usrname: string, pswrd: string): Cypress.Chainable<Cypress.AUTWindow> {
    const defaultUrl = url ?? "";
    const login = usrname;
    const pass = pswrd

    return cy.visit(defaultUrl, {auth: {
      username: login,
      password: pass
    },
    })
  }
}
