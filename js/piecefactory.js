// const INSERTX = 3;
// const INSERTY = 0;

// const colors = ["red","green","blue","yellow","orange","purple","brown"];
const shapeNames = ["square","ell","backwardsEll","ess","backwardsEss","line","mountain"];

const shapes = {
	"square": {
		'pos': [[0,4],[0,5],[1,4],[1,5]],
		'center': [0,4],
		'color': "green"
		},
	"ell": {
		'pos': [[0,4],[0,5],[0,6],[1,4]],
		'center': [0,4],
		'color': "red"
	},
	"backwardsEll": {
		'pos': [[0,4],[0,5],[0,6],[1,6]],
		'center': [0,6],
		'color': "purple"
		},
	"ess": {
		'pos': [[0,5],[0,6],[1,4],[1,5]],
		'center': [0,5],
		'color': "brown"
	},
	"backwardsEss": {
		'pos': [[0,4],[0,5],[1,5],[1,6]],
		'center': [0,5],
		'color': "yellow"
	},
	"line": {
		'pos': [[0,3],[0,4],[0,5],[0,6]],
		'center': [0,4],
		'color': "white"
		},
	"mountain": {
		'pos': [[0,5],[1,4],[1,5],[1,6]],
		'center': [1,5],
		'color': "orange"
		},
	
};
	
const getNewPiece = (shape) => {
	let temp = shapes[shape].pos;
	let position = [[0,0],[0,0],[0,0],[0,0]];
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 2; j++) {
			position[i][j] = temp[i][j];
		}
	}
	
	return {
		
		'pos': position,
		'center': [...shapes[shape].center],
		'color': shapes[shape].color
	};
}
	
export {shapeNames, shapes, getNewPiece};