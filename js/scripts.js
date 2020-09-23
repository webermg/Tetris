
import {shapeNames, shapes, getNewPiece} from './piecefactory.js';

let gameArea = document.getElementById("game-area");


const grids =[]


const init =  () => {
	for(let i = 0; i < 20; i++) {
		grids.push([]);
		for(let j = 0; j < 10; j++) {
			let gamePiece = document.createElement("div",{class:"gamepiece"});
			gamePiece.style.backgroundColor = "black";
			grids[i].push(gamePiece);
			gameArea.appendChild(gamePiece);
		}
	}
	
}

init();

const movePiece = (piece, dX, dY) => {
	for(let i = 0; i < piece.length; i++) {
		piece[i][0]+=dX;
		piece[i][1]+=dY;
	}
}

const colorPiece = (piece, color) => {
	for(let i = 0; i < piece.length; i++) {
		grids[piece[i][0]][piece[i][1]].style.backgroundColor = color;
	}
}
	

//main game loop
;(function() {
	let counter = 0;
	const RATE = 10;
	let run = true;
	//temp
	let piece = getNewPiece(shapeNames[Math.floor(Math.random() * shapeNames.length)]);
	
	function main() {
		if(run) {
			window.requestAnimationFrame(main);
		}
		
		//loop stuff
		if(counter === RATE) {
			if(piece) {
				colorPiece(piece.pos, "black");
				movePiece(piece.pos,1,0);
				console.log(piece.color + ", " + piece.pos);
				colorPiece(piece.pos, piece.color);
				if(piece.pos[0][0] === 19 || piece.pos[1][0] === 19 || piece.pos[2][0] === 19 || piece.pos[3][0] === 19) {
					console.log("new");
					piece = null;
				}
			}
			else {
				let name = shapeNames[Math.floor(Math.random() * shapeNames.length)];
				piece = getNewPiece(name);
				console.log(piece.color + ", " + piece.pos);
			}
			counter=0;
		}
		counter++;
	}
	
	main();
})();