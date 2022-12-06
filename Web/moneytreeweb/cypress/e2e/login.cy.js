describe('login spec', () => {
    it('test user login and logout', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('[id=username]').type('user');
      cy.get('[id=password]').type('user');
      cy.get('[id=submitform]').click();
      cy.wait(1000);
      cy.url().then(url => {
        expect(url).to.equals('http://localhost:3000/Dashboard');
      })
      cy.get('[id=logoutNav]').click();
      cy.wait(1000);
      cy.url().then(url => {
        expect(url).to.equals('http://localhost:3000/');
      })
    })
  })