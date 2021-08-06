// Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var mouse = {
     x: undefined,
     y: undefined,
     alt: false
};

window.addEventListener('mousemove', function (event) {
     mouse.x = event.x;
     mouse.y = event.y;
     mouse.alt = event.altKey
});

window.addEventListener('resize', function () {
     canvas.height = window.innerHeight;
     canvas.width = window.innerWidth;
});