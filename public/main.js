(function () {
angular.module("Greenify", ["ui.router"])
    .config(GreenRouter)
    .controller("homeController", homeController)
    .controller("challengeController", challengeController)

    GreenRouter.$inject = ["$stateProvider", "$urlRouterProvider"]
    challengeController.$inject = ["GreenFactory", "$state", "$sce"]

    function GreenRouter ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "home.html",
          controller: "homeController as homeCtrl"
        })
        .state("challenge", {
          url: "/challenge",
          templateUrl: "challenge.html",
          controller: "challengeController as challengeCtrl"
        })
        $urlRouterProvider.otherwise('/')
    }

    function homeController() {
      var hCtrl = this;
      hCtrl.title = "Home"
    }

    function challengeController (GreenFactory, $state, $sce) {
      var challengeCtrl = this;
      challengeCtrl.$sce = $sce;
      challengeCtrl.title = "Challenge";
      /*Click through main tasks and only display one at a time*/
      challengeCtrl.mainIndex = 0;
      challengeCtrl.mainTasks = GreenFactory.mainTasks;
      challengeCtrl.completeMainTask = function(){
        challengeCtrl.mainIndex++
      }
      /*Click through daily tasks and only display one at a time*/
      challengeCtrl.dailyIndex = 0;
      challengeCtrl.dailyTasks = GreenFactory.dailyTasks;
      challengeCtrl.completeDailyTask = function(){
        challengeCtrl.dailyIndex++
      }
      /*Start with total points at 0*/
      challengeCtrl.totalPoints = 0;
      /*Add five points to totalPoints from the daily tasks ng-click*/
      challengeCtrl.addFivePoints = function() {
        challengeCtrl.totalPoints +=5;
      }
      /*Add 20 points to totalPoints from the main tasks ng-click*/
      challengeCtrl.addTwentyPoints = function() {
        challengeCtrl.totalPoints +=20;
      }
    }
})();
