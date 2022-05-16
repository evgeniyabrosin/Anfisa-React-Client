import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      waitJob(options: {
        jobAlias: string
        interval?: number
        timeout?: number
      }): Chainable<void>
    }
  }
}

/* global Cypress */
const resizeObserverLoopErrRe = /^[^ ()ORb-eilmopr-tvxz]/

Cypress.on('uncaught:exception', err => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false
  }
})
