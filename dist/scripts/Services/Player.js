 (function() {
     function Player() {
         var Player = {};
         
         Player.turn_player = null;
         
         Player.turns = 0;
         
         Player.pick_first = function(){
             var order = Math.ceil(10*Math.random());
             if (order < 5){
                 Player.turn_player = 1;
                 return 1;
             }else{
                 Player.turn_player = 2;
                 return 2;
             }
         };
         
         Player.switch = function(){
             if (Player.turn_player == 1){
                 Player.turn_player = 2;
                 Player.off_turn = 1;
             }else{
                 Player.turn_player = 1;
                 Player.off_turn = 2;
             }
             Player.incrementTurn();
         };
         
         
         Player.incrementTurn = function(){
             Player.turns++;
         };
         
         return Player;
     }
 
     angular
         .module('connect-four')
         .factory('Player', Player);
 })();