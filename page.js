var count = 1;
var appleCut = false;

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

function allowDrop(ev){
    ev.preventDefault();
}

function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
function cutApple(){
  if(!appleCut){
    $('#canvas').prepend(createFraction(1,2));
    var draw = SVG().addTo('#canvas').size(200, 130);
    let img = draw.image('apple.png').size(200,130);
    $('#canvas').append(createFraction(1,2));
    appleCut = true;
    $('.hidden').css("display","inline");
  }
}

function cut(){
    for(i=0; i < count; i++)
    {
      var draw = SVG().addTo('#canvas').size(200, 130);
      let img = draw.image('apple.png').size(200,130);
    }
    count *= 2;
}

window.onload= function(){
var draw = SVG().addTo('#canvas').size(200, 130);
var svg = $("svg").attr("onclick", "cutApple()").attr("id", "svg")
var image = draw.image('apple.png');
image.size(200,130);
}

function createFraction( numerator, denominator){
  return "<div class=\"fraction\"><span>"+numerator+"</span><span class=\"denominator\">"+denominator+"</span></div>"
}