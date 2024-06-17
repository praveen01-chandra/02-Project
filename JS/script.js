const bounseBall = document.getElementById("bounseBall");
const context = bounseBall.getContext("2d");
let height = window.innerHeight;
let width = window.innerWidth;

bounseBall.height = height;
bounseBall.width = width;

let mouseX = 0;
let mouseY = 0;

addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
});

const grav = 0.99;
context.lineWidth = 5;

// Ball color Decide Randomly
function randomColor() {
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) / 9 +
        ")"
    );
}

function Ball() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (width - this.radius * 2) + this.radius;
    this.y = Math.random() * (height - this.radius);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.val = Math.random() / 5;
    this.update = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    };
}

const balls = [];
for (let i = 0; i < 130; i++) {
    balls.push(new Ball());
}

function animate() {
    if (height != window.innerHeight || width != window.innerWidth) {
        height = window.innerHeight;
        width = window.innerWidth;
        bounseBall.height = height;
        bounseBall.width = width;
    }

    requestAnimationFrame(animate);
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        let b = balls[i];

        b.update();
        b.y += b.dy;
        b.x += b.dx;
        if (b.y + b.radius >= height) {
            b.dy = -b.dy * grav;
        } else {
            b.dy += b.val;
        }

        if (b.x + b.radius > width || b.x - b.radius < 0) {
            b.dx = -b.dx;
        }
        
        if (
            mouseX > b.x - 20 &&
            mouseX < b.x + 20 &&
            mouseY > b.y - 50 &&
            mouseY < b.y + 50 &&
            b.radius < 70
        ) {
            b.radius += 5;
        } else {
            if (b.radius > b.startradius) {
                b.radius -= 1;
            }
        }
    }
}

animate();

setInterval(() => {
    balls.push(new Ball());
    balls.splice(0, 1);
}, 500);

// Changing the background color of an element with ID 'name'
const name = document.getElementById("name");
name.style.backgroundColor = randomColor();

console.log("Hello");
