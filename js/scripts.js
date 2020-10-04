const gameArea = document.getElementById("game-area");
const grids = []

//initial setup function
window.onload = () => {
	for (let i = 0; i < 20; i++) {
		grids.push([]);
		for (let j = 0; j < 10; j++) {
			let gamePiece = document.createElement("div", { class: "gamepiece" });
			gamePiece.style.backgroundColor = "black";
			gamePiece.style.color = "white";
			grids[i].push(gamePiece);
			gameArea.append(gamePiece);
		}
	}

}

const isValidP = (i, j) => {
	return i >= 0 && i < 20 && j >= 0 && j < 10 && grids[i][j].style.backgroundColor === "black";
}

const isValid = (piece) => {
	for (let i = 0; i < piece.pos.length; i++) {
		if(!isValidP(piece.pos[i][0], piece.pos[i][1])) return false;
	}
	return true;
}

//moves a piece in a direction indicated by dX and dY
const movePiece = (piece, dx, dy) => {
	colorPiece(piece.pos, "black");
	piece.move(dx,dy);
	const canMove = isValid(piece);
	if(!canMove) piece.move(-dx,-dy);
	colorPiece(piece.pos, piece.color);
	return canMove;
}

//rotates a piece clockwise or counterclockwise
const rotatePiece = (piece, dir) => {
	colorPiece(piece.pos, "black");
	//create copy piece and rotate it to determine if rotation can be done
	let initialPos = [[...piece.pos[0]], [...piece.pos[1]], [...piece.pos[2]], [...piece.pos[3]]];
	let testPiece = new Piece(piece.name, initialPos, piece.color);
	testPiece.rotate(dir);
	if (isValid(testPiece)) {
		piece.rotate(dir);
	}
	colorPiece(piece.pos, piece.color);
}

//colors coordinates contained in piece the color in color
const colorPiece = (piece, color) => {
	for (let i = 0; i < piece.length; i++) {
		grids[piece[i][0]][piece[i][1]].style.backgroundColor = color;
	}
}

const getLines = () => {
	let lines = [];
	for (let i = 19; i >= 0; i--) {
		let addLine = true;
		for (let j = 0; j < 10; j++) {
			addLine &= grids[i][j].style.backgroundColor != "black";
		}
		if (addLine) lines.push(i);
	}
	return lines;
}

const clearLines = lines => {
	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < 10; j++) {
			grids[lines[i]][j].style.backgroundColor = "black";
		}
	}
}

const dropLines = lines => {
	let dist = 0;
	let ind = 0;
	for (let i = 19; i >= 0; i--) {
		if (lines[ind] === i) {
			dist++;
			ind++;
		}
		else if(dist != 0) {
			for (let j = 0; j < 10; j++) {
				grids[i + dist][j].style.backgroundColor = grids[i][j].style.backgroundColor;
				grids[i][j].style.backgroundColor = "black";
			}
		}
	}
}

document.getElementById("startBtn").addEventListener("click", () => {
	start(40);
})

//main game loop
function start(r) {
	let counter = 0;
	const RATE = r;
	let run = true;

	let piece = getNewPiece();
	colorPiece(piece.pos, piece.color);
	function main() {
		if (run) {
			window.requestAnimationFrame(main);
		}

		if (counter === RATE) {
			if (!movePiece(piece, 1, 0)) {
				let lines = getLines();
				if (lines.length > 0) {
					clearLines(lines);
					dropLines(lines);
				}
				piece = getNewPiece();

				colorPiece(piece.pos, piece.color);
			}
			counter = 0;
		}
		counter++;
	}

	const pause = () => {
		run = !run;
		if (run) main();
	}

	window.addEventListener("keydown", (e) => {
		if (piece === null) return;
		if (e.code === "ArrowLeft") movePiece(piece, 0, -1);
		if (e.code === "KeyZ") rotatePiece(piece, 'CCW');
		if (e.code === "KeyX") rotatePiece(piece, 'CW');
		if (e.code === "ArrowUp") rotatePiece(piece, 'CW');
		if (e.code === "ArrowRight") movePiece(piece, 0, 1);
		if (e.code === "ArrowDown") movePiece(piece, 1, 0);
		if (e.code === "Escape") pause();
	})

	document.getElementById("pauseBtn").addEventListener("click", () => {
		pause();
		document.getElementById("pauseBtn").disabled = true;
		setTimeout(() => {
			document.getElementById("pauseBtn").disabled = false;
		}, 300);
	})

	main();
};