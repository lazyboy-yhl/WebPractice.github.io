function showNumberwithanimation(i,j,number){
	var numberCell=$('#number-cell-'+i+'-'+j);
	
	numberCell.css("background-color",getNumbercellbackground(board[i][j]));
	numberCell.css("color",getNumbercellcolor(board[i][j]));
	numberCell.text(number);
	
	
	numberCell.animate({
		height:'100px',
		width:'100px',
	
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);

}

function showMoveanimation(sourceX,sourceY,desX,desY){
	var numberCell=$('#number-cell-'+sourceX+'-'+sourceY);
	numberCell.animate({
		top:getPosTop(desX,desY),
		left:getPosLeft(desX,desY)
	},200);
}

function updateScore(score){
	$("#score").text(score);
}