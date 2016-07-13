(function () {
angular.module("Greenify", ["ui.router"])
    .config(GreenRouter)
    .controller("challengeController", challengeController)
    .controller("loginController", loginController)

    GreenRouter.$inject = ["$stateProvider", "$urlRouterProvider"]
    challengeController.$inject = ["GreenFactory", "$state", "$sce", "$http"]
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
                console.log('the user ', returnData)
            })
        }
    }

    function challengeController (GreenFactory, $state, $sce, $http) {
      var challengeCtrl = this;
      challengeCtrl.currentChallenge = {}
      challengeCtrl.dailyReminder = {}
      challengeCtrl.$sce = $sce;
      challengeCtrl.totalPoints = 0;
      var challengeIndex = 0;
      challengeCtrl.completeApiCall = function(res){
         challengeCtrl.challenges = res.data
         challengeCtrl.currentChallenge = res.data[challengeIndex]
         console.log("challenges", res.data)
      }
      challengeCtrl.completeMainTask = function(res){
         console.log('complete main task button clicked')
         //Add points from the challenge step/current iteration of the array to the total points and to the user's total points
         $http.post('/api/users', challengeCtrl.currentChallenge)
            .then(function(res){
               challengeIndex++
               challengeCtrl.currentChallenge = challengeCtrl.challenges[challengeIndex]
               $http.get('/api/me')
                  .then(function(res){
                     console.log(res)
                     challengeCtrl.totalPoints = res.data.totalPoints
                  })
            })
         //Add the current step/iteration of the array to the user's database
         //Display the next step/iteration of the array of challenges from database
      }
      challengeCtrl.completeDailyReminder = function(res){
         console.log('complete daily reminder button clicked')
         //$http.post('/api/challenges', )
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
                     challengeCtrl.thisUser = res.data
                     challengeCtrl.totalPoints = res.data.totalPoints
                     challengeIndex = res.data.challengeStep.length
                     challengeCtrl.currentChallenge = challengeCtrl.challenges[challengeIndex]
                  }
               })
         })
     }
})();
