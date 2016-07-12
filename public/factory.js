angular.module("Greenify")
  .factory("GreenFactory", GreenFactory)

  function GreenFactory () {
    var mainTasks = [
      "Purchase reusable <a target='_blank' href='https://foursquare.com/explore?q=grocery%20store'>shopping bags </a>",
      "Buy a <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> reusable water bottle </a> and commit to using it",
      "Buy a reusable coffee cup and commit to using it",
      "Unplug electrical devices whenever they are not being used",
      "Begin checking to turn off lights when leaving a room, perhaps even <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> install motion-detectors </a>",
      "Set thermostat 1-2 degrees lower",
      "Visit your local <a target='_blank' href='https://foursquare.com/explore?q=recycling%20center'> recycling facility</a>",
      "Find out what your local <a target='_blank' href='https://foursquare.com/explore?q=recycling%20center'> recycling facility accepts </a>",
      "Set up your home with <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> recycling bins, </a> begin sorting your recycling in your home",
      "Find out how to get your home’s <a target='_blank' href='https://foursquare.com/explore?q=recycling%20center'> recycling to the local recycling facility </a>, i.e. potentially request bins from the city for pick-up",
      "<a target='_blank' href='https://foursquare.com/explore?q=Hardware'> Purchase energy-efficient light bulbs </a> and replace your current bulbs",
      "Replace single-use containers in your <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> home/kitchen with reusable </a>",
      "Determine the bills you pay and change delivery to paperless/electronic",
      "Switch to reading newspapers, magazines, publications online",
      "<a target='_blank' href='http://www.directmail.com/mail_preference/Unsubscribe'> Unsubscribe </a> and cancel all junk mail",
      "Get rid of one-use plastic items like disposable razors, plasticware",
      "Replace your paper napkins with cloth napkins",
      "Replace faucets with <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> high-efficiency styles </a>",
      "Replace your <a target='_blank' href='https://foursquare.com/explore?q=grocery%20store'> cleaning products with natural alternatives </a>",
      "<a target='_blank' href='https://foursquare.com/explore?q=thrift%20store'> Donate </a> items you no longer use",
      "Locate a favorite <a target='_blank' href='https://www.guidestar.org/nonprofit-directory/environment-animals.aspx'> local green non-profit </a> and determine a day to volunteer or donate money",
      "Inspect windows and ductwork for any air leakage and <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> create weather stripping, </a> with duct tape temporarily and weather stripping more permanently",
      "Keep drapes and shades open during the day to let natural light in and then close them at night for cooling",
      "Inspect your home to insure that electronics are not nearby your cooling unit as this will drain energy",
      "Research common food items that you consume to determine which <a target='_blank' href='https://foursquare.com/explore?q=farmers%20market'> local foods you can buy </a>",
      "Switch one home appliance to an <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> energy efficient/energy star model </a>",
      "Fix leaky faucets, replace air filters to reduce energy waste",
      "Buy one product for your home that needs replacing with either an <a target='_blank' href='https://foursquare.com/explore?q=Hardware'> energy star rating </a> or a <a target='_blank' href='https://foursquare.com/explore?q=grocery%20store'>  recycled/can recycle rating </a>",
      "Research whether you can sign up for green power from your utility company",
      "Conduct an <a target='_blank' href='https://foursquare.com/explore?q=energy%20audit'> energy audit </a> on your home to determine next steps"
    ]
    var dailyTasks = [
      "Did you bring your reusable water bottle with you today?",
      "Did you turn off the water when you brushed your teeth?",
      "Make sure to bring your reusable bags if you're going grocery shopping today!",
      "Did you remember to unplug your electrical devices?",
      "Did you turn off your lights when you left the house?"
    ]
    return {
      mainTasks: mainTasks,
      dailyTasks: dailyTasks
    }

  }
