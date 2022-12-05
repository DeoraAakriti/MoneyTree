import app from "../server.js"
import request from "supertest"
import setupDb from '../configs/db.js';


describe('Test root path', () => {
    beforeAll(() => setupDb());
    test('root path', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toBe(200);

    }),
        test('create user', async () => {
            const newUser = {
                firstName: "YYYY",
                lastName: "Testing",
                userName: "YYYTesting",
                password: "YYYTesting"
            }
            const res = await request(app).post('/users').send(newUser);
            expect(res.statusCode).toBe(200);
            expect(res.body.passwords.length).toBe(1);
        }),
        test('get user', async () => {
            const res = await request(app).get('/users/1');
            expect(res.statusCode).toBe(200);
            expect(res.body[0].accounts.length).toBe(2);
            expect(res.body[0].transactions.length).toBe(2);
            expect(res.body[0].categories.length).toBe(2);
        }),
        test('create and delete account', async () => {
            const newAccount = { name: "Test Account" }
            const res = await request(app).post('/users/1/accounts').send(newAccount);
            const response = await request(app).delete('/users/1/accounts/' + res.body.Id);
            expect(res.statusCode).toBe(200);
            expect(res.body.Name).toBe(newAccount.name);
            expect(response.statusCode).toBe(200);

        }),
        test('create and delete category', async () => {
            const newCategory = {
                name: "Test Category",
                type: 2,
                budget: 500.25
            }
            const res = await request(app).post('/users/1/categories').send(newCategory);
            const response = await request(app).delete('/users/1/categories/' + res.body.Id);
            expect(res.statusCode).toBe(200);
            expect(res.body.Name).toBe(newCategory.name);
            expect(res.body.Type).toBe(newCategory.type);
            expect(res.body.Budget).toBe(newCategory.budget);
            expect(response.statusCode).toBe(200);
        }),
        test('create and delete transaction', async () => {
            const newTransaction = {
                name: "Test Category",
                amount: 200,
                transactionDate: new Date().toISOString().split('T')[0],
                categoryId: 2,
                accountId: 2
            }
            const res = await request(app).post('/users/1/transactions').send(newTransaction);
            const response = await request(app).delete('/users/1/transactions/' + res.body.Id);
            expect(res.statusCode).toBe(200);
            expect(res.body.Name).toBe(newTransaction.name);
            expect(res.body.CategoryId).toBe(newTransaction.categoryId);
            expect(res.body.AccountId).toBe(newTransaction.accountId);
            expect(res.body.Amount).toBe(newTransaction.amount);
            expect(res.body.TransactionDate.split("T")[0]).toBe(newTransaction.transactionDate);
            expect(response.statusCode).toBe(200);
        })
});
