// Initialize global variables
var WIDTH;
var HEIGHT;
var canvas;
var con;
var pxs = [];
var rint = 60;

// Define the Circle class for individual particles
function Circle() {
    this.s = {
        ttl: 8000,
        xmax: 5,
        ymax: 2,
        rmax: 10,
        rt: 1,
        xdef: 960,
        ydef: 540,
        xdrift: 4,
        ydrift: 4,
        random: true,
        blink: true
    };

    this.reset = function () {
        this.x = this.s.random ? WIDTH * Math.random() : this.s.xdef;
        this.y = this.s.random ? HEIGHT * Math.random() : this.s.ydef;
        this.r = (this.s.rmax - 1) * Math.random() + 1;
        this.dx = Math.random() * this.s.xmax * (Math.random() < 0.5 ? -1 : 1);
        this.dy = Math.random() * this.s.ymax * (Math.random() < 0.5 ? -1 : 1);
        this.hl = this.s.ttl / rint * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random() + 1;
        this.stop = Math.random() * 0.2 + 0.4;
    };

    this.fade = function () {
        this.rt += this.s.rt;
    };

    this.draw = function () {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            this.s.rt = -this.s.rt;
        } else if (this.rt >= this.hl) {
            this.reset();
        }

        var opacity = 1 - this.rt / this.hl;
        con.beginPath();
        con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        con.closePath();

        var t = this.r * opacity;
        var g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, t <= 0 ? 1 : t);
        g.addColorStop(0, `rgba(255, 240, 0, ${opacity})`);
        g.addColorStop(this.stop, `rgba(255, 240, 0, ${opacity * 0.6})`);
        g.addColorStop(1, "rgba(255, 240, 0, 0)");
        con.fillStyle = g;
        con.fill();
    };

    this.move = function () {
        this.x += this.rt / this.hl * this.dx;
        this.y += this.rt / this.hl * this.dy;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    };

    this.reset();
}

// Draw function for animation loop
function draw() {
    con.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < pxs.length; i++) {
        pxs[i].fade();
        pxs[i].move();
        pxs[i].draw();
    }
}

// Initialize the canvas and start animation
$(document).ready(function () {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas = document.getElementById("pixie");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    con = canvas.getContext("2d");

    for (var i = 0; i < 100; i++) {
        pxs[i] = new Circle();
    }

    setInterval(draw, rint);
});
