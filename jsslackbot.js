const request = require("supertest");
const { App } = require('@slack/bolt')
// const {describe, expect, it } = require('@jest/globals')
// Find conversation ID using the conversations.list method

let OAUTH_TOKEN = 'xoxb-3645648434194-3631173771815-wTmB4swywuLvpAR9YmmXilnr1';
let SECRET = '26064fcda0b040deab5358c70c1e7f9e1';
let CHANNEL = 'api-monitor';
let CHANNEL_ID = 'C03JZKMAEPL';
let API1_HOST = '';

const app = new App({
    token: OAUTH_TOKEN,
    signingSecret: SECRET
});

// Get Userslist
// Send message
async function sendMessage (OAUTH_TOKEN, CHANNEL,message){
   let   CHANNEL_ID = await findChannel(CHANNEL);
    const result = await app.client.chat.postMessage({
        token: OAUTH_TOKEN,
        channel: CHANNEL_ID,
        text: message
    });
    console.log(result)
};

// Find user ID using the conversations.list method
async function findUser(userName) {
    try {
        // Call the conversations.list method using the built-in WebClient
        const result = await app.client.users.list({
            // The token you used to initialize your app
            token: OAUTH_TOKEN
        });

        for (const member of result.members) {
            if (member.name === userName) {
                let userId = member.id;

                // Print result
                console.log("Found user ID: " + userId);
                // Break from for loop
                return userId;
                //break;
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}


// Find conversation ID using the conversations.list method
async function findChannel(channelName) {
    try {
        // Call the conversations.list method using the built-in WebClient
        const result = await app.client.conversations.list({
            // The token you used to initialize your app
            token: OAUTH_TOKEN
        });

        for (const channel of result.channels) {
            if (channel.name === channelName) {
                let channelId = channel.id;

                // Print result
                console.log("Found channel ID: " + channelId);
                // Break from for loop
                return channelId;
                // break;
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}


// Send message
// (async () => {
//     const result = await app.client.chat.postMessage({
//         token: OAUTH_TOKEN,
//         channel: CHANNEL_ID,
//         text: 'hello world2'
//     });
//     console.log(result)
// })();




let baseUrl2 = 'http://135.181.217.156/v1/alienworlds/asset?id=1099624236152';
function sleep(microsec)
{
    let e = new Date().getTime() + (microsec);
    while (new Date().getTime() <= e) {}
}

async function getAssetId() {
    console.log('TEST STARTED1');
   // await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST STARTED1');
    for (i=1; i<=5; i++) {
            let date1 = Date.now();
            const response = await request(baseUrl2).get('');
            let date2 = Date.now();
            await sendMessage(OAUTH_TOKEN, CHANNEL, "DELAY: " + (date2 - date1) + "\nCODE: " + response.statusCode +  "\n" + baseUrl2);
            sleep(60000);
    }
    console.log('TEST FINISHED1');
    await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST FINISHED1');
}



getAssetId();


