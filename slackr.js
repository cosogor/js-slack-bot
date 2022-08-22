const { App } = require('@slack/bolt')
let OAUTH_TOKEN = 'xoxb-3645648434194-3631173771815-wTmB4swywuLvpAR9YmmXilnr1'
let CHANNEL = 'api-monitor'
// let CHANNEL_ID = 'C03JZKMAEPL';
let SECRET = '26064fcda0b040deab5358c70c1e7f9e'

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
      if (channel.name === channelName) {
        let channelId = channel.id
        console.log('Found channel ID: ' + channelId)
        return channelId
      }
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

module.exports = {
  sendMessageParams,
  sendMessage,
}
