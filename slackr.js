const { App } = require('@slack/bolt')
const settings = require('./settings')
let OAUTH_TOKEN = ''
OAUTH_TOKEN = process.env.OAUTH_TOKEN
if (OAUTH_TOKEN == undefined) {
  OAUTH_TOKEN = settings.OAUTH_TOKEN
}
// let SECRET = '26064fcda0b040deab5358c70c1e7f9e'
let SECRET = 'd42b163719c794a3b8165c5e669b1494'
// let CHANNEL = 'api-monitor'
let CHANNEL = 'qa-bots'

const app = new App({
  token: OAUTH_TOKEN,
  signingSecret: SECRET,
})

// Find user ID using the conversations.list method
async function findUser(userName, OAUTH_TOKEN_ = OAUTH_TOKEN) {
  try {
    const result = await app.client.users.list({
      token: OAUTH_TOKEN_,
    })
    for (const member of result.members) {
      if (member.name === userName) {
        let userId = member.id
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
async function findChannel(channelName, OAUTH_TOKEN_ = OAUTH_TOKEN) {
  try {
    const result = await app.client.conversations.list({
      token: OAUTH_TOKEN_,
    })
    for (const channel of result.channels) {
      if (channelName === channel.name) {
        let channelId = channel.id
        console.log('Found channel ID: ' + channelId)
        return channelId
      }
    }
    if (channelName === 'qa-bots') {
      // for hidden channel qa-bots in dacoco
      let channelId = 'C03VCUMMKS5'
      console.log('Found channel ID: ' + channelId)
      return channelId
    }
  } catch (error) {
    console.error(error)
  }
}

// Send message with params
async function sendMessageParams(OAUTH_TOKEN_ = OAUTH_TOKEN, CHANNEL_ = CHANNEL, message) {
  let CHANNEL_ID_ = await findChannel(CHANNEL_, OAUTH_TOKEN_)
  const result = await app.client.chat.postMessage({
    token: OAUTH_TOKEN_,
    channel: CHANNEL_ID_,
    text: message,
  })
  console.log(result)
}

// sendMessage('TEST');
async function sendMessage(message) {
  await sendMessageParams(undefined, undefined, message)
}

async function main() {
  await sendMessage('ping')
}

if (require.main === module) {
  main()
}

module.exports = {
  sendMessageParams,
  sendMessage,
}
