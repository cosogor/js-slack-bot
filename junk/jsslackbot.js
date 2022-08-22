const excel =  require("excel4node");
const request = require("supertest");
const {App} = require('@slack/bolt');

// const fetch = import("node-fetch");
// const {describe, expect, it } = require('@jest/globals')
// Find conversation ID using the conversations.list method
//https://atomicassets-api.alienworlds.io/atomicassets/v1/templates/alien.worlds/515560
//https://eos.api.atomicassets.io/docs/#/templates/get_atomicassets_v1_templates
//https://wax.api.atomicassets.io/atomicassets/v1/templates?page=1&limit=100&ids=515558%2C515559%2C515560%2C515561%2C516018%2C516019%2C516020%2C516021%2C516022
//https://wax.api.atomicassets.io/atomicassets/v1/templates?page=1&limit=100&ids=19558%2C19583%2C19632%2C19591%2C19650%2C19613%2C19557%2C19651%2C19652
let OAUTH_TOKEN = 'xoxb-3645648434194-3631173771815-wTmB4swywuLvpAR9YmmXilnr';
let SECRET = '26064fcda0b040deab5358c70c1e7f9e';
let CHANNEL = 'api-monitor';
let CHANNEL_ID = 'C03JZKMAEPL';
let API1_HOST = '';

const app = new App({
    token: OAUTH_TOKEN,
    signingSecret: SECRET
});




// Send message
// (async () => {
//     const result = await app.client.chat.postMessage({
//         token: OAUTH_TOKEN,
//         channel: CHANNEL_ID,
//         text: 'hello from bot'
//     });
//     console.log(result)
// })();


function sleep(microsec) {
    let e = new Date().getTime() + (microsec);
    while (new Date().getTime() <= e) {
    }
}


///////////////////
// monitoring tests
///////////////////

async function testGetTableTows() {
    let testId = '0003';
    let baseUrl = 'https://wax.greymass.com/v1/chain/get_table_rows'
    let payload = '{"json":true,"code":"uspts.worlds","scope":"uspts.worlds","table":"pointoffers","lower_bound":"","upper_bound":"","index_position":i,"key_type":"","limit":1000,"reverse":false,"show_payer":false}'
    console.log('TEST STARTED ' + testId);
    // await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST STARTED2');

    let date1 = Date.now();
    const response = await request(baseUrl).post('')
        .set('Content-Type', 'application/json')
        .send(payload);
    let date2 = Date.now();
    await sendMessage(OAUTH_TOKEN, CHANNEL, " DELAY: " + (date2 - date1) +
        "\tCODE: " + response.statusCode + "\n" + baseUrl);
    if (response.statusCode != 200) {
        return response.statusCode;
    }
    //sleep(60000);
    // make sure we add it correctly
    for (let row of response._body.rows) {
        let start = new Date(row.start);
        let end = new Date(row.end);
        let now = new Date();

        let delta = (end - start) / 3600000 / 24;
        let ttl = Math.round(((end - now) / 3600000 / 24), 2);

        if (start <= end) {
            console.log(row.id, start, end, delta, ttl, 'days');
        } else {
            // table contains ERROR
            await sendMessage(OAUTH_TOKEN, CHANNEL, "testId + UPT CONTAINS ERROR ROW: " + row.id +
                start + end + "\tDELTA: " + delta + "\tTTL" + ttl);
        }
    }
    console.log('TEST FINISHED ' + testId);
//    await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST FINISHED 0003');
}


async function testGetMines() {
    let testId = '0003';
    let statusCode = 200;
    let baseUrl = 'http://135.181.217.156/v1/alienworlds/mines?miner=xr..q.c.wam&limit=400&sort=desc&from=2022-06-27T04:00:00.000Z&to=2022-06-28T03:59:59.999Z';
    baseUrl = 'http://135.181.217.156/v1/alienworlds/mines?miner=5oc2y.c.wam&sort=desc';
    // baseUrl = 'http://135.181.217.156/v1/alienworlds/mines?limit=1000&sort=desc';
    console.log('TEST STARTED ' + testId);
    // await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST STARTED1');

    let date1 = Date.now();
    const response = await request(baseUrl).get('');
    let date2 = Date.now();
    let delay = (date2 - date1);
    if (delay > 10000) {
        delay = delay + ' ERROR!!!';
    }
    let statusCodeMsg = response.statusCode +  '\tEST: ' + statusCode ;
    if (response.statusCode != statusCode) {
        //ERROR
        statusCodeMsg = statusCodeMsg+ ' ERROR!!!';
    }
    await sendMessage(OAUTH_TOKEN, CHANNEL, testId + " DELAY: " + (date2 - date1) +
        "\tCODE: " + statusCodeMsg + "\n" + baseUrl);

    // Require library
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('Sheet 1');
    // Create a reusable style
    let style = workbook.createStyle({
        font: {
            color: '#ff0800',
            size: 12
        },
        numberFormat: '###0; (###0); -'
    });

    let i = 1;
    for (let row of response._body.results) {
        let miner = row.miner;
        let invalid = row.params.invalid;
        let error = row.params.error;
        let delay = row.params.delay;
        let difficulty = row.params.difficulty;
        let ease = row.params.ease;
        let luck = row.params.luck;
        let comission = row.params.comission;
        let bounty = row.bounty;
        let land_id = row.land_id;
        let planet_name = row.planet_name;
        let landowner = row.landowner;
        let bag_items = row.bag_items;
        let block_timestamp = new Date(row.block_timestamp);

        worksheet.cell(i, 1).string(block_timestamp.toString()).style(style);
        worksheet.cell(i, 2).string(miner).style(style);
        worksheet.cell(i, 3).string(land_id).style(style);
        worksheet.cell(i, 4).string(bag_items).style(style);
        worksheet.cell(i, 5).string(planet_name).style(style);
        worksheet.cell(i, 6).string(landowner).style(style);
        worksheet.cell(i, 7).number(difficulty).style(style);
        worksheet.cell(i, 8).number(ease).style(style);
        worksheet.cell(i, 9).number(luck).style(style);
        worksheet.cell(i, 10).number(delay).style(style);
        worksheet.cell(i, 11).number(bounty).style(style);
        // worksheet.cell(i,2).number(200).style(style);
        // worksheet.cell(i,3).formula('A1 + B1').style(style);
        // worksheet.cell(2,1).string('string').style(style);
        console.log(block_timestamp, miner, land_id, bag_items, planet_name,
            landowner, difficulty, ease, luck, bounty, delay, (bounty / delay)/* comission, invalid, error */);
        i++;
    }
    workbook.write('Excel.xlsx');
    console.log('TEST FINISHED ' + testId);
    //   await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST FINISHED 0004');
}

async function testGetRequestSipmle(testId, timeout, statusCode, baseUrl) {
    console.log('TEST STARTED ' + testId);
    // await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST STARTED1');

    let date1 = Date.now();
    const response = await request(baseUrl).get('');
    let date2 = Date.now();
    let delay = (date2 - date1);
    if (delay > timeout) {
        delay = delay + ' ERROR!!!';
    }
    let statusCodeMsg = response.statusCode +  '\tEST: ' + statusCode ;
    if (response.statusCode != statusCode) {
        //ERROR
        statusCodeMsg = statusCodeMsg+ ' ERROR!!!';
    }
    await sendMessage(OAUTH_TOKEN, CHANNEL, testId + " DELAY: " + (date2 - date1) +
        "\tCODE: " + statusCodeMsg + "\n" + baseUrl);


    console.log('TEST FINISHED ' + testId);
    //   await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST FINISHED 0004');
}


let x = 0.1 * 0.2;
let z = Math.round(1.005 * 100) / 100;


// testGetTableTows();
// testGetMines();
//
// testGetRequestSipmle('0001', 10000, 200, 'https://waxnode.alienworlds.io/');
// testGetRequestSipmle('0002', 10000, 200, 'http://135.181.217.156/v1/alienworlds/asset?id=1099624236152');
// testGetRequestSipmle('0004', 10000, 200, 'https://dao-api.alienworlds.io/v1/eosdac/nerix/profile?account=1x2qw.wam');
// testGetRequestSipmle('0005', 10000, 200, 'https://wax.api.atomicassets.io/atomicassets/v1/assets?page=1&limit=100&ids=1099512958746%2C1099512959523%2C1099512960117%2C1099512958499%2C1099512958655%2C1099512960545%2C1099512959403%2C1099512960645%2C1099512960051%2C1099512959621%2C1099512958657%2C1099512961056%2C1099512960442%2C1099512960210%2C1099512961425%2C1099512958354%2C1099512959233%2C1099512960129%2C1099512958409%2C1099512960358%2C1099512959869%2C1099512960660%2C1099512961249%2C1099512958446%2C1099512958672%2C1099512959780%2C1099512959387%2C1099512960564%2C1099512958492%2C1099512959436%2C1099512959699%2C1099512960632%2C1099512959374%2C1099512959920%2C1099512960963%2C1099512959319%2C1099512959906%2C1099512958472%2C1099512959721%2C1099512960454%2C1099512961476%2C1099512960427%2C1099512958190%2C1099512960848%2C1099512960434%2C1099512961132%2C1099512961517%2C1099512960705%2C1099512959322%2C1099512958738%2C1099512961459%2C1099512959854%2C1099512959272%2C1099512958241%2C1099512960085%2C1099512959746%2C1099512959711%2C1099512961363%2C1099512960130%2C1099512958825%2C1099512958654%2C1099512961114%2C1099512961168%2C1099512960157%2C1099512961193%2C1099512958619%2C1099512959003%2C1099512960625%2C1099512960280%2C1099512958433%2C1099512960819%2C1099512959999%2C1099512960194%2C1099512959778%2C1099512959573%2C1099512959378%2C1099512958960%2C1099512958204%2C1099512958295%2C1099512959692%2C1099512959211%2C1099512960102%2C1099512960481%2C1099512958817%2C1099512959877%2C1099512958961%2C1099512958547%2C1099512958232%2C1099512958632%2C1099512958700%2C1099512959424%2C1099512960668%2C1099512960734%2C1099512959445%2C1099512960342%2C1099512958308%2C1099512961510%2C1099512961186%2C1099512959606%2C1099512958847&collection_name=alien.worlds');
// testGetRequestSipmle('0006', 10000, 200, 'https://alienworlds.mypinata.cloud/ipfs/QmSN6B2oDTXDMektfBsNGrFC2n9Kzby8hxBgUi8ZuRV6B6');

//testGetRequestSipmle('0007', 10000, 200, 'https://atomicassets-api.alienworlds.io/atomicassets/v1/assets?page=1&limit=100&asset_id=1099519816326&collection_name=alien.worlds');


// I tried with different nodes for the wax api (greymass, eosdac, waxnode) but none work.
//     Anyone else getting this error too?
//
//     Dallas Johnson
// 07:21
// Here’s an example in the API that does have a profile value entered
// https://dao-api.alienworlds.io/v1/eosdac/profile?account=suzqu.wam
// with  header  x-dac-name and  holding the  value nerix the response should include
// something about “I am squanching in here”
// Which was set in this txn https://eosauthority.com/transaction/591b113058f8ad3fbff99c7f2ba92a921919f634a73cba4d8059fae8d2f5666c?network=wax
// on the blockchain but saved in the API that was watching the blocks.


// I’ve just manually checked what the old VueJS client is fetching from the API when
// it’s fetching the candidates list and it seems that it is only fetching the profiles with
//     https://dao-api.alienworlds.io/v1/eosdac/profile?account=l4df21534ae4
// For this to work with the API you will also need to supply a
// header of x-dac-name and the value for that header should be the dac_id eg. magor, naron, kavian, nerix.
// It appears the VueJS client was fetching the candidates directly from the blockchain node with get_table_rows .
// If this is the part you’re having trouble with then you need to query this
// https://wax.bloks.io/account/dao.worlds?loadContract=true&tab=Tables&table=candidates&account=dao.worlds&scope=nerix&limit=100


// Volodymyr Litvak
// get mission by id - https://missions-api.alienworlds.io/missions/1105
// 100 latest missions - https://missions-api.alienworlds.io/missions?page[limit]=100&page[number]=0&page[order]=desc