const axios = require('axios')

const FCM_URL = 'https://fcm.googleapis.com/fcm/send'
const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY

const sendFCMNotification = async (token, title, body, data) => {
  const message = {
    to: token,
    notification: {
      title: title,
      body: body,
    },
    data: data ? data : {}
  }

  try {
    const response = await axios.post(FCM_URL, message, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FCM_SERVER_KEY}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error sending notification:', error.response.data)
    throw error
  }
}

module.exports = {
  sendFCMNotification
}
