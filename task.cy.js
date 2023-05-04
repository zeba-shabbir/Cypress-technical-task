///<reference types="cypress"/> 

import ImportantFunctions  from "../PageObjects/importantFunctions"

// I have used puppeteer extra and puppeteer-extra-plugin-recaptcha to bypass captcha.Those modules need to be installed 
// first to run code

describe("Applying for QA position", function(){

    const object =new ImportantFunctions();


it.only('searching for QA job and applying',function(){
    cy.visit("https://www.userlane.com/about/careers/")
    cy.url().should('be.eq','https://www.userlane.com/about/careers/')
    cy.title().should('include','Career and Job')
    cy.intercept({
        method: 'POST',
        url: 'https://graphql.usercentrics.eu/graphql',
      }).as('pageLoads')

      cy.wait('@pageLoads')

   

// function that loads all jobs
 object.loadMore()   

    
// click on view job that is found first
 cy.get('.row.gutters-12').find('div').contains('Test').parent().next().find('a').click({force:true})
 cy.title().should('include','Test')
 cy.url().should('include','https://jobs.lever.co/userlane/')


 cy.get('.postings-btn.template-btn-submit.hex-color').should('have.length', 2)
cy.get('div.posting-headline>h2').invoke('text').should('include','Test')


// click on apply job
 cy.origin('https://jobs.lever.co', () => {
    cy.get('div.postings-btn-wrapper>a').click()  
    
    cy.intercept({
        method: 'POST',
        url: 'https://graphql.usercentrics.eu/graphql',
      }).as('pageLoads')

      cy.wait('@pageLoads')


     // fill the form now and verify form validations 
    
    cy.get('div.application-label').contains('Resume/CV').find('span').should('have.class','required').should('contain','✱')
    cy.get('input[type=file]').invoke('attr', 'type').should('eq', 'file')
    cy.get('input[type=file]').selectFile({
        contents: Cypress.Buffer.from('file contents'),
        fileName: "C:/Users/zebashabbir/Documents/logfile.txt"
      })

      cy.get('[name=name]').parent().parent().find('span') .should('have.class','required').should('contain','✱')
     cy.get('[name=name]').clear().type('test1')
   
     cy.get('[name=email]').parent().parent().find('span') .should('have.class','required').should('contain','✱')
     cy.get('[name=email]').invoke('attr', 'type').should('eq', 'email')

     cy.get('[name=email]').clear().type('test1@otlook.com')
    
     cy.get('[name=phone]').parent().parent().find('span') .should('have.class','required').should('contain','✱')
     cy.get('[name=phone]').clear().type('test1')
     
     cy.get('[name=org]').clear().type('test1')
    
     cy.get('[name="cards[16cd39ca-6520-4ed6-a74c-04f777c0732a][field0]"]').parent().parent().find('span') .should('have.class','required').should('contain','✱')
     cy.get('[name="cards[16cd39ca-6520-4ed6-a74c-04f777c0732a][field0]"]').clear().type('test1')
    
   cy.get('input[type=checkbox]').check()
  
 cy.get('#btn-submit').click(true)

  object.bypasscaptch()
 cy.wait(5000)
 object.verifyResponse()

  })

   

 })


  })



