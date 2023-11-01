const twilio = require('twilio')
const fcmServices = require('./fcmServices')

// Fetch key, secret and ids from .env file
const apiKey = process.env.TWILIO_API_KEY
const authToken = process.env.TWILIO_AUTH_TOKEN
const apiSecret = process.env.TWILIO_API_SECRET
const accountSid = process.env.TWILIO_ACCOUNT_SID
const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID
const fcmPushCredentialSid = process.env.TWILIO_FCM_PUSH_CREDENTIAL_SID
const apnPushCredentialSid = process.env.TWILIO_APN_PUSH_CREDENTIAL_SID

const TEST_TOKEN = "fOzv8x1QjE2igd5XYXpvKF:APA91bGmXqOATnMuedUEm_d_9GWG0wIB2waMjG4oFzCmimCY451ZWCPW0yhXRlJR1l_kJed9rCmTLyd-MdS4V4same-MhlaWOA434W31Vz4Ll8NvSlZ2CQ-hn9lj7dN6-D3Wv-Xb_jr6"

function getToken(identity, os) {
    const AccessToken = twilio.jwt.AccessToken
    console.log(' identity ------', identity, os)
    const ChatGrant = AccessToken.ChatGrant
    const pushCredentialSid = os === 'android' ? fcmPushCredentialSid : apnPushCredentialSid

    const chatGrant = new ChatGrant({
        serviceSid: serviceSid,
        pushCredentialSid: pushCredentialSid
    })
    const token = new AccessToken(
        accountSid,
        apiKey,
        apiSecret,
        { 
            identity: identity, // identify user uniquely 
            ttl: 3600 // token expiration time
        }
    )

    token.addGrant(chatGrant) 
    return token.toJwt()
}

async function sendTwilioMessage(channelSid, message, from, attribues) {
    try {
        const client = twilio(accountSid, authToken)
        const channelDetail = await client.chat.v2
            .services(serviceSid)
            .channels(channelSid)
            .fetch()
        console.log('🚀 ~ file: chat.js:41 ~ sendTwilioMessage ~ channelDetail:', channelDetail)
        const body = `${from}: ${message}`
        const bodyData = {
            author: from,
            channel_id: channelSid,
            channel_sid: channelSid,
            channel_title: channelDetail.friendlyName,
            twi_body: body,
            twi_message_type: 'twilio.channel.new_message',
            ...JSON.parse(attribues)
        }
        const fcmResponse = await fcmServices.sendFCMNotification(TEST_TOKEN, channelDetail.friendlyName, body, bodyData)
        return fcmResponse
    } catch(err) {
        console.log('Error sending message', err)
        throw err
    }
}

module.exports = {
    getToken,
    sendTwilioMessage
}