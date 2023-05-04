/// <reference types="Cypress"/>


class ImportantFunctions{
    
    
    loadMore = () => {
        cy.get(".more-link.d-inline-flex.align-items-center").then(($el) =>{
            if (Cypress.dom.isVisible($el))
            {
              cy.get('.more-link.d-inline-flex.align-items-center').should('exist')
                 cy.wrap($el).click({force:true})
                this.loadMore()
            }
            else
            {
                cy.get('.more-link.d-inline-flex.align-items-center').should('be.not.visible').should('have.attr','style','opacity: 0; visibility: hidden;')
             return 0 // or return something
            }
        } )
    
         }
    

    verifyResponse(){
        cy.wait(10000)
        cy.url().then(($url) => {
    
              cy.intercept({
                method: 'GET',
                url: `{url}`,
              }).as('formSubmit')
    
              cy.wait('@formSubmit').should('have.property', 'response.statusCode', "200 OK")
    
       });  
    }
  
    
bypasscaptch(){

// captcha can be bypassed by using various wait commands or by using cypress plugin slow-cypress-down.
// Below I have used puppeteer-extra-plugin-recaptcha and have provided my api key to hack it.

const puppeteer = require('puppeteer-extra')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')

puppeteer.use(RecaptchaPlugin({
      provider: { id: '2captcha', token: 'e2b20c7dha586b5ca8d8d2c7035434b5' }
     
})
);

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  let page = await browser.newPage();
   var url= cy.url()
    
    await page.goto(url);

  const { solved, error } = await page.solveRecaptchas();
  if(solved) {
    console.log('✔️ The captcha has been solved');
  }
})();

}



}  
export default ImportantFunctions

