// Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Fun part
var mouse = {
     x: undefined,
     y: undefined,
     alt: false
};

// Settings
const circleCount = 1; //Math.round(innerHeight / 30);

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
     this.bounce = true;
     this.x = x;
     this.y = y;
     //this.startX = x;
     //this.startY = y;
     this.dx = dx;
     this.dy = dy;
     this.gravity = .981;
     this.weight = 0; // 0 - Normal; 1 - Extra heavy
     this.radius = radius;
     this.color = `rgb(${Math.random() * 225 + 1}, ${Math.random() * 225 + 1}, ${Math.random() * 225 + 1})`;

     this.gravity += this.weight;

     this.draw = function () {
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          c.fillStyle = this.color;
          c.fill();
          c.strokeStyle = this.color;
          c.stroke();
     }

     this.update = function () {
          // X Side bounce
          if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {

               // Slowly decrease x movement
               //this.dx -= 0.5;

               // Bounce
               this.dx = -this.dx;
          }

          // Y up-down bounce
          if (this.bounce) {
               
               if (this.y + this.radius > innerHeight /*|| this.y - this.radius < 0*/) {

                    // Sinking
                    if(this.dy > 0){
                         this.gravity += this.weight;
                         this.dy = -this.dy;
                    }else {
                         this.dy = 0;
                         this.bounce = false;
                    }
               }
          }

          // Check needed to check changes in previous if>if>if-else (this.bounce = false)
          if (this.bounce)
               this.dy += this.gravity;

          // TEST
          /*if (mouse.alt) {
               this.x = mouse.x;
               this.y = mouse.y;
          }*/

          this.x += this.dx;
          this.y += this.dy;

          this.draw();
     }
};

var circles = [];

for (var i = 0; i < circleCount; i++) {
     var radius = 30;
     circles.push(new Circle(
          Math.round(Math.random() * (innerWidth - radius * 2) + radius),
          Math.round(Math.random() * (innerHeight - radius * 2)),
          Math.round((Math.random() - 0.5) * 10),
          Math.round((Math.random() - 0.5) * 10),
          radius
     ));
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