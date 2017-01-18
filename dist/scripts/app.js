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
             controller: 'TurnCtrl as turn',
             templateUrl: '/templates/landing.html'
         });
     }
 

     angular
         .module('connect-four', ['ui.router'])
         .config(config);
 })();