const twilio = require('twilio')
const VoiceResponse = require('twilio').twiml.VoiceResponse

const callerNumber = '1234567890'

// Fetch key, secret and ids from .env file
const apiKey = process.env.TWILIO_API_KEY
const apiSecret = process.env.TWILIO_API_SECRET
const accountSid = process.env.TWILIO_ACCOUNT_SID
const serviceSid = process.env.TWILIO_CALL_SERVICE_SID
const fcmPushCredentialSid = process.env.TWILIO_FCM_PUSH_CREDENTIAL_SID
const apnVoipPushCredentialSid = process.env.TWILIO_APN_VOIP_PUSH_CREDENTIAL_SID

function getToken(identity, os) {
  const AccessToken = twilio.jwt.AccessToken
  console.log(' identity ------', identity, os)
  const VoiceGrant = AccessToken.VoiceGrant
  const pushCredentialSid = os === 'android' ? fcmPushCredentialSid : apnVoipPushCredentialSid

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: serviceSid,
    pushCredentialSid: pushCredentialSid
  })
  const token = new AccessToken(
    accountSid,
    apiKey,
    apiSecret,
    { identity: identity }
  )

  token.addGrant(voiceGrant)
  return token.toJwt()
}

function makeCall (toClient, fromClient) {
  const voiceResponse = new VoiceResponse()

  if (!toClient) {
    voiceResponse.say("Congratulations! You have made your first call! Good bye.")
  } else if (isNumber(toClient)) {
    const dial = voiceResponse.dial({callerId : callerNumber})
    dial.number(toClient)
  } else {
    const dial = voiceResponse.dial({ callerId: fromClient })
    dial.client(toClient)
  }
  console.log('Response:' + voiceResponse.toString())
  console.log('🚀 ~ file: call.js:43 ~ makeCall ~ voiceResponse:', voiceResponse)
  return voiceResponse.toString()
}

function isNumber(to) {
  if (to.length == 1) {
    if (!isNaN(to)) {
      console.log("It is a 1 digit long number" + to)
      return true
    }
  } else if (String(to).charAt(0) == '+') {
    number = to.substring(1)
    if(!isNaN(number)) {
      console.log("It is a number " + to)
      return true
    }
  } else {
    if (!isNaN(to)) {
      console.log("It is a number " + to)
      return true
    }
  }
  console.log("not a number")
  return false
}

module.exports = {
  getToken,
  makeCall
}