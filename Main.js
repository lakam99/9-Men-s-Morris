class Drawer {
	constructor (context) {
		this.c = context;
	}
	
	drawSquare(square) {
		context.strokeRect(square.x, square.y, square.size, square.size);
	}
	
	drawBoard(board) {
		for (var i = 0; i < 3; i++) {
			this.drawSquare(board.boxes[i]);
		}
		
		for (var i = 0; i < board.dots.length; i++) {
			this.drawDot(board.dots[i]);
		}
	}
	
	drawLine(x1, y1, x2, y2) {
		this.c.beginPath();
		this.c.moveTo(x1, y1);
		this.c.lineTo(x2, y2);
		this.c.stroke();
	}
	
	drawDot(dot) {
		this.c.beginPath();
		this.c.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
		this.c.stroke();
	}
}

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
}

class Board {
	constructor(screenWidth, screenHeight) {
		const w = screenWidth;
		const h = screenHeight;
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
	}
}



console.log("Hello");
const canvas = document.getElementById("c");
const context = canvas.getContext("2d");
const drawer = new Drawer(context);
const w = canvas.offsetWidth;
const h = canvas.offsetHeight;
const board = new Board(w, h);
drawer.drawBoard(board);
