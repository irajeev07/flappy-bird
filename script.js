let canvas = document.getElementById("canvas");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#a52f2fff";

let context = canvas.getContext("2d");
const pipe = new Image();
pipe.src = './pipe.png';

pipe.onload= () => {
    context.drawImage(pipe, 0, 0);
}


// context.fillStyle = "black";
//     context.fillRect(350, 0, 100, 250);
//     context.fillRect(350, 400, 100, canvas.height - 100);