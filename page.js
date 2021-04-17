var count = 1;

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

function cut(){
    for(i=0; i < count; i++)
    {
      var draw = SVG().addTo('#canvas').size(500, 130);
      let img = draw.image('apple.png').size(500,130);
    }
    count *= 2;
}

window.onload= function(){
var canvas = document.getElementById("canvas_1");
var distance = 10;
var draw = SVG().addTo('#canvas').size(500, 130);
var svg = $("svg").attr("onclick", "cut()").attr("id", "svg")
var image = draw.image('apple.png');
image.size(500,130);
}