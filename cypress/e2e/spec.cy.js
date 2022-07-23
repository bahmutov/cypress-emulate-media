it('uses the default color scheme', () => {
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
    .then(($el) => window.getComputedStyle($el[0]).backgroundColor)
    .then(cy.log)
    .should('equal', 'rgb(255, 255, 255)') // white!
})

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
    .then(($el) => window.getComputedStyle($el[0]).backgroundColor)
    .then(cy.log)
    .should('equal', 'rgb(0, 0, 0)') // white!
})
