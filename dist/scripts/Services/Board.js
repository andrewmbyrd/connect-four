 (function() {
     function Board() {
         var Board = {};
        
         var chips=["http://i.imgur.com/O1lQF0g.png","http://i.imgur.com/wtJT330.png", "http://i.imgur.com/NzuGMJn.png"]
         
         /*function notEmpty
         @desc this function will help us find the index of the first non-empty slot in any column
         *returns boolean
         */
         var empty = function(element){
             return element === 0;
         };
         
         
         Board.cols=[1,2,3,4,5,6,7];
         Board.rows=[1,2,3,4,5,6];
         
         Board.matrix=[];
         
         //initialize the board with all empty slots
         for(var i=0;i<7;i++){
             Board.matrix.push([0,0,0,0,0,0,0]);
         }
         
         
         Board.addChip = function(column, player){

             var replaceIndex = Board.matrix[column].findIndex(empty);
             Board.matrix[column][replaceIndex] = player;
             
             
             console.log("Column: "+column);
             console.log(Board.matrix[column]);
             $(".slots")[((6-replaceIndex)*7-1) - (6-column)].innerHTML= "<img class='chip' src="+"'"+chips[player]+"' <='' td=''>";
             
         };
         
         return Board;
     }
 
     angular
         .module('connect-four')
         .factory('Board', Board);
 })();