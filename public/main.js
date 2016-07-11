(function () {
angular.module("Greenify", ["ui.router"])
    .config(GreenRouter)
    .controller("homeController", homeController)
    .controller("challengeController", challengeController)
    .controller("loginController", loginController)
    .controller("contactController", contactController)

    GreenRouter.$inject = ["$stateProvider", "$urlRouterProvider"]
    challengeController.$inject = ["GreenFactory", "$state", "$sce"]
    loginController.$inject = ["$scope", "$http"]

    function GreenRouter ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "home.html",
          controller: "homeController as homeCtrl"
        })
        .state("log-in", {
           url: "/log-in",
           templateUrl: "log-in.html",
           controller: "loginController as loginCtrl"
        })
        .state("challenge", {
           url: "/challenge",
           templateUrl: "challenge.html",
           controller: "challengeController as challengeCtrl"
        })
        .state("contact-us", {
           url: "/contact-us",
           templateUrl: "contact-us.html",
           controller: "contactController as contactCtrl"
        })
        $urlRouterProvider.otherwise("/")
    }

    function homeController() {
      var homeCtrl = this;
    }

    function loginController ($scope, $http) {
      var loginCtrl = this;
      console.log("Hello login control");
      $scope.signup = function(){
            $http({
                method : 'POST',
                url    : '/signup',
                data   : $scope.signupForm
            }).then(function(returnData){
                console.log(returnData)
                if ( returnData.data.success ) { window.location.href="/#/challenge" }
            })
        }

        $scope.login = function(){
            $http({
                method : 'POST',
                url    : '/login',
                data   : $scope.loginForm
            }).then(function(returnData){
                if ( returnData.data.success ) { window.location.href="/#/challenge" }
                else { console.log(returnData)}
            })
        }
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

    function contactController () {
      var contactCtrl = this;
      console.log('Hello contact-us')

    }
})();
