Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Claudia')
    cy.get('#lastName').type('Biasoli')
    cy.get('#email').type('claubiasoli@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})