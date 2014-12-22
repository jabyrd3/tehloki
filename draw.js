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
    }
};
var draw = function () {
    console.log(width, height);
    ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2, true); // Outer circle
    ctx.stroke();
    buildTriangle(120);
    triangle.push({
        x: width - triangle[1].x,
        y: triangle[1].y
    });
    console.log(triangle);
    drawTriangle();
};
var setup = function () {
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
window.onload = setup;
