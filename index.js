require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const chat = require('./chat')

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

app.get("/twilio/token/:userName", function (request, response) {
    let userName = request.params.userName
    let token = chat.getToken(userName)
    console.log(`🚀 ~ [Username]: ${userName} ----- [Token]: ${token}`)
    response.send(JSON.stringify(token))
})

app.post("/twilio/indicator", async function (request, response) {
    const { isEnabled } = request.body
    const res = await chat.enableIndicator(isEnabled)
    response.status(200).json({
        data: res,
        message: `Reachability Indicator status: ${res.reachabilityEnabled}`
    })
})


app.listen(2202, function () {
    console.log("Application started on port %d", 2202)
})