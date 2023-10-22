
const twilio = require('twilio')

// Fetch key, secret and ids from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const fcmPushCredentialSid = process.env.TWILIO_FCM_PUSH_CREDENTIAL_SID;
const apnPushCredentialSid = process.env.TWILIO_APN_PUSH_CREDENTIAL_SID;

function getToken(identity, os) {
    const AccessToken = twilio.jwt.AccessToken;
    console.log(' identity ------', identity, os);
    const ChatGrant = AccessToken.ChatGrant;
    const pushCredentialSid = os === 'android' ? fcmPushCredentialSid : apnPushCredentialSid;

    const chatGrant = new ChatGrant({
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

    token.addGrant(chatGrant); 
    return token.toJwt();
}

module.exports = {
    getToken
};