describe('transaction spec', () => {
    it('transaction creation and deletion', () => {
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
                var accountId = intercept.response.body.Id;
                expect(intercept.response.statusCode).to.equals(200);
                cy.intercept('/users/' + userId + "/accounts/" + accountId).as('accountdelete');
                cy.intercept('/users/' + userId + "/categories").as('category');
                cy.get('[id=categoryNav]').click();
                cy.wait(1000);
                cy.get('[id=addCategory]').click();
                cy.get('[id=categoryName]').type('Test Category');
                cy.get('[id=categoryTypeDropdown]').click();
                cy.get('[id=income]').click();
                cy.get('[id=submitCategory]').click();
                cy.wait('@category').then(intercept => {
                    var categoryId = intercept.response.body.Id;
                    expect(intercept.response.statusCode).to.equals(200);
                    cy.get('[id=transactionNav]').click();
                    cy.intercept('/users/' + userId + "/categories/" + categoryId).as('categorydelete');
                    cy.intercept('/users/' + userId + "/transactions").as('transaction');
                    cy.wait(1000);
                    cy.get('[id=addTransaction]').click();
                    cy.get('[id=transactionName]').type('Test Transaction');
                    cy.get('[id=accountName]').click();
                    cy.get('[id="Test Account"]').click()
                    cy.get('[id=categoryName]').click();
                    cy.get('[id="Test Category"]').click();
                    cy.get('[id=transactionAmount]').type('505.55');
                    cy.get('[id=transactionDate]').type('2022-12-01');
                    cy.get('[id=submitTransaction]').click();
                    cy.wait('@transaction').then(intercept => {
                        var transactionId = intercept.response.body.Id;
                        expect(intercept.response.statusCode).to.equals(200);
                        cy.intercept('/users/' + userId + "/transactions/" + transactionId).as('transactiondelete');
                        cy.wait(1000);
                        cy.get('[id=' + transactionId + ']').click();
                        cy.get('[id=deleteTransaction]').click();
                        cy.wait('@transactiondelete').then(intercept => {
                            expect(intercept.response.statusCode).to.equals(200);
                            cy.get('[id=categoryNav]').click();
                            cy.wait(1000);
                            cy.get('[id=' + categoryId + ']').click();
                            cy.get('[id=deleteCategory]').click();
                            cy.wait('@categorydelete').then(intercept => {
                                expect(intercept.response.statusCode).to.equals(200);
                                cy.get('[id=accountNav]').click();
                                cy.wait(1000);
                                cy.get('[id=' + accountId + ']').click();
                                cy.get('[id=confirmdelete]').click();
                                cy.wait('@accountdelete').then(intercept => {
                                    expect(intercept.response.statusCode).to.equals(200);
                                    cy.wait(1000);
                                    cy.get('[id=logoutNav]').click();
                                });
                            });
                        });
                    });
                });

            });
        })

    })
})