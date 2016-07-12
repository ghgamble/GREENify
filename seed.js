var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/greenify')

var model = require('./models')
var User = model.User
var Challenge = model.Challenge

var ChallengeList = [
   {
      stepNumber: 1,
      step: "Purchase reusable <a target='_blank' href='https://foursquare.com/explore?q=grocery%20store'>shopping bags </a>",
      points: 20,
      dailyReminder: true,
      reminderText: 'bring your reusabe shopping bags'
   },
   {
      stepNumber: 2,
      step: "Buy a <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> reusable water bottle </a> and commit to using it",
      points: 20,
      dailyReminder: true,
      reminderText: 'bring your reusable water bottle'
   },
   {
      stepNumber: 3,
      step: "Buy a reusable coffee cup and commit to using it",
      points: 20,
      dailyReminder: true,
      reminderText: 'bring your coffee mug'
   },
   {
      stepNumber: 4,
      step: "Unplug electrical devices whenever they are not being used",
      points: 15,
      dailyReminder: true,
      reminderText: 'unplug your electrical devices'
   },
   {
      stepNumber: 5,
      step: "Begin checking to turn off lights when leaving a room, perhaps even <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> install motion-detectors </a>",
      points: 15,
      dailyReminder: true,
      reminderText: 'turn off the lights'
   },
   {
      stepNumber: 6,
      step: "Set thermostat 1-2 degrees lower",
      points: 15,
      dailyReminder: false
   },
   {
      stepNumber: 7,
      step: "Visit your local <a target='_blank' href='https://foursquare.com/explore?q=recycling%20center'> recycling facility</a>",
      points: 30,
      dailyReminder: false
   },
   {
      stepNumber: 8,
      step: "Find out what your local <a target='_blank' href='https://foursquare.com/explore?q=recycling%20center'> recycling facility accepts </a>",
      points: 15,
      dailyReminder: false
   },
   {
      stepNumber: 9,
      step: "Set up your home with <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> recycling bins, </a> begin sorting your recycling in your home",
      points: 25,
      dailyReminder: false
   },
   {
      stepNumber: 10,
      step: "Find out how to get your home’s <a target='_blank' href='https://foursquare.com/explore?q=recycling%20center'> recycling to the local recycling facility </a>, i.e. potentially request bins from the city for pick-up",
      points: 15,
      dailyReminder: false
   },
   {
      stepNumber: 11,
      step: "<a target='_blank' href='https://foursquare.com/explore?q=Hardware'> Purchase energy-efficient light bulbs </a> and replace your current bulbs",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 12,
      step: "Replace single-use containers in your <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> home/kitchen with reusable </a>",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 13,
      step: "Determine the bills you pay and change delivery to paperless/electronic",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 14,
      step: "Switch to reading newspapers, magazines, publications online",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 15,
      step: "<a target='_blank' href='http://www.directmail.com/mail_preference/Unsubscribe'> Unsubscribe </a> and cancel all junk mail",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 16,
      step: "Get rid of one-use plastic items like disposable razors, plasticware",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 17,
      step: "Replace your paper napkins with cloth napkins",
      points: 15,
      dailyReminder: false
   },
   {
      stepNumber: 18,
      step: "Replace faucets with <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> high-efficiency styles </a>",
      points: 25,
      dailyReminder: false
   },
   {
      stepNumber: 19,
      step: "Replace your <a target='_blank' href='https://foursquare.com/explore?q=grocery%20store'> cleaning products with natural alternatives </a>",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 20,
      step: "<a target='_blank' href='https://foursquare.com/explore?q=thrift%20store'> Donate </a> items you no longer use",
      points: 25,
      dailyReminder: false
   },
   {
      stepNumber: 21,
      step: "Locate a favorite <a target='_blank' href='https://www.guidestar.org/nonprofit-directory/environment-animals.aspx'> local green non-profit </a> and determine a day to volunteer or donate money",
      points: 25,
      dailyReminder: false
   },
   {
      stepNumber: 22,
      step: "Inspect windows and ductwork for any air leakage and <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> create weather stripping, </a> with duct tape temporarily and weather stripping more permanently",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 23,
      step: "Keep drapes and shades open during the day to let natural light in for heating and then close them at night for cooling",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 24,
      step: "Inspect your home to insure that electronics are not nearby your cooling unit as this will drain energy",
      points: 15,
      dailyReminder: false
   },
   {
      stepNumber: 25,
      step: "Research common food items that you consume to determine which <a target='_blank' href='https://foursquare.com/explore?q=farmers%20market'> local foods you can buy </a>",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 26,
      step: "Switch one home appliance that needs replacing to an <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> energy efficient/energy star model </a>",
      points: 30,
      dailyReminder: false
   },
   {
      stepNumber: 27,
      step: "Fix leaky faucets, replace air filters to reduce energy waste",
      points: 20,
      dailyReminder: false
   },
   {
      stepNumber: 28,
      step: "Buy one product for your home that needs replacing with either an <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> energy star rating </a> or a <a target='_blank' href='https://foursquare.com/explore?q=grocery%20store'>  recycled/can recycle rating </a>",
      points: 30,
      dailyReminder: false
   },
   {
      stepNumber: 29,
      step: "Research whether you can sign up for green power from your utility company and switch to using it",
      points: 35,
      dailyReminder: false
   },
   {
      stepNumber: 30,
      step: "Conduct an <a target='_blank' href='https://foursquare.com/explore?q=energy%20audit'> energy audit </a> on your home to determine next steps",
      points: 45,
      dailyReminder: false
   }
]

ChallengeList.forEach(function(challenge){
 	var challObj = new Challenge(challenge)
 	challObj.save(function(err){
      console.log(err)
   })
})
