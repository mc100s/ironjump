var ctx;

$(document).ready(function() {
  ctx =  $("canvas")[0].getContext("2d");
  ctx.fillRect(100, 100, 100, 100);

  $('button').click(function() {
    $(".menu").hide();
    $("canvas").show();
  })
});