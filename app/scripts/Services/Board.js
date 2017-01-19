 (function() {
     function Board() {
         var Board = {};
        
         
         
         /*function empty
         @desc this function will help us find the index of the first non-empty slot in any column
         *returns boolean
         */
         var empty = function(element){
             return element === 0;
         };
         
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
         
         Board.cols=[1,2,3,4,5,6,7];
         Board.rows=[1,2,3,4,5,6];
         Board.hasWinner = false;
         Board.chips=["http://i.imgur.com/O1lQF0g.png","http://i.imgur.com/wtJT330.png", "http://i.imgur.com/NzuGMJn.png"];
         Board.matrix=[];
         
         //initialize the board with all empty slots
         for(var i=0;i<7;i++){
             Board.matrix.push([0,0,0,0,0,0,0]);
         }
         
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
         
         
         Board.addChip = function(column, player){

             var replaceIndex = Board.matrix[column].findIndex(empty);
             Board.matrix[column][replaceIndex] = player;
             
             $(".slots")[((6-replaceIndex)*7-1) - (6-column)].innerHTML= "<img class='chip' src="+"'"+Board.chips[player]+"' <='' td=''>";
             Board.checkVictory(column, replaceIndex);
             
         };
         
         Board.checkVictory = function(column, row){
            
             var colWin = Board.checkColumn(column);
             var rowWin = Board.checkRow(row);
             var diagWin = Board.checkDiag(column, row);
             
             if (colWin || rowWin || diagWin){
                 Board.hasWinner = true;
             }
             
             if (Board.hasWinner){
                 //setTimeout(Board.reset(), 3000);
            
             }
             
         };
         
         Board.checkColumn = function(column){
             var victoryColumn = Board.matrix[column];
             var win = checkConsec(victoryColumn);
             
             return win;
         };
         
         Board.checkRow = function(row){
             var victoryRow = [];
             
             for (var i =0;i<7;i++){
                 victoryRow.push(Board.matrix[i][row]);
             }
             var win = checkConsec(victoryRow);
             return win;
         };
         
         Board.checkDiag = function(column, row){
             var NWtoSE = [Board.matrix[column][row]];
             var SWtoNE = [Board.matrix[column][row]];
             
             var win1 = false;
             var win2 = false;
             
             for(var i = 1; i<6; i++){
                 if(Board.matrix[column-i]){
                     if(Board.matrix[column-i][row+i]){
                        NWtoSE.unshift(Board.matrix[column-i][row+i]);
                     }
                 }
                 
                 if(Board.matrix[column+i]){
                     if(Board.matrix[column+i][row-i]){
                        NWtoSE.push(Board.matrix[column+i][row-i]);
                     }
                 }
                 
                 if(Board.matrix[column-i]){
                    if(Board.matrix[column-i][row-i]){
                        SWtoNE.unshift(Board.matrix[column-i][row-i]);
                    }
                 }
                 
                 if(Board.matrix[column+i]){
                     if(Board.matrix[column+i][row+i]){
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