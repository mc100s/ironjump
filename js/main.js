var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


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
    if (isMobile && document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(); 
    }
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
  if (localStorage.bestScore) {
    localStorage.bestScore = Math.max(localStorage.bestScore, score);
  }
  else {
    localStorage.bestScore = score;
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


