 (function() {
     function Player() {
         var Player = {};
         
         Player.turn_player = null;
         
         Player.turns = 0;
         
         //randomly picks player 1 or 2 to go first
         //returns an integer
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
         
         //switches turn player from whatever it was to the other one
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
         
         //increments game turn count by 1
         Player.incrementTurn = function(){
             Player.turns++;
         };
         
         return Player;
     }
 
     angular
         .module('connect-four')
         .factory('Player', Player);
 })();