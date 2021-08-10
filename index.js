// Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

/*var mouse = {
     x: undefined,
     y: undefined,
     alt: false
};*/

// Settings
var circlePerFrame = 1;
var emitterLocation = {
     x: 500,
     y: 100
};

window.addEventListener('click', function (event) {
     emitterLocation.x = event.x;
     emitterLocation.y = event.y;
     //mouse.alt = event.altKey
});

window.addEventListener('resize', function () {
     canvas.height = window.innerHeight;
     canvas.width = window.innerWidth;
});

function Circle(x, y, dx, dy, radius, lifetime) {
     this.bounce = true;
     this.x = x;
     this.y = y;
     //this.startX = x;
     //this.startY = y;
     this.dx = dx;
     this.dy = dy;
     this.gravity = .981;
     this.weight = 1; // 1 - Normal; 0 - Weightless; -1 - Minus Weight
     this.radius = radius;
     this.lifetime = lifetime * 60;
     this.color = `rgb(${Math.random() * 225 + 1}, ${Math.random() * 225 + 1}, ${Math.random() * 225 + 1})`;

     this.gravity *= this.weight;

     this.draw = function () {
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          c.globalAlpha = this.lifetime / (lifetime * 60);
          c.fillStyle = this.color;
          c.fill();
          //c.strokeStyle = this.color;
          //c.stroke();
     }

     this.update = function () {
          if (this.lifetime)
               this.lifetime--;

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
                    if (this.dy > 0) {
                         this.gravity += this.weight;
                         this.dy = -this.dy;
                    } else {
                         this.dy = 0;
                         this.bounce = false;
                    }
               }
          }

          // Check needed to check changes in previous if>if>if-else (this.bounce = false)
          if (this.bounce)
               this.dy += this.gravity;

          this.x += this.dx;
          this.y += this.dy;

          this.draw();
     }
};

var circles = [];

function animate() {
     requestAnimationFrame(animate);
     c.clearRect(0, 0, innerWidth, innerHeight);

     for (var i = 0; i < circlePerFrame; i++) {
          var radius = 10;
          circles.push(new Circle(
               emitterLocation.x,
               emitterLocation.y,
               Math.round((Math.random() - 0.5) * 10),
               Math.round((Math.random() - 0.5) * 10),
               radius,
               .6
          ));
     };

     c.beginPath();
     c.arc(emitterLocation.x, emitterLocation.y, 30, 0, Math.PI * 2, false);
     c.fillStyle = "white";
     c.fill();

     //c.globalCompositeOperation = "lighten";

     for (var i = 0; i < circles.length; i++)
          if (circles[i].lifetime == 0)
               circles.splice(i, 1);
          else
               circles[i].update();
};
//console.log('Circle generated: ' + circlePerFrame);
animate();