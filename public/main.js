(function () {
angular.module("Greenify", ["ui.router"])
    .config(GreenRouter)
    .controller("challengeController", challengeController)
    .controller("loginController", loginController)

    GreenRouter.$inject = ["$stateProvider", "$urlRouterProvider"]
    challengeController.$inject = ["$state", "$sce", "$http"]
    loginController.$inject = ["$scope", "$http"]

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
      var loginCtrl = this;
      $scope.signup = function(){
            $http({
                method : 'POST',
                url    : '/signup',
                data   : $scope.signupForm
            }).then(function(returnData){
                if ( returnData.data.success ) {window.location.href="/#/challenge"}
            })
        }

        $scope.login = function(){
            $http({
                method : 'POST',
                url    : '/login',
                data   : $scope.loginForm
            }).then(function(returnData){
                console.log("loggin in user", returnData)
                if (returnData.data.message){
                   $scope.errMessage = returnData.data.message
                }
                if ( returnData.data.success ) { window.location.href="/#/challenge" }
                else { console.log(returnData) }
            })
        }
   }

    function challengeController ($state, $sce, $http) {
      var challengeCtrl = this;
      challengeCtrl.currentChallenge = {}
      challengeCtrl.dailyReminder = {}
      challengeCtrl.dailyReminders = []
      challengeCtrl.completedDailyReminders = []
      challengeCtrl.$sce = $sce;
      challengeCtrl.totalPoints = 0;
      var challengeIndex = 0;
      challengeCtrl.completeApiCall = function(res){
         challengeCtrl.challenges = res.data
         challengeCtrl.currentChallenge = res.data[challengeIndex]
      }
      challengeCtrl.completeMainTask = function(res){
         $http.post('/api/users/challenges', challengeCtrl.currentChallenge)
            .then(function(res) {
               console.log('saves user response: ', res)
               challengeIndex++
               challengeCtrl.currentChallenge = challengeCtrl.challenges[challengeIndex]
               challengeCtrl.previousChallenge = challengeCtrl.challenges[challengeIndex-1]
               $http.get('/api/me')
                  .then(function(res){
                     challengeCtrl.totalPoints = res.data.totalPoints
                  })
            })
      }
      challengeCtrl.renderSteps = function(data){
         challengeCtrl.thisUser = data
         console.log("user object", challengeCtrl.thisUser, 'points: ', challengeCtrl.thisUser.totalPoints)
         challengeCtrl.totalPoints = challengeCtrl.thisUser.totalPoints;
         console.log('new total: ', challengeCtrl.totalPoints)
         //challengeCtrl.totalPoints = data.totalPoints
         challengeIndex = data.challengeStep.length
         challengeCtrl.currentChallenge = challengeCtrl.challenges[challengeIndex]
         challengeCtrl.dailyReminders = []
         challengeCtrl.thisUser.challengeStep.forEach(function(step){
            if (step.dailyReminder) {
               challengeCtrl.dailyReminders.push(step)
            }
         })
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
})();
