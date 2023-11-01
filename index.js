require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const chat = require('./chat')
const call = require('./call')
const video = require('./video')

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');
app.disable('etag');

app.get("/healthcheck", function (request, response) {
  response.send("Server Running")
})

app.get("/twilio/:tokenType/token", function (request, response) {
  const { tokenType } = request.params
  const { userName, os, roomName } = request.query
  if (tokenType === 'chat') {
    const token = chat.getToken(userName, os)
    console.log(`🚀 ~ [Username]: ${userName} -- [OS]: ${os} -- [Type]: ${tokenType} -- [Token]: ${token}`)
    response.send(JSON.stringify(token))
  } else if (tokenType === 'video') {
    const token = video.getToken(roomName, userName)
    console.log(`🚀 ~ [Username]: ${userName} -- [Room]: ${roomName} -- [Type]: ${tokenType} -- [Token]: ${token}`)
    response.send(token)
  } else {
    const token = call.getToken(userName, os)
    console.log(`🚀 ~ [Username]: ${userName} -- [OS]: ${os} -- [Type]: ${tokenType} -- [Token]: ${token}`)
    response.send(token)
  }
})

app.post("/twilio/make-call", function (request, response) {
  const { to, from } = request.body
  const callResponse = call.makeCall(to, from)
  response.send(JSON.stringify(callResponse))
})

app.post("/twilio/chat/pre-webhook", async function (request, response) {
  console.log('🚀 ~ file: index.js:51 ~ request:', request.body)
  const { ChannelSid, From, Body, Attributes } = request.body
  await chat.sendTwilioMessage(ChannelSid, Body, From, Attributes)
  response.status(200).send({ message: 'success' })
})

app.listen(2202, function () {
    console.log("Application started on port %d", 2202)
})