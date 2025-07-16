let canvas = document.getElementById("canvas");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#a52f2fff";

let context = canvas.getContext("2d");

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX =window_width;
let pipeY = 0;


let velocityX = -2; 

const pipe = new Image();
pipe.src = './pipe.png';

requestAnimationFrame(update);
setInterval(placePipes, 1500);

pipe.onload= function() {
      context.drawImage(pipe, 0, 0);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0,0,window.width,window.height);

    for(let i=0; i< pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height); 
    }
}

function placePipes() {
    let pipe = {
        img : pipes,
        x : pipeX,
        y : pipeY,
        width : pipeWidth,
        height : pipeHeight, 
        passed : false
    }

    pipeArray.push(pipe);  
}



// context.fillStyle = "black";
//     context.fillRect(350, 0, 100, 250);
//     context.fillRect(350, 400, 100, canvas.height - 100);