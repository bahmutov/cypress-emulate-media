import { getComputedProperty } from './utils'

it('uses the light color scheme then the dark', () => {
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
    .then(cy.log)
    .should('equal', 'rgb(255, 255, 255)') // white!
  cy.get('.text')
    .then(getComputedProperty('color'))
    .then(cy.log)
    .should('equal', 'rgb(85, 85, 85)') // #333!
    .wait(1000) // for demo
    .then(() =>
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
  cy.get('.text')
    .then(getComputedProperty('background-color'))
    .then(cy.log)
    .should('equal', 'rgb(0, 0, 0)') // black color!
})
