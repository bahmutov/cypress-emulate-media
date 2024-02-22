import { getComputedProperty } from './utils'

it('prefers the dark color scheme', () => {
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: {
        media: 'page',
        features: [
          {
            name: 'prefers-color-scheme',
            value: 'dark',
          },
        ],
      },
    }),
  )

  cy.visit('public/index.html')
  cy.get('.text')
    .then(getComputedProperty('background-color'))
    .should('be.a', 'string')
    .and('equal', 'rgb(0, 0, 0)') // black color!
})
