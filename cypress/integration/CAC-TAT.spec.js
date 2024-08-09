/// <reference types="Cypress" />
//Describe é a suite
//it é o caso de teste
describe('Central de Atendimento ao Cliente TAT', function() {
    //a funcção beforeEach significa que antes de qq coisa q ele vai fazer, 
    //ele tem q fazer oq tá escrito nessa function, q no caso é visitar a página ou arquivo do cy.visit no caso
    beforeEach(function(){
        //cy.visit vai até o arquivo ou URL que vc vai testar
        cy.visit('./src/index.html')
    })
    //Exercício 1
    it('verifica o título da aplicação', function() {
        //cy.title é o comando que vai ler o nome do título da página 
        // O título que aparece na barra de nagegação que vc vai testar
        //nesse caso, should é comando de verificação - o nome deve ser igual a xxxx
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    //Exercício 2 - usando o .only significa q vai executar apenas este teste
    //Cenário Principal de cadastro
    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Claudia')
        cy.get('#lastName').type('Biasoli')
        cy.get('#email').type('claubiasoli@gmail.com')
        cy.get('#open-text-area').type('teste exercicio 2')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    //Exercício Extra 2
    //Cenário Negativo - Email incorreto
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Claudia')
        cy.get('#lastName').type('Biasoli')
        cy.get('#email').type('claubiasoligmail.com')
        cy.get('#open-text-area').type('teste exercicio 2')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    //Exercício Extra 3
    //Cenário Negativo - Campo de telefone não aceita letras e caracteres - continua vazio
    it('campo telefone continua vazio se preenchido valores não-numéricos', function(){
        cy.get('#phone') //Pega o campo ID telefone
            .type('abcd@#$') //Tenta inserir letras e caracteres
            .should('have.value', '') //Valida que campo não aceita e continua vazio
    })
    //Exercício Extra 4
    //Cenário - Valida que o sistema exibe mensagem de erro com campo de telefone obrigatório não-preenchido
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Claudia')
        cy.get('#lastName').type('Biasoli')
        cy.get('#email').type('claubiasoli@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste exercicio extra 4')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    //Exercício Extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Claudia')
            .should('have.value', 'Claudia')
            .clear()
            .should('have.value', '')
        cy.get('#lastName').type('Biasoli')
            .should('have.value', 'Biasoli')
            .clear()
            .should('have.value', '')
        cy.get('#email').type('claubiasoli@gmail.com')
            .should('have.value', 'claubiasoli@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone').type('999118878')
            .should('have.value', '999118878')
            .clear()
            .should('have.value', '')
        })
    //Exercício Extra 6
    //Cenário Negativo - Envia form sem preencher campos
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    //Exercicio Extra 7
    //Cenário positivo - Envia formulário com sucesso Usando comandos customizados
    it('Envia formulario com sucesso usando comandos customizados', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    // Exercicio Extra 8
    // Usando o cy.contains() - Identificação de elementos após o click
    // Alterado nos exercícios anteriores


    //Aula 3 - Selecionando opções de campos de seleção suspensa
    // Exercício
    it('Seleciona um produto (youtube) por seu texto', function() {
        //pega o elemento
        cy.get('#product')
            //Seleciona o valor
            .select('YouTube')
            //Valida que o campo correto foi selecionado
            .should('have.value', 'youtube')
    })

    //Exercicio Extra 1 - Aula 3
    it('Seleciona um produto (Mentoria) por seu valor', function(){
        //pega o elemento
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    //Exericio Extra 2 - Aula 3
    it('Seleciona um produto (Blog) pelo seu índice', function(){
        //pega o elemento
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    //Aula 4 - Marcando Inputs do tipo RADIO
    //Exercicio
    it('Marca o tipo de atendimento "Feedback"', function (){
        //Pega o elemento pelo valor e marca
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            //Valida que foi marcado corretamente
            .should('have.value', 'feedback')
    })
    //Exercicio Extra - Aula 4
    it.only('Marca cada tipo de Atendimento', function (){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
        })
    })
  })
  