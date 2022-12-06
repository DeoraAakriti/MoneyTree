describe('category spec', () => {
    it('category creation and deletion', () => {
      var userId = null;
      cy.visit('http://localhost:3000/login');
      cy.get('[id=username]').type('user');
      cy.get('[id=password]').type('user');
      cy.get('[id=submitform]').click();
      cy.wait(1000);
      cy.url().then(url => {
        expect(url).to.equals('http://localhost:3000/Dashboard');
        userId = window.localStorage.getItem('userid');
        cy.intercept('/users/' + userId + "/categories").as('category');
        cy.get('[id=categoryNav]').click();
        cy.wait(1000);
        cy.get('[id=addCategory]').click();
        cy.get('[id=categoryName]').type('Test Category');
        cy.get('[id=categoryTypeDropdown]').click();
        cy.get('[id=income]').click();
        cy.get('[id=submitCategory]').click();
        cy.wait('@category').then(intercept => {
            var deleteButtonId = intercept.response.body.Id;
            expect(intercept.response.statusCode).to.equals(200);
            cy.intercept('/users/' + userId + "/categories/" + deleteButtonId).as('categorydelete');
            cy.get('[id='+ deleteButtonId +']').click();
            cy.get('[id=deleteCategory]').click();
            cy.wait('@categorydelete').then(intercept => {
              expect(intercept.response.statusCode).to.equals(200);
            });
          });
      })
  
    })
  })