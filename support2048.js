//��ǰ��Ļ����


function getPosTop(i,j){
	return 20+i*120;
}

function getPosLeft(i,j){
	return 20+j*120;
}


function getNumbercellbackground(number){
	switch(number){
		 case '厚磊': return "#eee4da";
		 case '震': return "#f2b179";
		 case '海龙': return "#ede0c8";
		 case '华子': return "#f59563";
		 case '张衡': return "#a6c";
		 case '姬才': return "#f67c5f";
		 case '牛牛': return "#f6a4dh";
		 case '秀灵': return "#eec455";
		 case '亮亮': return "#edcc61";
		 case '高高': return "#9c0";
		 case '茹茹': return "#09c";
		 case '': return "#93c";
	}
	
	return "black";
}

function getNumbercellcolor(number){
	if(number!='震'){
		return "#776e65";
	}
	return "white";
}


function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if( board[i][j]===0)
			return false;
		}
	}
	return true;
}

function nomove(board){
	if(canMovedown(board)|| canMoveleft(board)||
	canMoveright(board)||canMovetop(board))
		return false;
	return true;
}

//
function canMoveright(board){
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--)
		if(board[i][j] != 0)
			if( board[i][j+1]==0 || board[i][j]==board[i][j+1])
			  return true;	
	return false;
}

function canMoveleft(board){
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++)
		if(board[i][j] != 0)
			if( board[i][j-1]==0 || board[i][j]==board[i][j-1])
			  return true;	
	return false;
}

function canMovetop(board){
	for(var col=0;col<4;col++)
		for(var row=1;row<4;row++)
			if(board[row][col]!=0){
				if(board[row-1][col]==0||board[row-1][col]==board[row][col])
				return true;
			}
	return false;
}

function canMovedown(board){
	for(var col=0;col<4;col++)
		for(var row=2;row>=0;row--)
			if(board[row][col]!=0){
				if(board[row+1][col]==0|| board[row][col]==board[row+1][col])
				return true;
			}

	return false;
}
//ע��col1��col2��˳��
function noBlockhorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++)
		if(board[row][i]!=0)
			return false;

	return true;
}

function noBlockvertical(column,row1,row2,board){
	for(var i=row1+1;i<row2;i++)
		if(board[i][column]!=0)
			return false;
	
	return true;
}

function transfer(number){
	switch(number){
		 case '厚磊': return "震";
		 case '震': return "海龙";
		 case '海龙': return "华子";
		 case '华子': return "张衡";
		 case '张衡': return "姬才";
		 case '姬才': return "牛牛";
		 case '牛牛': return "秀灵";
		 case '秀灵': return "亮亮";
		 case '亮亮': return "高高";
		 case '高高': return "茹茹";
		 case '茹茹': return "";
		 case '': return "#09c";
		 case '': return "#93c";
	}
}

function transferscore(number){
	switch(number){
	 case '厚磊': return 2;
		 case '震': return 4;
		 case '海龙': return 8;
		 case '华子': return 16;
		 case '张衡': return 32;
		 case '姬才': return 64;
		 case '牛牛': return 128;
		 case '秀灵': return 256;
		 case '亮亮': return 512;
		 case '高高': return 1024;
		 case '茹茹': return 2048;
		 case '': return "#09c";
		 case '': return "#93c";
	}
}
