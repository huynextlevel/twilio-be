
const twilio = require('twilio')

// Fetch key, secret and ids from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const pushCredentialSid = process.env.TWILIO_PUSH_CREDENTIAL_SID;

function getToken(identity) {
    const AccessToken = twilio.jwt.AccessToken;
    console.log(' identity ------', identity);
    const ChatGrant = AccessToken.ChatGrant;

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

async function enableIndicator(isEnabled) {
    const client = twilio(accountSid, authToken);
    const response = await client.chat.v2.services(serviceSid)
        .update({ reachabilityEnabled: isEnabled })

    return response;
}

module.exports = {
    getToken,
    enableIndicator
};