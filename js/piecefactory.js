class Piece {
	constructor(n, p, c) {
		this.pos = p;
		this.name = n;
		this.color = c;
	}

	center() {
		let xTot = 0, yTot = 0;
		for (let i = 0; i < this.pos.length; i++) {
			xTot += this.pos[i][0];
			yTot += this.pos[i][1];
		}
		return [Math.round(xTot / this.pos.length), Math.round(yTot / this.pos.length)]
	}


	move(dX = 0, dY = 0) {
		for (let i = 0; i < this.pos.length; i++) {
			this.pos[i][0] += dX;
			this.pos[i][1] += dY;
		}
	}

	rotate(direction) {
		
		const rot = direction === "CW" ? [[0, -1], [1, 0]] : [[0,1],[-1,0]];
		const center = this.center();
		for (let i = 0; i < this.pos.length; i++) {
			const xp = this.pos[i][0] - center[0];
			const yp = this.pos[i][1] - center[1];
			this.pos[i][0] = (xp * rot[0][0] + yp * rot[1][0]) + center[0];
			this.pos[i][1] = (xp * rot[0][1] + yp * rot[1][1]) + center[1];
		}
		console.log(JSON.stringify(this.pos));
	}

	getExtremity(orientation) {
		let xMax = -Infinity, yMax = -Infinity, yMin = Infinity;
		for (let i = 0; i < this.pos.length; i++) {
			xMax = this.pos[i][0] > xMax ? this.pos[i][0] : xMax;
			yMax = this.pos[i][1] > yMax ? this.pos[i][1] : yMax;
			yMin = this.pos[i][1] < yMin ? this.pos[i][1] : yMin;
		}
		switch (orientation) {
			case "left":
				return yMin;
			case "right":
				return yMax;
			case "bottom":
				return xMax;
			default:
				return -1;
		}

	}
}

const shapes = [
	{
		name: "square",
		pos: [[0, 4], [0, 5], [1, 4], [1, 5]],
		color: "green"
	},
	{
		name: "ell",
		pos: [[0, 4], [0, 5], [0, 6], [1, 4]],
		color: "red"
	},
	{
		name: "backwardsEll",
		pos: [[0, 4], [0, 5], [0, 6], [1, 6]],
		color: "purple"
	},
	{
		name: "ess",
		pos: [[0, 5], [0, 6], [1, 4], [1, 5]],
		color: "brown"
	},
	{
		name: "backwardsEss",
		pos: [[0, 4], [0, 5], [1, 5], [1, 6]],
		color: "yellow"
	},
	{
		name: "line",
		pos: [[0, 3], [0, 4], [0, 5], [0, 6]],
		color: "white"
	},
	{
		name: "mountain",
		pos: [[0, 5], [1, 4], [1, 5], [1, 6]],
		color: "orange"
	},

];

const getNewPiece = () => {
	const i = Math.floor(Math.random() * shapes.length);
	const initialPos = [[...shapes[i].pos[0]],[...shapes[i].pos[1]],[...shapes[i].pos[2]],[...shapes[i].pos[3]]];
	return new Piece(shapes[i].name, initialPos, shapes[i].color);
}