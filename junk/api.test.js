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


//jest.setTimeout(5000);
describe('GET http://135.181.217.156/v1/alienworlds/asset?id=1099624236152', () => {
    test("It responds with an array of asset", async () => {
        let  baseUrl = 'http://135.181.217.156/';
        const response = await request(baseUrl)
            .get("v1/alienworlds/asset?id=1099624236152");
        expect(response._body.results[0].owner).toBe("hvol..c.wam");
        expect(response.statusCode).toBe(200);
    });
});



describe("POST ", () => {
    test("It responds with the get_table_rows", async () => {
        let baseUrl = 'https://wax.greymass.com/v1/chain/get_table_rows'
        let payload = '{"json":true,"code":"uspts.worlds","scope":"uspts.worlds","table":"pointoffers","lower_bound":"","upper_bound":"","index_position":1,"key_type":"","limit":1000,"reverse":false,"show_payer":false}';
        const response = await request(baseUrl)
            .post('')
            .set('Content-Type', 'application/json')
            // .set('Accept', '*/*')
            // .set('Accept-Encoding', 'gzip, deflate, br')
            // .set('Connection', 'keep-alive')
            //.set ('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0')
            .send(payload);
        expect(response.statusCode).toBe(200);

        // make sure we add it correctly
        for (let row of response._body.rows)
        {
            let start = new Date(row.start);
            let end = new Date(row.end);
            let now = new Date();

            let delta = (end - start)/3600000/24;
            let ttl = Math.round(((end - now)/3600000/24),2);

            expect((end - start) > 0).toBeTruthy();
            if (start <= end){
                console.log(row.id, start , end, delta, ttl ,'days');
            }
        }
    });
});


describe('https://api.alienworlds.io/v1/alienworlds/mines?miner=xr..q.c.wam&limit=400&sort=desc&from=2022-06-27T04:00:00.000Z&to=2022-06-28T03:59:59.999Z', () => {
    test("It responds with an array of minings", async () => {
        let  baseUrl = 'http://135.181.217.156/v1/alienworlds/mines?miner=xr..q.c.wam&limit=400&sort=desc&from=2022-06-27T04:00:00.000Z&to=2022-06-28T03:59:59.999Z';
        const response = await request(baseUrl)
        .get('')
        .set('Accept', '*/*')
        .set('Accept-Encoding', 'gzip, deflate, br')
        .set('Connection', 'keep-alive')
        //.set ('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0')
        //.set ('Cookie',' _gcl_au=1.1.550988223.1653848600; _ga_3HX0T3YBPR=GS1.1.1656359214.61.0.1656359214.0; _ga=GA1.1.1679432766.1653848600')

        expect(response.statusCode).toBe(200);
    });
});

