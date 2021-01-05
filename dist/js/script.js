function Figure(x, y, color, opacity = 1) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.opacity = opacity;

	this.draw = function () {};
}

function Line(x, y, x2, y2, color, opacity) {
	Figure.call(this, x, y, color);
	this.x2 = x2;
	this.y2 = y2;

	this.draw = function (ctx) {
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y); //передвигаем перо
		ctx.lineTo(this.x2, this.y2); //рисуем линию
		ctx.stroke();
	};
}

function Zigzag(x, y, x2, y2, color, opacity, step) {
	Figure.call(this, x, y, color);
	this.x2 = x2;
	this.y2 = y2;
	this.step = step;

	this.draw = function (ctx) {
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		let counter = 0;

		while (this.x2 <= 700) {
			ctx.moveTo(this.x, this.y); //передвигаем перо
			ctx.lineTo(this.x2, this.y2); //рисуем линию

			if (counter % 2 == 0) {
				this.y += step;
				this.y2 -= step;
			} else {
				this.y -= step;
				this.y2 += step;
			}
			this.x += step;
			this.x2 += step;
			counter += 1;
		}
		ctx.stroke();
	};
}

function Rect(x, y, width, height, color, opacity) {
	Figure.call(this, x, y, color, opacity);
	this.width = width;
	this.height = height;

	this.draw = function (ctx) {
		ctx.fillStyle = this.color;
		ctx.globalAlpha = this.opacity;
		ctx.fillRect(this.x, this.y, this.width, this.height); //передвигаем перо
	};
}

function Circle(x, y, radius, color, opacity) {
	Figure.call(this, x, y, color, opacity);
	this.radius = radius;

	this.draw = function (ctx) {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.globalAlpha = this.opacity;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 12); //2 * Math.PI
		ctx.stroke();
		ctx.fill();
	};
}

function Canvas(canvasId) {
	let canvas = document.getElementById(canvasId);
	let ctx = canvas.getContext("2d");

	this.add = function (...rest) {
		for (let obj of rest) {
			if (obj instanceof Line) {
				obj.draw(ctx);
			} else if (obj instanceof Rect) {
				obj.draw(ctx);
			} else if (obj instanceof Circle) {
				obj.draw(ctx);
			} else if (obj instanceof Zigzag) {
				obj.draw(ctx);
			}
		}
	};
}

let line1 = new Line(50, 250, 200, 200, "gray");
let line2 = new Line(50, 230, 200, 180, "gray");

let zigzag = new Zigzag(0, 0, 20, 20, "black", 1, 20);

let rect1 = new Rect(260, 130, 60, 120, "green", 0.3);
let rect2 = new Rect(280, 110, 120, 60, "purple", 0.3);
let rect3 = new Rect(380, 150, 80, 60, "yellow", 0.3);

let circle1 = new Circle(120, 120, 50, "blue", 0.3);
let circle2 = new Circle(100, 70, 30, "blue", 0.3);

let drawArea = new Canvas("canvas2D");
drawArea.add(line1, line2, zigzag, rect1, rect2, rect3, circle1, circle2);

// Дано число. Сложите его цифры. Если сумма получилась более 9-ти, опять сложите его цифры. И так, пока сумма не станет однозначным числом (9 и менее).
// Решить через рекурсию
let int = 16;

function sum(int) {
	let result = 0;
	if (int >= 1) {
		result = Math.trunc(int % 10);
		int = int / 10;
		result += sum(int);

		if (result > 9) {
			result = sum(result);
		}
	}
	return result;
}
console.log(sum(int));
