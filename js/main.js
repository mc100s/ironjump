var ctx;
var width = 1000; // Default value is 1000
var height = 1700; // Default value is 1700
var ball = {};
var camera = {};
gravity = 5; // Default value is 5
intervalTimeout = 25; // Default value is 25
var intervalId;
var debug = true; // Change it to false to remove the grid



// When all the HTML is loaded
$(document).ready(function() {  
  displayBestScore();

  ctx = $("canvas")[0].getContext("2d");

  // Change the background color every time the user click on "canvas"
  $("canvas").click(function(event){
    changeBgColor();
  })

  $('#play').click(function() {
    // If we are on a mobile and if we can open full screen, we open full screen mode
    if (isMobile() && document.documentElement && document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(); 
    }
    play();
  });
  
  if(window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", function (event) {
      ball.x -= event.accelerationIncludingGravity.x*5;
      // drawMenu
    }, false);
  } else {
    console.log("The browser is not supporting devicemotion")
  }
});

$(document).keydown(function(e) {
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

function displayBestScore() {
  try {
    if (localStorage.bestScore) {
      $('.best-score').text('Best score: ' + localStorage.bestScore);
    }
  }
  catch (e) {
    console.log("CATCH", e);
  }
}

function setNewScore(score) {
  try {
    if (localStorage.bestScore) {
      localStorage.bestScore = Math.max(localStorage.bestScore, score);
    }
    else {
      localStorage.bestScore = score;
    }
  }
  catch (e) {
    console.log("CATCH", e);
  }
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
    // ...ball,
    radius: 50,
    x: ball.x + ball.vx,
    y: ball.y + ball.vy,
    vx: ball.vx*0.9,
    vy: ball.vy + gravity,
    color: 'black',
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

  if (debug) {
    drawGridCoordinates();
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

function drawGridCoordinates() {
  ctx.save();  
  ctx.fillStyle = "white";
  ctx.font = '40px sans-serif';
  // For the horizontal lines
  for (let y = 1500; y > camera.y; y-=500) {
    ctx.fillRect(0, y, 1000, 5);
    ctx.fillText("y = "+y, 10, y);
  }
  // For the vertical lines
  ctx.fillRect(500, camera.y, 5, height);
  ctx.fillText("x = "+500, 500+10, camera.y + height - 10);
  
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


