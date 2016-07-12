(function () {
angular.module("Greenify", ["ui.router"])
    .config(GreenRouter)
    .controller("homeController", homeController)
    .controller("challengeController", challengeController)
    .controller("loginController", loginController)
    .controller("contactController", contactController)

    GreenRouter.$inject = ["$stateProvider", "$urlRouterProvider"]
    challengeController.$inject = ["GreenFactory", "$state", "$sce", "$http"]
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

    function challengeController (GreenFactory, $state, $sce, $http) {
      var challengeCtrl = this;
      // challengeCtrl.challenges = []
      challengeCtrl.currentChallenge = {}
      challengeCtrl.$sce = $sce;
      challengeCtrl.totalPoints = 0;
      //nextChallenge = challengeCtrl.challenges[0]
      // challengeCtrl.handleData = function(data) {
      //    console.log(data)
      // }
      challengeCtrl.completeApiCall = function(res){
         challengeCtrl.challenges = res.data
         challengeCtrl.currentChallenge = res.data[0]
         console.log("challenges", res.data)
      }
      challengeCtrl.completeMainTask = function(res){
         console.log('hello button clicked')
      }
      challengeCtrl.completeDailyReminder = function(){

      }

      $http.get('/api/me')
         .then(function(res){
            challengeCtrl.thisUser = res.data
            if(!res.data){
               $state.go('log-in')
            }

         })
      $http.get('/api/challenges')
         .then(challengeCtrl.completeApiCall)
   }

    function contactController () {
      var contactCtrl = this;
      console.log('Hello contact-us')

    }
})();
