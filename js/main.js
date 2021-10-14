"use strict"
let cvs = document.getElementById("canvas");
let  ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeButtom = new Image();




bird.src = "img/krot-2.jpg";
// bird.src = "img/bird.png"
bg.src = "../img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeButtom.src = "img/pipeBottom.png";

let fly = new Audio();
let score_audio = new Audio();
fly.src = "./audio/fly.mp3";
score_audio.src = "./audio/score.mp3";

document.addEventListener("click", moveUp);
function moveUp() {
	yPos -= 28;
	fly.play();
}
// create block
const pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}
let score = 0;
let gap = 100;
// position bird
let xPos = 10;
let yPos = 150
let grav = 1;

function draw() {
	ctx.drawImage(bg, 0, 0);
	for (let i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeButtom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		pipe[i].x--;//block move

// create new block
		if(pipe[i].x == 90) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) -  pipeUp.height
			})
		}
		// if bird touched block
		if(xPos + bird.width >= pipe[i].x
			&& xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height
			|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height){
				// alert(1)
				location.reload();//reload page
				// alert(1)
			}
			if(pipe[i].x == 5) {
				score++
				score_audio.play();
			}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);
	yPos += grav; 

	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("score Krot: " + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}

pipeButtom.onload = draw;
