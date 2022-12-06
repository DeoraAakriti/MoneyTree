describe('signup spec', () => {
  it('test user sign up', () => {
    cy.intercept('/users').as('newUser');
    cy.visit('http://localhost:3000/signup');
    cy.get('[id=username]').type('user');
    cy.get('[id=firstname]').type('user');
    cy.get('[id=lastname]').type('user');
    cy.get('[id=password]').type('user');
    cy.get('[id=submitform]').click();
    cy
    .wait('@newUser')
    .then(intercept => {
      if(intercept.response.statusCode == 200) {
        cy.on('window:alert',(t)=>{
          expect(t).to.contains('Signed up successfully. Please login now');
       })
      }else {
        cy.on('window:alert',(t)=>{
          expect(t).to.contains('User already exists try Login instead');
       })
      }
    });
  })
})