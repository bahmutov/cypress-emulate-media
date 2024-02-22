import { getComputedProperty } from './utils'
import 'cypress-cdp'

describe('Pointer', { viewportHeight: 200, viewportWidth: 200 }, () => {
  it('is fine', () => {
    cy.CDP('Emulation.setTouchEmulationEnabled', {
      enabled: false,
    })
    cy.visit('public/pointer.html')
    cy.get(':checkbox')
      .then(getComputedProperty('border-color'))
      .should('be.a', 'string')
      .and('equal', 'rgb(0, 0, 255)')
  })

  it('is coarse', () => {
    cy.CDP('Emulation.setTouchEmulationEnabled', {
      enabled: true,
      maxTouchPoints: 1,
    })
    cy.visit('public/pointer.html')
    cy.get(':checkbox')
      .then(getComputedProperty('border-color'))
      .should('be.a', 'string')
      .and('equal', 'rgb(255, 0, 0)')
  })
})
