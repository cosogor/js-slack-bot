const request = require('supertest')
const { App } = require('@slack/bolt')
// const {describe, expect, it } = require('@jest/globals')
// Find conversation ID using the conversations.list method
//https://atomicassets-api.alienworlds.io/atomicassets/v1/templates/alien.worlds/515560
//https://eos.api.atomicassets.io/docs/#/templates/get_atomicassets_v1_templates
//https://wax.api.atomicassets.io/atomicassets/v1/templates?page=1&limit=100&ids=515558%2C515559%2C515560%2C515561%2C516018%2C516019%2C516020%2C516021%2C516022
//https://wax.api.atomicassets.io/atomicassets/v1/templates?page=1&limit=100&ids=19558%2C19583%2C19632%2C19591%2C19650%2C19613%2C19557%2C19651%2C19652
let OAUTH_TOKEN = 'xoxb-3645648434194-3631173771815-wTmB4swywuLvpAR9YmmXilnr'
let SECRET = '26064fcda0b040deab5358c70c1e7f9e'
// let CHANNEL = 'api-monitor'
//let CHANNEL_ID = 'C03JZKMAEPL'

//let CHANNEL = 'test-for-slack-bots'
let CHANNEL = 'qa-bots'
// let API1_HOST = '';
const settings = require('./settings')
OAUTH_TOKEN = settings.OAUTH_TOKEN
SECRET = settings.SECRET

const app = new App({
  token: OAUTH_TOKEN,
  signingSecret: SECRET,
})

// Get Userslist
// Send message
async function sendMessage(OAUTH_TOKEN, CHANNEL, message) {
  let CHANNEL_ID = await findChannel(CHANNEL)
  const result = await app.client.chat.postMessage({
    token: OAUTH_TOKEN,
    channel: CHANNEL_ID,
    text: message,
  })
  console.log(result)
}

// Find user ID using the conversations.list method
async function findUser(userName) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.users.list({
      // The token you used to initialize your app
      token: OAUTH_TOKEN,
    })

    for (const member of result.members) {
      if (member.name === userName) {
        let userId = member.id

        // Print result
        console.log('Found user ID: ' + userId)
        // Break from for loop
        return userId
        //break;
      }
    }
  } catch (error) {
    console.error(error)
  }
}

// Find conversation ID using the conversations.list method
async function findChannel(channelName) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list({
      // The token you used to initialize your app
      token: OAUTH_TOKEN,
    })
    if (channelName === 'qa-bots') {
      // for hidden channel qa-bots in dacoco
      let channelId = 'C03VCUMMKS5'
      console.log('Found channel ID: ' + channelId)
      return channelId
    }
    for (const channel of result.channels) {
      if (channel.name === channelName) {
        let channelId = channel.id

        // Print result
        console.log('Found channel ID: ' + channelId)
        // Break from for loop
        return channelId
        // break;
      }
    }
  } catch (error) {
    console.error(error)
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

//let baseUrl2 = 'http://135.181.217.156/v1/alienworlds/asset?id=1099624236152'
// prod
let baseUrl2 = 'https://api.alienworlds.io/v1/alienworlds/asset?id=1099624236152'

function sleep(microsec) {
  let e = new Date().getTime() + microsec
  while (new Date().getTime() <= e) {}
}

async function getAssetId() {
  console.log('TEST STARTED 0001')
  await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST STARTED1')
  for (i = 1; i <= 5; i++) {
    let date1 = Date.now()
    const response = await request(baseUrl2).get('')
    let date2 = Date.now()
    await sendMessage(
      OAUTH_TOKEN,
      CHANNEL,
      'DELAY: ' + (date2 - date1) + '\nCODE: ' + response.statusCode + '\n' + baseUrl2
    )
    sleep(1000)
  }
  console.log('TEST FINISHED 0001')
  await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST FINISHED 0001')
}

getAssetId()
