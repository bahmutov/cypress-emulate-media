import { getComputedProperty } from './utils'
// https://github.com/bahmutov/cypress-cdp
import 'cypress-cdp'
// https://github.com/bahmutov/cy-grep
import registerCypressGrep from '@bahmutov/cy-grep/src/support'
registerCypressGrep()

// typically this hook could be placed in the e2e/support.js file
// and apply to _all_ tests across all specs
beforeEach(() => {
  // get the tags from the current test config using
  // the Cypress implementation details
  const tags = cy.state('test')?._testConfig?.unverifiedTestConfig?.tags
  // tags could be a single string or an array of strings
  if (tags?.includes('@touch')) {
    cy.CDP('Emulation.setTouchEmulationEnabled', {
      enabled: true,
      maxTouchPoints: 1,
    })
  } else {
    cy.CDP('Emulation.setTouchEmulationEnabled', {
      enabled: false,
    })
  }
})

describe('Pointer', { viewportHeight: 200, viewportWidth: 200 }, () => {
  it('is fine', () => {
    cy.visit('public/pointer.html')
    cy.get(':checkbox')
      .then(getComputedProperty('border-color'))
      .should('be.a', 'string')
      .and('equal', 'rgb(0, 0, 255)')
  })

  it('is coarse', { tags: '@touch' }, () => {
    cy.visit('public/pointer.html')
    cy.get(':checkbox')
      .then(getComputedProperty('border-color'))
      .should('be.a', 'string')
      .and('equal', 'rgb(255, 0, 0)')
  })
})
