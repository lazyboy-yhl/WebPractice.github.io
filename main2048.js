var board=new Array();
var crashFlag=new Array();
var score=0;

$("document").ready(function(){
	newGame();
	
});

function newGame(){
    init();
	generateOneNumber(board);
	generateOneNumber(board);

}

function init(){
	

   for(var i=0;i<4;i++){
	  

	  crashFlag[i]=new Array();
      board[i]=new Array();
	  for(var j=0;j<4;j++){
		var gridcell=$("#grid-cell-"+i+"-"+j);
		gridcell.css("top",getPosTop(i,j));
		gridcell.css("left",getPosLeft(i,j));
		board[i][j]=0;
		crashFlag[i][j]=false;
	  }
	 }
	
	updateBoardview();
	 
}

function generateOneNumber(board){
	if(nospace(board))
		return false;

	var randx= Math.floor( Math.random()  * 4 ) ;
	var randy=parseInt( Math.floor( Math.random()  * 4 ) );
	var count=0;
	

	while(count<100){
		if(board[randx][randy]==0)
			break;
			
	var randx=parseInt( Math.floor( Math.random()  * 4 ) );
	var randy=parseInt( Math.floor( Math.random()  * 4 ) );
	count++;
	}
	if(count==60){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++){
			   if(board[i][j]==0){
			   randx=i;
			   randy=j;
			   }
			}
	
	}
	


	var number= Math.random()< 0.5? '震':'厚磊';
	board[randx][randy]=number;
	
	showNumberwithanimation(randx,randy,number);
	return true;
}


$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
		 if(moveLeft()){
			setTimeout("generateOneNumber(board)",210);
			setTimeout("isGameover()",300);
		}
		break;
		
	    case 38:  //up
			if(moveUp()){
			setTimeout("generateOneNumber(board)",210);
			setTimeout("isGameover()",300);
			}
		break;
		case 39:  //right
			if(moveRight()){
			setTimeout("generateOneNumber(board)",210);
			setTimeout("isGameover()",300);
			}
		break;
		case 40:  //down
			if(moveDown()){
			setTimeout("generateOneNumber(board)",210);
			setTimeout("isGameover()",300);
			}
		break;
		
		default:
		//do nothing
		break;
	}

});

function updateBoardview(){
	$(".number-cell").remove();
	
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
		    var numberCell=$('#number-cell-'+i+'-'+j);
			
			if(board[i][j]==0){
				numberCell.css("width","0px");
				numberCell.css("height","0px");
				numberCell.css("left",getPosLeft(i,j)+50);
				numberCell.css("top",getPosTop(i,j)+50);
				
			}else{
			    numberCell.css("width","100px");
				numberCell.css("height","100px");
				numberCell.css("top",getPosTop(i,j));
				numberCell.css("left",getPosLeft(i,j));
				numberCell.css("background-color",getNumbercellbackground(board[i][j]));
				numberCell.css("color",getNumbercellcolor(board[i][j]));
				numberCell.text(board[i][j]);
			}
			crashFlag[i][j]=false;
		}
	}
}


function moveLeft(){
	if(!canMoveleft(board))
		return false;
	
	//moveLeft
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if((board[i][k]==0) && noBlockhorizontal(i,k,j,board)){
					//moveAbove
					
		
					showMoveanimation(i,j,i,k);
					board[i][k]=board[i][j];
					board[i][j]=0;
					
					continue;
					}else if(board[i][k]==board[i][j] && noBlockhorizontal(i,k,j,board) && !crashFlag[i][k]){
					
						//move
						showMoveanimation(i,j,i,k);
						board[i][k]=transfer(board[i][j]);
						
						score+=transferscore(board[i][k]);
						crashFlag[i][k]=true;
						updateScore(score);
						
						board[i][j]=0;
						//sum
					continue;
					}
				}
			}
		}
		setTimeout("updateBoardview()",200);
		return true;
}

//
function moveRight(){
	if(!canMoveright(board))
		return false;

	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
		
			if(board[i][j]!=0){
			
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockhorizontal(i,j,k,board)){
						showMoveanimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlockhorizontal(i,j,k,board )&& !crashFlag[i][k]){
						showMoveanimation(i,j,i,k);
						board[i][k]=transfer(board[i][j]);
						score+=transferscore(board[i][k]);
						
						crashFlag[i][k]=true;
						updateScore(score);
						board[i][j]=0;
						
						continue;
					}
				}
			}
		}
			setTimeout("updateBoardview()",200);
			return true;
}

function moveUp(){
	
	if(!canMovetop(board))
		return false;
	for(var j=0;j<4;j++)
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++)
				
					if(board[k][j]==0 && noBlockvertical(j,k,i,board)){
						showMoveanimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						
						continue;
					}else if(board[k][j]==board[i][j] && noBlockvertical(j,k,i,board) && !crashFlag[k][j]){
						showMoveanimation(i,j,k,j);
						board[k][j]=transfer(board[i][j]);;
						score+=transferscore(board[k][j]);
						crashFlag[k][j]=true;
						updateScore(score);
						board[i][j]=0;
						continue;
					}
			}
		}
	setTimeout("updateBoardview()",200);
	return true;
}

function moveDown(){
	if(!canMovedown(board))
		return false;

	for(var j=0;j<4;j++)
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
				if(board[k][j]==0 && noBlockvertical(j,i,k,board)){
					showMoveanimation(i,j,k,j);
					board[k][j]=board[i][j];
					board[i][j]=0;
					continue;
				}else if(board[k][j]==board[i][j]&& noBlockvertical(j,i,k,board) && !crashFlag[k][j]){
					showMoveanimation(i,j,k,j);
					board[k][j]=transfer(board[i][j]);
					
					score+=transferscore(board[k][j]);
					crashFlag[k][j]=true;
					updateScore(score);
					board[i][j]=0;
					
					continue;
					}	
				}
			}
		}	
	setTimeout("updateBoardview()",200);
	return true;
}
function isGameover(){
	if(nomove(board))
	alert("Gameover");
}