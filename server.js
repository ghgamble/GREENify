var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var passport = require('passport')
var session = require('express-session')
var mongoose = require('mongoose')
// var apiRouter = require('./api_routes')
console.log('PORT', process.env.PORT)
var port = process.env.PORT || 80

var app = express()

app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
})
app.use(app.sessionMiddleware)

mongoose.connect('mongodb://localhost/greenify', function(error) {
    if(error) console.error('ERROR starting mongoose!', error)
    else console.log('Mongoose connected successfully')
})

// app.use(bodyParser()) // deprecated
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))
//app.use('/api/v0', apiRouter)

app.listen(port, function(error){
    if(error) console.log('ERROR starting server!', error)
    if(!error) console.log('Server started successfully on port:', port)
})
