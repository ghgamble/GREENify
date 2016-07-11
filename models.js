var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
   username: {
      type: String,
      unique: true
   },
   email: {
      type: String,
      unique: true
   },
   password: String,
   challengeStep: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Challenge'
   }]
})

var challengeSchema = mongoose.Schema({
   step: String,
   points: Number
})

var User = mongoose.model('User', userSchema)
var Challenge = mongoose.model('Challenge', challengeSchema)

module.exports = {
   User : User,
   Challenge : Challenge
}
