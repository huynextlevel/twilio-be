
const twilio = require('twilio')

// Fetch key, secret and ids from .env file
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
const fcmPushCredentialSid = process.env.TWILIO_FCM_PUSH_CREDENTIAL_SID;
const apnPushCredentialSid = process.env.TWILIO_APN_PUSH_CREDENTIAL_SID;

function getToken(identity, os) {
    const AccessToken = twilio.jwt.AccessToken;
    console.log(' identity ------', identity, os);
    const VoiceGrant = AccessToken.VoiceGrant;
    const pushCredentialSid = os === 'android' ? fcmPushCredentialSid : apnPushCredentialSid;

    const voiceGrant = new VoiceGrant({
        serviceSid: serviceSid,
        pushCredentialSid: pushCredentialSid
    });
    const token = new AccessToken(
        accountSid,
        apiKey,
        apiSecret,
        { 
            identity: identity, // identify user uniquely 
            ttl: 3600 // token expiration time
        }
    );

    token.addGrant(voiceGrant); 
    return token.toJwt();
}

module.exports = {
    getToken
};