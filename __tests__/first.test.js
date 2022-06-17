test("It adds two numbers", () => {
    expect(1 + 1).toBe(2);
});

import request from "supertest";

let  baseUrl = 'https://jsonplaceholder.typicode.com/';
describe('Todos endpoint', () => {
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .get('todos/1');

        expect(response.statusCode).toBe(200);
    });
})


describe('Todos endpoint', () => {
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .get('todos/1');

        expect(response.statusCode).toBe(200);
    });

    it('should have the correct response headers', async () => {
        const response = await request(baseUrl)
            .get('todos')
            .set('Accept', 'application/json');

        expect(response.headers['content-type']).toContain('application/json');
    });

    it('should set the todo item to completed', async () => {
        const response = await request(baseUrl)
            .put('todos/1')
            .send({
                completed: true
            });

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({completed: true, id: 1})
    });

    it('should delete an existing todo', async () => {
        const response = await request(baseUrl)
            .delete('todos/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({});
    })
});


let  baseUrl2 = 'http://135.181.217.156/';
//jest.setTimeout(5000);
describe('GET http://135.181.217.156/v1/alienworlds/asset?id=1099624236152', () => {
    test("It responds with an array of students", async () => {
        const response = await request(baseUrl2)
            .get("v1/alienworlds/asset?id=1099624236152");
        expect(response._body.results[0].owner).toBe("hvol..c.wam");
        expect(response.statusCode).toBe(200);
    });
});



// describe("POST /students", () => {
//     test("It responds with the newly created student", async () => {
//         const newStudent = await request(app)
//             .post("/students")
//             .send({
//                 name: "New Student"
//             });
//
//         // make sure we add it correctly
//         expect(newStudent.body).toHaveProperty("id");
//         expect(newStudent.body.name).toBe("New Student");
//         expect(newStudent.statusCode).toBe(200);
//
//         // make sure we have 3 students now
//         const response = await request(app).get("/students");
//         expect(response.body.length).toBe(3);
//     });
// });