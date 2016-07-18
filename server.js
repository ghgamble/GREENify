var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var fs = require('fs')
var https = require('https')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var bcrypt = require('bcrypt')
var logOut = require('express-passport-logout')
var mongoose = require('mongoose')
var models = require('./models')
var port = process.env.PORT || 80

var app = express()

var User = models.User
var Challenge = models.Challenge
var Progress = models.Progress

mongoose.connect('mongodb://localhost/greenify', function(error) {
    if(error) console.error('ERROR starting mongoose!', error)
    else console.log('Mongoose connected successfully')
})

app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
})
app.use(app.sessionMiddleware)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))
var options = {
   key: fs.readFileSync('/etc/letsencrypt/live/greenifyapp.com/privkey.pem'),
   cert: fs.readFileSync('/etc/letsencrypt/live/greenifyapp.com/cert.pem')
}

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
    done(null, user.id)
})
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user)
    })
})

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err) }
            if (!user) {
                 return done(null, false)
             }
            bcrypt.compare(password, user.password, function(error, matched){
                if (matched === true){
                    return done(null,user)
                }
                else {
                    return done(null, false)
                }
            })
        })
    }
))

app.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log('get outta here!')
    res.redirect('/');
}

app.post('/signup', function(req, res){
    bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
            });
            newUser.save(function(saveErr, user){
                if ( saveErr ) {res.json ({message: 'The username and/or email address already in use'}) }
                else {
                    req.logIn(user, function(loginErr){
                        if ( loginErr ) {console.log("error signing up", loginErr)}
                        else { res.send({success: 'success'}) }
                    })
                }
            })
        })
    })
})

app.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({message : 'Password or username is incorrect'}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:'success'});
        });
    })(req, res, next);
})

app.get('/api/me', function(req, res){
   if(req.user == undefined) {
      res.status(403).send({ error: 'Not Logged in' })
   } else {
      User.findOne({
         username: req.user.username
      })
      .populate('challengeStep')
      .exec(function(error, User){
         res.send(User)
      })
   }
})

app.get('/api/challenges', function(req, res){
   Challenge.find({}, function(err, challenges){
      res.send(challenges)
   }).sort('stepNumber')
})

app.post('/api/users/challenges', function(req, res){
   console.log(req.body)
   // res.send('challenge')
   User.findOne({'username' : req.user.username}, function(error, user){
      user.totalPoints += req.body.points
      user.challengeStep.push(req.body)
      user.save(function(error, user){
         res.send(user)
      })
   })
})

app.listen(port, function(error){
    if(error) console.log('ERROR starting server!', error)
    if(!error) console.log('Server started successfully on port:', port)
})

https.createServer(options, app).listen(443, function(){
   console.log('HTTPS Started!')
})
