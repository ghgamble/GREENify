angular.module("Greenify")
  .factory("GreenFactory", GreenFactory)

  function GreenFactory () {
    var mainTasks = [
      "Unplug electrical devices whenever they are not being used",
      "Buy a reusable water bottle and commit to using it",
      "Begin checking to turn off lights when leaving a room, perhaps even install motion-detectors",
      "Purchase reusable shopping bags",
      "Don’t turn lights on in your home for as long as you can",
      "Buy products with either an energy star rating or a recycled/can recycle rating",
      "Visit your local recycling facility",
      "Find out what your local recycling facility accepts",
      "Set up your home with recycling bins, begin sorting your recycling in your home",
      "Find out how to get your home’s recycling to the local recycling facility, i.e. potentially request bins from the city for pick-up",
      "Purchase energy-efficient light bulbs and replace your current bulbs",
      "Replace single-use containers in your home/kitchen with reusable",
      "Determine the bills you pay and change delivery to paperless/electronic",
      "Switch to reading newspapers, magazines, publications online",
      "Unsubscribe and cancel all junk mail",
      "Fix leaky faucets, replace air filters to reduce energy waste",
      "Get rid of one-use plastic items like disposable razors, plasticware",
      "Replace faucets with high-efficiency styles",
      "Replace your cleaning products with natural alternatives",
      "Donate items you no longer use",
      "Set thermostat 1-2 degrees lower",
      "Locate a favorite local green non-profit and determine a day to volunteer or donate money",
      "Inspect windows and ductwork for any air leakage and create weather stripping, with duct tape temporarily and weather stripping more permanently",
      "Keep drapes and shades open during the day to let natural light in and then close them at night for cooling",
      "Inspect your home to insure that electronics are not nearby your cooling unit as this will drain energy",
      "Research common food items that you consume to determine which local foods you can buy",
      "Switch one home appliance to an energy efficient/energy star model",
      "Research whether you can sign up for green power from your utility company",
      "Conduct an energy audit on your home to determine next steps",
      "Conduct an energy audit on your home to determine next steps",
      "Congrats, you’ve completed the challenge! Share this app with friends and consider moving on to the next phase"
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
