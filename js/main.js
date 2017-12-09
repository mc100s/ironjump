var ctx;
var width = 1000;
var height = 1700;
var ball = {
  radius: 50,  
  x: width/2,
  y: height/2,
  vx: 0,
  vy: 10
}
gravity = 5;

var platforms = [
  {
    x: 400,
    y: 1000,
    width: 200
  },
  {
    x: 400,
    y: 500,
    width: 200
  }
]


var camera = {
  y: 0,
  height: height
}

$(document).ready(function() {
  ctx =  $("canvas")[0].getContext("2d");

  $('button').click(function() {
    play();
  })
});

function play() {
  $(".menu").hide();
  $("canvas").show();
  setInterval(function() {
    update();
    drawEverything();
  }, 40);
}

function update() {

  var newBallY = ball.y + ball.vy;
  var newBallVy = ball.vy + gravity;

  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i].y < newBallY && platforms[i].y > ball.y) {
      newBallY = platforms[i].y - ball.radius;
      newBallVy = -100;
    }
  }

  ball.y = newBallY;
  ball.vy = newBallVy;



  if (camera.y > ball.y - 2*ball.radius)
    camera.y = ball.y - 2*ball.radius;

  drawEverything();
}

function drawEverything() {
  ctx.clearRect(0, 0, width, height);
  // ctx.fillRect(ball.x, ball.y, 100, 100);

  ctx.beginPath();
  ctx.arc(ball.x, ball.y - camera.y, ball.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'black';
  ctx.fill();

  for (var i = 0; i < platforms.length; i++) {
    ctx.fillRect(platforms[i].x, platforms[i].y - camera.y, platforms[i].width, 30);
  }
}