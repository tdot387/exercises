const request = require('supertest');
const app = require('./server');


describe("Book API tests", () => {


    test("add a new book with unique id", async () => {
        const newBook = { title: 'Faserland', author: 'Christian Kracht' };
        const response = await request(app).post('/book').send(newBook);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 3, ...newBook });

    });
    
    test('get a single book', async () => {
        const response = await request(app).get('/book/1');
        expect(response.body).toEqual({ id: 1, title: "1984", author: "George Orwell" });
        expect(response.status).toBe(200);
    })

    test("delete an existing book", async () => {
        const response = await request(app).delete('/book/1');
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
    });

    test("check if book with missing info can be added", async () => {
        const newBook = { title: 'The Stand' }
        const response = await request(app).post('/book').send(newBook);
        expect(response.status).toBe(400);
        expect(response.text).toBe("Titel oder Autor fehlt");
    })

    test("show all books", async () => {
        const response = await request(app).get('/books');
        expect(response.status).toBe(200)
    })


});

