 (function() {
     function TurnCtrl(Player) {
         this.player = Player;
     }
 
     angular
         .module('connect-four')
         .controller('TurnCtrl', ["Player", TurnCtrl]);
 })();