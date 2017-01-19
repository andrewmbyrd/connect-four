 (function() {
     function Board() {
         //initialize the board as an empty object
         var Board = {};
        
         
         
         /*function empty
         @desc this function will help us find the index of the first non-empty slot in any column
         *returns boolean
         */
         var empty = function(element){
             return element === 0;
         };
         
         /*function checkConsec
         *@desc takes in an array and checks that 4 consecutive values are the same, non-zero number
         * returns boolean
         */
         var checkConsec = function(numArray){
            var consecutive = 1;
             
             for (var i = 0;i< 6; i++){
                 if (numArray[i] === 0){
                     consecutive = 1;
                 }else{
                     if(numArray[i] === numArray[i+1]){
                         consecutive+=1;
                         if (consecutive === 4){
                             $(".slots").css("border-color", "yellow");
                             $(".slots").css("border-width", "2px");
                             $(".slots").css("border-style", "solid");
                             return true;
                         }
                     }else{
                         consecutive = 1;
                     }
                      
                 }
             }
             
             return false;
         };
         
         //set public variables
         //cols is for ng-repeat to create the table
         Board.cols=[1,2,3,4,5,6,7];
         //rows is for ng-repeat to create the table
         Board.rows=[1,2,3,4,5,6];
         //initialize the game with no winner
         Board.hasWinner = false;
         
         Board.hotColumn = null;
         
         //an array of the images of a blank slot, a red piece, and a black piece
         Board.chips=["http://i.imgur.com/O1lQF0g.png","http://i.imgur.com/wtJT330.png", "http://i.imgur.com/NzuGMJn.png"];
         
         /*Board.matrix is an array of columns. each column is an array. The bottom of each column is index 0
         *so the bottom-left of the Connect Four board is Board.matrix[0][0]
         *the bottom right slot is Board.matrix[6][0]
         etc.*/
         Board.matrix=[];
         
         //initialize the board with all empty slots
         for(var i=0;i<7;i++){
             Board.matrix.push([0,0,0,0,0,0,0]);
         }
         
         /*function reset
         *@desc will set the Board back to all zeroes, set all slots to empty images, 
         * sets winner to false
         *clears border from having won the game
         *no return value
         */
         Board.reset = function(){
            Board.matrix=[];
         
            //initialize the board with all empty slots
            for(var i=0;i<7;i++){
                Board.matrix.push([0,0,0,0,0,0,0]);
            }
             
            for(var i=0; i<42; i++){
                $(".slots")[i].innerHTML= "<img class='chip' src="+"'"+Board.chips[0]+"' <='' td=''>";
            }
            Board.hasWinner = false;
             $(".slots").css("border-color", "white");
                             $(".slots").css("border-width", "1px");
                             $(".slots").css("border-style", "solid");
         };
         
         /*function addChip
         *@desc this function takes a column and the current player
         *it will add a game piece for the current player at the lowest available slot in the given column
         *no return value
         */
         Board.addChip = function(column, player){
             Board.hotColumn = column;
             var replaceIndex = Board.matrix[column].findIndex(empty);
             Board.hotRow = replaceIndex;
             Board.matrix[column][replaceIndex] = player;
             
             //the formula used here finds the correct DOM element based on its row and column
             $(".slots")[((6-replaceIndex)*7-1) - (6-column)].innerHTML= "<img class='chip' src="+"'"+Board.chips[player]+"' <='' td=''>";
             console.log($(".slots"));
             Board.checkVictory(column, replaceIndex);
             
         };
         
         Board.undo = function(){
             $(".slots")[((6-Board.hotRow)*7-1) - (6-Board.hotColumn)].innerHTML= "<img class='chip' src="+"'"+Board.chips[0]+"' <='' td=''>";
             Board.matrix[Board.hotColumn][Board.hotRow] = 0;
             Board.hotColumn = null;
                 
         }
         
         /*function checkVictory
         *@desc checks for consecutive matches on row, columns, and diagonals
         *return boolean
         */
         Board.checkVictory = function(column, row){
            
             var colWin = Board.checkColumn(column);
             var rowWin = Board.checkRow(row);
             var diagWin = Board.checkDiag(column, row);
             
             if (colWin || rowWin || diagWin){
                 Board.hasWinner = true;
             }
             
             //want to have a automatic board reset after the timer goes off here, but didn't work
             if (Board.hasWinner){
                 //setTimeout(function(){Board.reset()}, 8000);
            
             }
             
         };
         
         /*function checkColumn
         *@desc this uses the given column and checks for 4 consecutive pieces through checkConsec
         *return boolean
         */
         Board.checkColumn = function(column){
             var victoryColumn = Board.matrix[column];
             var win = checkConsec(victoryColumn);
             
             return win;
         };
         
         /*function checkRow
         *@desc creates a row by checking each column at the specified row height(0 would be bottom of game board) and checks for 4 consecutive pieces through checkConsec
         *return boolean
         */
         Board.checkRow = function(row){
             var victoryRow = [];
             
             for (var i =0;i<7;i++){
                 victoryRow.push(Board.matrix[i][row]);
             }
             var win = checkConsec(victoryRow);
             return win;
         };
         
         
         /*functino checkDiag
         *@desc creates two local variables which are arrays spanning from the top left to bottom right around the given slot
         *and the bottom left to top right around the given slot. items are only added to these arrays if the item at that matrix location is truthy
         *checks for a complete game through checkConsec
         *return boolean
         */
         Board.checkDiag = function(column, row){
             var NWtoSE = [Board.matrix[column][row]];
             var SWtoNE = [Board.matrix[column][row]];
             
             var win1 = false;
             var win2 = false;
             
             for(var i = 1; i<6; i++){
                 if(Board.matrix[column-i]){
                     if(Board.matrix[column-i][row+i] !=undefined){
                        NWtoSE.unshift(Board.matrix[column-i][row+i]);
                     }
                 }
                 
                 if(Board.matrix[column+i]){
                     if(Board.matrix[column+i][row-i] !=undefined){
                        NWtoSE.push(Board.matrix[column+i][row-i]);
                     }
                 }
                 
                 if(Board.matrix[column-i]){
                    if(Board.matrix[column-i][row-i] !=undefined){
                        SWtoNE.unshift(Board.matrix[column-i][row-i]);
                    }
                 }
                 
                 if(Board.matrix[column+i]){
                     if(Board.matrix[column+i][row+i] !=undefined){
                        SWtoNE.push(Board.matrix[column+i][row+i]);
                     }
                 }
                 
             }
             
            
             if(NWtoSE.length>=4){
                 win1 = checkConsec(NWtoSE);
             }
             if(SWtoNE.length>=4){
                 win2 = checkConsec(SWtoNE);
             }
             return win1 || win2;
                   
         };
         
         return Board;
     }
 
     angular
         .module('connect-four')
         .factory('Board', Board);
 })();