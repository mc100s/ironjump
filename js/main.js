var ctx;
var width = 1000;
var height = 1700;
var ball = {};
var camera = {};
gravity = 5;
intervalTimeout = 25; 
var intervalId;

var platforms = [
  {
    x: 0,
    y: 1000,
    width: 1000
  },
  {
    x: 400,
    y: 500,
    width: 200
  },
  {
    x: 600,
    y: -100,
    width: 200
  },
  {
    x: 800,
    y: 0,
    width: 200
  },
  {
    x: 0,
    y: -500,
    width: 200
  },
  {
    x: 0,
    y: -1000,
    width: 200
  },
  {
    x: 400,
    y: -1500,
    width: 200
  },
  {
    x: 400,
    y: -2000,
    width: 200
  },
  {
    x: 600,
    y: -2500,
    width: 200
  },
  {
    x: 400,
    y: -3000,
    width: 200
  },
  {
    x: 600,
    y: -3500,
    width: 200
  },
  {
    x: 400,
    y: -4000,
    width: 200
  },
]

for (var y = 0; y > -100000; y -= 500) {
  var color;
  var r = Math.random();
  if (r < 0.6) {
    color = "black";
  }
  else if (r < 0.8) {
    color = "rgb(255, 60, 60)";
  }
  else {
    color = "rgb(100, 110, 255)";
  }
  platforms.push({
    x: Math.random()*(width-200),
    y,
    width: 200,
    color
  });
}



$(document).ready(function() {
  displayBestScore();
  ctx =  $("canvas")[0].getContext("2d");
  $(document).keydown(function(e) {
    console.log(e.which)
    switch(e.which) {
      case 37: // left
        ball.vx -= 20
        break;
      case 39: // right
        ball.vx += 20
        break;
      case 32: // space
        changeBgColor();
        break;
    }
  });
  $('button').click(function() {
    document.documentElement.webkitRequestFullscreen();    
    play();
    // $("canvas").mousedown(function(event){
    //   console.log("mousedown")
    // })
    // $("canvas").mouseup(function(event){
    //   console.log("mouseup")
    // })
    
    
    $("canvas").click(function(event){
      // ball.radius*=1.1;

      changeBgColor();
      // var xClickedOnCanvas = event.offsetX;
      // var widthCanvas = $("canvas").width();
      // if (xClickedOnCanvas < widthCanvas/2) {
      //   ball.vx -= 10
      // }
      // else {
      //   ball.vx += 10
      // }
    })
  });

  if(window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", function (event) {
      ball.x -= event.accelerationIncludingGravity.x*5;
      drawMenu
    }, false);
  } else {
    // Le navigateur ne supporte pas l'événement devicemotion
  }
  // $('button:first').click(); // DEBUG
  
});

function displayBestScore() {
  if (localStorage.bestScore) {
    $('.best-score').text('Best score: ' + localStorage.bestScore);
  }
}

function setNewScore(score) {
  localStorage.bestScore = Math.max(localStorage.bestScore, score);
}

function play() {
  $(".menu").hide();
  $("canvas").show();
  ball = {
    radius: 50,  
    x: width/2,
    y: height/2,
    vx: 0,
    vy: 10,
    color: 'black',
  }
  camera = {
    y: 0,
    vy: -3,
    height: height
  }
  intervalId = setInterval(function() {
    update();
    drawEverything();
  }, intervalTimeout);
}

function changeBgColor() {
  if ($("canvas").css("background-color") == "rgb(255, 60, 60)") {
    $("canvas").css("background-color", "rgb(100, 110, 255)");
  }
  else {
    $("canvas").css("background-color", "rgb(255, 60, 60)");
  }
}

function update() {

  if (isGameOver()) {
    endGame();
  }
  
  // var newBallY = ball.y + ball.vy;
  // var newBallVy = ball.vy + gravity;
  var newBall = {
    ...ball,
    x: ball.x + ball.vx,
    y: ball.y + ball.vy,
    vx: ball.vx*0.9,
    vy: ball.vy + gravity,
  }

  // console.log("ball.y, newBallY, platforms[1].y", ball.y, newBallY, platforms[1].y)

  for (var i = 0; i < platforms.length; i++) {
    if (ball.y+ball.radius <= platforms[i].y && platforms[i].y <= newBall.y+ball.radius && platforms[i].x <= ball.x && ball.x <= platforms[i].x+platforms[i].width) {
      newBall.y = platforms[i].y - ball.radius;
      newBall.vy = -80;
    }
  }

  ball = newBall;



  if (camera.y > ball.y - ball.radius - 0.1*height) {
    camera.y = ball.y - ball.radius - 0.1*height;
  }
  camera.y += camera.vy;
    
  drawEverything();
}

function isGameOver() {
  return ball.y > camera.y + camera.height;
}

function endGame() {
  clearInterval(intervalId);
  setNewScore(-1*camera.y);
  displayBestScore();
  $(".menu").show();
  $("canvas").hide();
}

function drawEverything() {
  ctx.clearRect(0, 0, width, height);

  ctx.save();

  ctx.translate(0, -camera.y);
  // ctx.fillRect(ball.x, ball.y, 100, 100);

  drawBall(ball);

  for (var i = 0; i < platforms.length; i++) {
    drawPlatform(platforms[i]);
  }
  
  ctx.restore();

  drawMenu();
  

  
}

function drawBall(ball) {
  ctx.save();  
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.restore();  
}

function drawPlatform(platform) {
  ctx.save();  
  if (platform.color) {
    ctx.fillStyle = platform.color;
  }
  else {
    ctx.fillStyle = "black";
  }
  ctx.fillRect(platform.x, platform.y, platform.width, 30);
  ctx.restore();  
}

function drawMenu(text) {
  ctx.save();  
  

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, 90);

  ctx.fillStyle = "white";
  ctx.font = '40px sans-serif';
  // ctx.fillText(x.toFixed(2), 10, 62);
  ctx.fillText("IronJump - " + -1*camera.y, 10, 62);
  ctx.restore();  
}


