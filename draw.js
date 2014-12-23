'use strict';
var count = 0;
var draw = function (event, size, center) {
	var height, width, ctx, radius, newCenter, newSize, triangle = [];
	var buildTriangle = function (angle) {
		if (center === undefined) {
			var x = Math.cos(angle) * width / 2 + radius;
			var y = Math.sin(angle) * width / 2 + radius;
			triangle.push({
				x: x,
				y: y
			});
		} else {
			var x2 = Math.cos(angle) * size / 2 + center.x;
			var y2 = Math.sin(angle) * size / 2 + center.y;
			triangle.push({
				x: x2,
				y: y2
			});
		}
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
		var testPoint1 = triangle[0];
		var testPoint2 = triangle[1];
		var testPoint3 = triangle[2];
		var side1Length = Math.sqrt(Math.pow(testPoint2.x - testPoint1.x, 2) + Math.pow(testPoint2.y - testPoint1.y, 2));
		var side2Length = testPoint2.x - testPoint3.x;
		console.log('side lengths', side1Length, side2Length);
	};
	var drawSquare = function () {
		//l = b*h / (b+h) to get square side length
		var l, b, h;
		b = triangle[1].x - triangle[2].x;
		h = triangle[1].y - triangle[0].y;
		l = b * h / (b + h);
		//set points
		var leftX = triangle[0].x - l / 2;
		var rightX = leftX + l;
		var bottomY = triangle[1].y;
		var topY = triangle[1].y - l;
		ctx.beginPath();
		ctx.moveTo(leftX, bottomY);
		ctx.lineTo(leftX, topY);
		ctx.lineTo(rightX, topY);
		ctx.lineTo(rightX, bottomY);
		ctx.stroke();
		ctx.closePath();
		newCenter = {
			x: leftX + l / 2,
			y: bottomY - l / 2
		};
		newSize = l;
	};
	var drawCircle = function (x, y, radius) {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2, true); // Outer circle
		ctx.stroke();
		ctx.closePath();
	};
	var init = function () {
		radius = width / 2;
		triangle.push({
			x: center === undefined ? radius : center.x,
			y: center === undefined ? 0 : center.y - size / 2
		});
		if (center === undefined) {
			drawCircle(radius, radius, radius);
		} else {
			drawCircle(center.x, center.y, radius);
		}
		buildTriangle(145);
		if (center === undefined) {
			triangle.push({
				x: width - triangle[1].x,
				y: triangle[1].y
			});
		} else {
			triangle.push({
				x: center.x - (triangle[1].x - center.x),
				y: triangle[1].y
			});
		}
		drawTriangle();
		drawSquare();
	};

	var canvas = document.getElementById('drawer');
	ctx = canvas.getContext('2d');
	if (count === 0) {
		height = canvas.height;
		width = canvas.width;
	} else {
		height = size;
		width = size;
	}
	init();
	count++;
	if (count < 20) {
		draw(null, newSize, newCenter);
	}
};
window.onload = draw;