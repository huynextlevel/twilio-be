const twilio = require('twilio')

// Fetch key, secret and ids from .env file
const apiKey = process.env.TWILIO_API_KEY
const apiSecret = process.env.TWILIO_API_SECRET
const accountSid = process.env.TWILIO_ACCOUNT_SID

function getToken(roomName, identity) {
    const AccessToken = twilio.jwt.AccessToken
    console.log(' identity ------', roomName, identity)
    const VideoGrant = AccessToken.VideoGrant

    const videoGrant = new VideoGrant({
        room: roomName,
    })
    const token = new AccessToken(
        accountSid,
        apiKey,
        apiSecret,
        { identity: identity }
    )

    token.addGrant(videoGrant) 
    return token.toJwt()
}

module.exports = {
    getToken
}