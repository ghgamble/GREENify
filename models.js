var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
   username: {
      type: String,
      unique: true,
      required: true
   },
   email: {
      type: String,
      unique: true,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   },
   password: {
      type: String,
      required: true
   },
   challengeStep: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Challenge',
   }],
   totalPoints :{
      type: Number,
      default: 0
   }
})

var challengeSchema = mongoose.Schema({
   stepNumber: {
      type: Number,
      unique: true,
      required: true
   },
   step: String,
   points: Number,
   dailyReminder: Boolean,
   reminderText: String,
   Skipped: Boolean
})

var progressSchema = mongoose.Schema({
   completedStep: {
      type: mongoose.Schema.ObjectId,
      ref: 'Challenge',
   },
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
   }
})

var User = mongoose.model('User', userSchema)
var Challenge = mongoose.model('Challenge', challengeSchema)
var Progress = mongoose.model('Progress', progressSchema)

module.exports = {
   User : User,
   Challenge : Challenge,
   Progress : Progress
}
