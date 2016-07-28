(function () {
angular.module("Greenify", ["ui.router"])
    .config(GreenRouter)
    .controller("challengeController", challengeController)
    .controller("loginController", loginController)

    GreenRouter.$inject = ["$stateProvider", "$urlRouterProvider"]
    loginController.$inject = ["$scope", "$http"]
    challengeController.$inject = ["$state", "$sce", "$http", "$scope"]

    function GreenRouter ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "home.html",
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
        })
        $urlRouterProvider.otherwise("/")
    }

    function loginController ($scope, $http) {
      var loginCtrl = this
      $scope.signup = function(){
            $http({
                method : 'POST',
                url    : '/signup',
                data   : $scope.signupForm
            }).then(function(returnData){
                if ( returnData.data.message ) {$scope.signupError = returnData.data.message}
                if ( returnData.data.success ) {window.location.href="/#/challenge"}
            })
        }
        $scope.login = function(){
            $http({
                method : 'POST',
                url    : '/login',
                data   : $scope.loginForm
            }).then(function(returnData){
                if (returnData.data.message){$scope.errMessage = returnData.data.message}
                if ( returnData.data.success ) { window.location.href="/#/challenge" }
                else { console.log(returnData) }
            })
        }
   }

    function challengeController ($state, $sce, $http, $scope) {
      var challengeCtrl = this
      challengeCtrl.currentChallenge = {}
      challengeCtrl.$sce = $sce
      var challengeIndex = 0
      challengeCtrl.completeApiCall = function(res){
         challengeCtrl.challenges = res.data
         challengeCtrl.currentChallenge = res.data[challengeIndex]
      }
      challengeCtrl.completeMainTask = function(res){
         challengeCtrl.currentChallenge.skipped = false
         $http.post('/api/users/challenges', challengeCtrl.currentChallenge)
            .then(function(res) {
               challengeCtrl.currentChallenge = challengeCtrl.challenges[++challengeIndex]
               challengeCtrl.previousChallenge = challengeCtrl.challenges[challengeIndex-1]
               challengeCtrl.totalPoints = res.data.totalPoints
               //console.log(res.data)
               console.log(challengeCtrl.challenges.length)
               console.log(challengeCtrl.currentChallenge.stepNumber)

            })
      }
      challengeCtrl.skipTask = function(res) {
         challengeCtrl.currentChallenge.skipped = true
         $http.post('/api/users/challenges', challengeCtrl.currentChallenge)
            .then(function(res){
               challengeCtrl.currentChallenge = challengeCtrl.challenges[++challengeIndex]
               challengeCtrl.previousChallenge = challengeCtrl.challenges[challengeIndex-1]
               console.log(challengeCtrl.challenges.length)
               console.log(challengeCtrl.currentChallenge.stepNumber)

            })
         }

      challengeCtrl.renderSteps = function(data){
         challengeCtrl.thisUser = data
         challengeCtrl.totalPoints = challengeCtrl.thisUser.totalPoints;
         challengeIndex = data.challengeStep.length
         challengeCtrl.currentChallenge = challengeCtrl.challenges[challengeIndex]
         // console.log(challengeCtrl.thisUser.challengeStep.length)
         console.log(challengeCtrl.challenges.length)
         console.log(challengeCtrl.currentChallenge)
      }
      $http.get('/api/challenges')
         .then(challengeCtrl.completeApiCall)
         .then(function(res){
            $http.get('/api/me')
               .then(function(res){
                  if(!res.data){
                     $state.go('log-in')
                  }
                  else {
                     challengeCtrl.renderSteps(res.data)
                  }
               }, function() {
                  $state.go('log-in')
               })
         })
     }

if(window.location.port === "") {
   if (window.location.protocol == "http:") {
      var restOfUrl = window.location.href.substr(5)
      window.location = "https:" + restOfUrl
   }
}
})()
