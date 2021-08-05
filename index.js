//setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//Fun part
var mouse = {
     x: undefined,
     y: undefined,
     alt: false
};

//settings
var circleCount = Math.round(innerHeight / 30);
var bouncyNess = true;

window.addEventListener('mousemove', function (event) {
     mouse.x = event.x;
     mouse.y = event.y;
     mouse.alt = event.altKey
});

window.addEventListener('resize', function () {
     canvas.height = window.innerHeight;
     canvas.width = window.innerWidth;
});

function Circle(x, y, dx, dy, radius) {
     this.bounce = 1;
     this.x = x;
     this.y = y;
     this.startX = x;
     this.startY = y;
     this.dx = dx;
     this.dy = dy;
     this.gravity = 0;
     this.radius = radius;
     this.color = `rgb(${Math.random() * 225 + 1}, ${Math.random() * 225 + 1}, ${Math.random() * 225 + 1})`;

     this.draw = function () {
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          c.fillStyle = this.color;
          c.fill();
          c.strokeStyle = this.color;
          c.stroke();
     };

     this.update = function () {
          //X Side bounce
          if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {

               //slowly reset x movement
               this.dx -= 0.1;

               //bounce
               this.dx = -this.dx;
          };

          //Y up-down bounce
          if (bouncyNess) {
               if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {

                    //this.dy = -this.dy;
                    this.gravity = -this.gravity;
                    //this.startY += 10;
               }
          };

          //TEST
          if (mouse.alt) {
               this.x = mouse.x;
               this.y = mouse.y;
          };

          //gravity increase
          if (this.y + this.radius > innerHeight + this.radius) {
               this.dy = 0;
               this.gravity = 0;
               this.y = innerHeight - this.radius;
               //console.log('end');
               this.bounce = 0;
          };

          if (this.bounce == 1) {
               this.gravity += 1;
               //console.log(this.gravity);
          };


          this.x += this.dx;
          //this.y += this.dy;

          //gravity
          this.y += this.gravity;

          this.draw();
     };
};

var circles = [];

for (var i = 0; i < circleCount + 1; i++) {

     var x = Math.round(Math.random() * (innerWidth - radius * 2) + radius);
     var y = Math.round(Math.random() * (innerHeight - radius * 2));
     var dx = Math.round((Math.random() - 0.5) * 10);
     var dy = Math.round((Math.random() - 0.5) * 10);
     var radius = Math.random() + 30;

     circles.push(new Circle(x, y, dx, dy, radius));
};

function animate() {
     requestAnimationFrame(animate);
     c.clearRect(0, 0, innerWidth, innerHeight);

     for (const circle of circles) {
          circle.update();
     }
};
console.log('Circle generated: ' + circleCount)
animate();