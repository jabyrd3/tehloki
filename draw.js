'use strict';
var height, width, ctx, radius, triangle = [];
var buildTriangle = function (angle) {
	var x = Math.cos(angle) * width / 2 + radius;
	var y = Math.sin(angle) * width / 2 + radius;
	triangle.push({
		x: x,
		y: y
	});
};
var drawTriangle = function () {
	for (var i = 0; i < triangle.length; i++) {
		var point1 = triangle[i];
		var point2 = triangle[i + 1];
		ctx.beginPath();
		ctx.moveTo(point1.x, point1.y);
		if (point2 !== undefined) {
			ctx.lineTo(point2.x, point2.y);
		} else {
			ctx.lineTo(triangle[0].x, triangle[0].y);
		}
		ctx.stroke();
		ctx.closePath();
	}
};
var drawSquare = function () {
	//l = b*h / (b+h)
	var l, b, h;
	b = triangle[1].x - triangle[2].x;
	h = triangle[1].y;
	l = b * h / (b + h);
	var leftX = triangle[0].x - l / 2;
	var rightX = leftX + l;
	var bottomY = triangle[1].y;
	var topY = triangle[1].y - l;
	console.log(l, leftX, rightX, bottomY, topY);
	console.log(triangle);
	ctx.beginPath();
	ctx.moveTo(leftX, bottomY);
	ctx.lineTo(leftX, topY);
	ctx.lineTo(rightX, topY);
	ctx.lineTo(rightX, bottomY);
	ctx.stroke();
	ctx.closePath();
};
var drawCircle = function (x, y, radius) {
	console.log(x, y, radius);
	ctx.arc(x, y, radius, 0, Math.PI * 2, true); // Outer circle
	ctx.stroke();
};
var draw = function () {
	console.log(width, height);
	drawCircle(radius, radius, radius);
	buildTriangle(120);
	triangle.push({
		x: width - triangle[1].x,
		y: triangle[1].y
	});
	console.log(triangle);
	drawTriangle();
	drawSquare();
};
var setup2 = function () {
	var canvas = document.getElementById('drawer');
	ctx = canvas.getContext('2d');
	height = canvas.height;
	width = canvas.width;
	radius = width / 2;
	triangle.push({
		x: radius,
		y: 0
	});
	draw();
};
window.onload = setup2;