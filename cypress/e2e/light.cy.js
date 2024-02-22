import { getComputedProperty } from './utils'

it('uses the light color scheme', () => {
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: {
        media: 'page',
        features: [
          {
            name: 'prefers-color-scheme',
            value: 'light',
          },
        ],
      },
    }),
  )

  cy.visit('public/index.html')
  cy.get('.text')
    .then(getComputedProperty('background-color'))
    .should('be.a', 'string')
    .and('equal', 'rgb(255, 255, 255)') // white!
  cy.get('.text')
    .then(getComputedProperty('color'))
    .should('be.a', 'string')
    .and('equal', 'rgb(85, 85, 85)') // #333!
})
