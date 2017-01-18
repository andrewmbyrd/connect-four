(function() {
     function config($stateProvider, $locationProvider) {
         $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
         
         $stateProvider
             .state('landing', {
                 url: '/',
                 controller: 'GameCtrl as game',
                 templateUrl: '/templates/landing.html'
        })
         
            .state('board', {
                 url: '/board',
                 templateUrl: '/templates/board.html'
        });
         
          
     }
 

     angular
         .module('connect-four', ['ui.router'])
         .config(config);
 })();