import request from "supertest";


test("It adds two numbers", () => {
    expect(1 + 1).toBe(2);
});


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


let baseUrl3 = 'https://wax.greymass.com/v1/chain/get_table_rows'
let payload = '{"json":true,"code":"uspts.worlds","scope":"uspts.worlds","table":"pointoffers","lower_bound":"","upper_bound":"","index_position":1,"key_type":"","limit":1000,"reverse":false,"show_payer":false}'

// payload = '{\n' +
//     '   "json":true,\n' +
//     '   "code":"uspts.worlds",\n' +
//     '   "scope":"uspts.worlds",\n' +
//     '   "table":"pointoffers",\n' +
//     '   "lower_bound":"",\n' +
//     '   "upper_bound":"",\n' +
//     '   "index_position":1,\n' +
//     '   "key_type":"",\n' +
//     '   "limit":1000,\n' +
//     '   "reverse":false,\n' +
//     '   "show_payer":false\n' +
//     '}'

describe("POST ", () => {
    test("It responds with the get_table_rows", async () => {
        const response = await request(baseUrl3)
            .post('')
            .set('Content-Type', 'application/json')
            // .set('Accept', '*/*')
            // .set('Accept-Encoding', 'gzip, deflate, br')
            // .set('Connection', 'keep-alive')
            // .set ('User-Agent', 'PostmanRuntime/7.29.0')
            .send(payload);
        expect(response.statusCode).toBe(200);

        // make sure we add it correctly
        expect(response.body.name).toBe("New Student");

        // // make sure we have 3 students now
        // const response = await request(app).get("/students");
        // expect(response.body.length).toBe(3);
    });
});