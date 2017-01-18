 (function() {
     function GameCtrl(Board, Player) {
         this.board = Board;
         this.player = Player;
     }
 
     angular
         .module('connect-four')
         .controller('GameCtrl', ["Board", "Player", GameCtrl]);
 })();