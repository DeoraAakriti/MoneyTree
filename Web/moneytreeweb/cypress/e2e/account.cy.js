describe('account spec', () => {
  it('account creation and deletion', () => {
    var userId = null;
    cy.visit('http://localhost:3000/login');
    cy.get('[id=username]').type('user');
    cy.get('[id=password]').type('user');
    cy.get('[id=submitform]').click();
    cy.wait(1000);
    cy.url().then(url => {
      expect(url).to.equals('http://localhost:3000/Dashboard');
      userId = window.localStorage.getItem('userid');
      cy.intercept('/users/' + userId + "/accounts").as('account');
      cy.get('[id=accountNav]').click();
      cy.wait(1000);
      cy.get('[id=addAccount]').click();
      cy.get('[id=accountname]').type('Test Account');
      cy.get('[id=submitaccount]').click();

      cy.wait('@account').then(intercept => {
        var deleteButtonId = intercept.response.body.Id;
        expect(intercept.response.statusCode).to.equals(200);
        cy.intercept('/users/' + userId + "/accounts/" + deleteButtonId).as('accountdelete');
        cy.get('[id='+ deleteButtonId +']').click();
        cy.get('[id=confirmdelete]').click();
        cy.wait('@accountdelete').then(intercept => {
          expect(intercept.response.statusCode).to.equals(200);
        });
      });
    })

  })
})