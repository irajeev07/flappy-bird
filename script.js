// let canvas = document.getElementById("canvas");

// var window_height = window.innerHeight;
// var window_width = window.innerWidth;

// canvas.width = window_width;
// canvas.height = window_height;

// canvas.style.background = "#a52f2fff";

// let context = canvas.getContext("2d");

// let pipeArray = [];
// let pipeWidth = 64;
// let pipeHeight = 512;
// let pipeX = window_width;
// let pipeY = 0;


// let velocityX = -2;

// const pipe = new Image();
// pipe.src = './pipe.png';

// requestAnimationFrame(update);
// setInterval(placePipes, 1500);

// pipe.onload = function () {
//     context.drawImage(pipe, 0, 0, pipeWidth, pipeHeight);
// }

// function update() {
//     requestAnimationFrame(update);
//     context.clearRect(0, 0, window.width, window.height);

//     for (let i = 0; i < pipeArray.length; i++) {
//         let pipe = pipeArray[i];
//         console.log(pipe.x)
//         pipe.x += velocityX;
//         context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
//     }
// }

// function placePipes() {
//     // let randomPipeY = pipeY - pipeHeight/4 - Math.random()*pipeHeight/2;
    
//     let temppipe = {
//         img: pipe,
//         x: pipeX,
//         y: pipeY,
//         width: pipeWidth,
//         height: pipeHeight,
//         passed: false
//     }

//     pipeArray.push(temppipe);
// }



// context.fillStyle = "black";
//     context.fillRect(350, 0, 100, 250);
//     context.fillRect(350, 400, 100, canvas.height - 100);




//let's start from here
let board;
let boardHeight = 500;
let boardWidth = 640;
let context;

//bird
let birdHeight = 64;
let birdWidth = 56;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight,
}

//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 420;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -1;
let velocityY = 0;
let gravity = 0.2;
let gameOver = false;
let score = 0;

window.onload = function() {
   board = document.getElementById("board");
   board.height = boardHeight;
   board.width = boardWidth;
   context = board.getContext("2d");

   //bird img
   birdImg = new Image();
   birdImg.src = "./bird.png";
   birdImg.onload = function() {
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
   }

   //pipe img
   topPipeImg = new Image();
   topPipeImg.src= "./tppipe.png";
   bottomPipeImg = new Image();
   bottomPipeImg.src = "./btpipe.png";

   requestAnimationFrame(update);
   setInterval(placePipes,1500);
   document.addEventListener("keydown", moveBird);
   document.addEventListener("touchstart", moveBird);
}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0,0,board.width,board.height);

    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0) //limit bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if(bird.y > board.height){
        gameOver = true;
    }

    for(i=0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;
            pipe.passed = true;
        }
        if(detectCollision(bird,pipe)){
            gameOver = true;
        };
    }

    //score
    context.fillStyle = "red";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

     if(gameOver){
        context.fillText("GAME OVER!",45,300);
    }
}

while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
}//this is for removing pipes 

function placePipes(){
    if(gameOver){
        return;
    }
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/3; 
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);
    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
     pipeArray.push(bottomPipe);
}

function moveBird(event){
    if(event.code == "Space" || event.code == "ArrowUp" || event.type == "touchstart"){
        //jump
        velocityY = -6;
    }

    //reset game
    if(gameOver){
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}


function detectCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y
}