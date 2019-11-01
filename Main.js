class Drawer { //This class takes care of drawing objects to the screen
	constructor (context) {
		this.c = context;
		this.blackPiece = new FillDot(0, 0, "black", 8);
		this.whitePiece = new FillDot(0, 0, "#D3D3D3", 8);
	}
	
	drawSquare(square) {
		context.strokeRect(square.x, square.y, square.size, square.size);
	}
	
	drawBoard(board) {
		for (var i = 0; i < 3; i++) {
			this.drawSquare(board.boxes[i]);
		}
		
		var dot = 0;
		
		for (var i = 0; i < board.dots.length; i++) {
			dot = board.dots[i];
			this.drawDot(dot);
			if (dot.state == 1) {
				this.blackPiece.setPos(dot.x, dot.y);
				this.drawFillDot(this.blackPiece);
			}
			else if (dot.state == 2) {
				this.whitePiece.setPos(dot.x, dot.y);
				this.drawFillDot(this.whitePiece);
			}
		}
		
		for (var i = 0; i < board.lines.length; i++) {
			this.drawLine(board.lines[i]);
		}
	}
	
	drawLine(line) {
		this.c.beginPath();
		this.c.moveTo(line.x1, line.y1);
		this.c.lineTo(line.x2, line.y2);
		this.c.stroke();
	}
	
	drawDot(dot) {
		this.c.beginPath();
		this.c.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
		this.c.stroke();
	}
	
	drawFillDot(dot) {
		this.c.beginPath();
		this.c.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
		this.c.fillStyle = dot.color;
		this.c.fill();
	}
}

//BasicType classes
class Square {
	constructor (x,y,size) {
		this.x = x;
		this.y = y;
		this.size = size;
	}
	
	get halfSize() {
		return this.size / 2;
	}
	
	get midX() {
		return this.x + this.halfSize;
	}
	
	get midY() {
		return this.y + this.halfSize;
	}
	
	get right() {
		return this.x + this.size;
	}
	
	get bottom() {
		return this.y + this.size;
	}
}
			
class Dot {
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 2;
		this.state = 0;
	}
	
	setSize(size) {
		this.size = size;
	}
	
	setPos(x,y) {
		this.x = x;
		this.y = y;
	}
	
	setState(state) {
		this.state = state;
	}
}

class FillDot extends Dot {
	constructor(x,y, color, size) {
		super(x, y);
		this.setSize(size);
		this.color = color;
	}
}

class Line {
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
	}
}
//end BasicType classes

class Mouse {//Class that keeps track of mouse movement
	constructor(canvas) {
		this.canvas = canvas;
		this.x = 0;
		this.y = 0;
	}
	
	setMouse(evt) {
		var rect = this.canvas.getBoundingClientRect();
		this.x = evt.clientX - rect.left;
		this.y = evt.clientY - rect.top;
		//console.log(this.x + " " + this.y);
	}
	
	
}

class Board { //Class that holds the board's appearance and provides functionality allowing you to get which dot on the board was clicked
	constructor(canvas) {
		this.canvas = canvas;
		const w = canvas.offsetWidth;
		const h = canvas.offsetHeight;
		const midX = Math.round(w / 2);
		const midY = Math.round(h / 2);
		const box1Size = w * 0.8;
		const cFactor = box1Size / 8;
		
		this.boxes = [new Square(midX - (box1Size / 2), midY - (box1Size / 2), box1Size, box1Size)];
		this.boxes.push(new Square(this.boxes[0].x + cFactor, this.boxes[0].y + cFactor, this.boxes[0].size - (cFactor * 2)));
		this.boxes.push(new Square(this.boxes[1].x + cFactor, this.boxes[1].y + cFactor, this.boxes[1].size - (cFactor * 2)));
		var box = this.boxes;
						
		this.dots = [new Dot(box[0].x, box[0].y), new Dot(box[0].midX, box[0].y), new Dot(box[0].right, box[0].y),
					new Dot(box[1].x, box[1].y), new Dot(box[1].midX, box[1].y), new Dot(box[1].right, box[1].y),
					new Dot(box[2].x, box[2].y), new Dot(box[2].midX, box[2].y), new Dot(box[2].right, box[2].y),
					new Dot(box[0].x, box[0].midY), new Dot(box[1].x, box[1].midY), new Dot(box[2].x, box[2].midY),
					new Dot(box[2].right, box[2].midY), new Dot(box[1].right, box[1].midY), new Dot(box[0].right, box[0].midY),
					new Dot(box[2].x, box[2].bottom), new Dot(box[2].midX, box[2].bottom), new Dot(box[2].right, box[2].bottom),
					new Dot(box[1].x, box[1].bottom), new Dot(box[1].midX, box[1].bottom), new Dot(box[1].right, box[1].bottom),
					new Dot(box[0].x, box[0].bottom), new Dot(box[0].midX, box[0].bottom), new Dot(box[0].right, box[0].bottom)];
			
		var dots = this.dots;
		
		this.lines = [new Line(box[2].midX, box[2].y, box[0].midX, box[0].y), new Line(box[2].x, box[2].midY, box[0].x, box[0].midY),
						new Line(box[2].right, box[2].midY, box[0].right, box[0].midY), new Line(box[2].midX, box[2].bottom, box[0].midX, box[0].bottom)];
					
		
		this.rows = [];
		
		for (var i = 0; i < dots.length; i+=3) {
			this.rows.push([dots[i], dots[i+1], dots[i+2]]);
		}
		
		for (var i = 0; i < this.rows[4].length; i++) {
			this.rows[3].push(this.rows[4][i]);
		}
		
		this.rows.splice(4, 1);
		
		console.log(this.rows);
	}
	
}

class Game {
	constructor(board, canvas, drawer) {
		this.board = board;
		this.canvas = canvas;
		this.drawer = drawer;
		this.mouseX = 0;
		this.mouseY = 0;
		this.changeDetected = false;
		this.lastPiecePlayed = 0;
		
	}
	
	dotCoodAtMouse(){//Returns which dot was clicked as an (x,y) coordinate from this.rows[][] 2D array
		var hitbox = 10;
		var dot = 0;
		
		for (var x = 0; x < this.board.rows.length; x++) {
			for (var y = 0; y < this.board.rows[x].length; y++) {
				dot = this.board.rows[x][y];
				if (this.mouseX >= dot.x - hitbox && this.mouseX <= dot.x + hitbox && this.mouseY >= dot.y - hitbox && this.mouseY <= dot.y + hitbox) {
					console.log("Clicked " + dot.x + " " + dot.y + " at " + x + ", " + y);
					return [x, y];
				}
			}
		}
		return null;
	}
	
	dotIndexAtMouse() {//Returns which dot was clicked as an index to this.dots[]
		var hitbox = 10;
		var dot = 0;
		
		for (var i = 0; i < this.board.dots.length; i++) {
			dot = this.board.dots[i];
			if (this.mouseX >= dot.x - hitbox && this.mouseX <= dot.x + hitbox && this.mouseY >= dot.y - hitbox && this.mouseY <= dot.y + hitbox) {
				console.log("Clicked " + dot.x + " " + dot.y + " at " + i);
				return i;
			}
		}
		return null;
	}
	
	onClick(evt) { //TODO: This function is triggered whenever the user clicks on the board
	//TODO: This function will be the main functionality for this program; most things will happen in here
	//Most likely the game will be conditions checking the game state and reacting accordingly to if the user clicked a dot to play in
		const BLACK_PLACED = 1;
		const WHITE_PLACED = 2;
		const NONE_PLACED = 0;
		var state = 0;
		
		var rect = this.canvas.getBoundingClientRect();
		this.mouseX = evt.clientX - rect.left;
		this.mouseY = evt.clientY - rect.top;
		var dotCoods = this.dotCoodAtMouse(); //Use this to get the coordinate of the dot clicked; returns null if none clicked
		var dotIndex = this.dotIndexAtMouse(); //Use this to get the index of the dot clicked; returns null if none clicked
		
		if (dotIndex != null) {
			if (this.lastPiecePlayed == BLACK_PLACED) {
				state = WHITE_PLACED;
			}
			else {
				state = BLACK_PLACED;
			}
			
			this.board.dots[dotIndex].setState(state);
			this.lastPiecePlayed = state;
			this.changeDetected = true;
		}
		//console.log("Clicked " + this.mouseX + " " + this.mouseY);
	}
	
}

function updateGame(timestamp) {
	if (game.changeDetected) {
		console.log(game.changeDetected);
		game.drawer.drawBoard(game.board);
		game.changeDetected = false;
	}
	window.requestAnimationFrame(updateGame);
}

console.log("Hello");
const canvas = document.getElementById("c");
const context = canvas.getContext("2d");
const drawer = new Drawer(context);
const board = new Board(canvas);
var game = new Game(board, canvas, drawer);
drawer.drawBoard(board);
//canvas.addEventListener("mousemove", function(evt) {mouse.setMouse(evt);}, false);
canvas.addEventListener("click", function (evt) {game.onClick(evt);}, false);

window.requestAnimationFrame(updateGame);
