var count = 1;
var appleCut = false;
var score = 0;
var initialized = false;
var spawned = false;
var numerator = 0;
const LEVSCORING = true;

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

const fixedFraction1 = 0.5;
const denom1 = 2;
const fixedFraction2 = 0.75;
const denom2 = 4;
const fixedFraction3 = 0.625;
const denom3 = 8;
var randomFraction = 0;
var correct = new Audio('correct.wav');
var denominator;


var menuCenter = {
  x: 0.5,
  y: 0.5
}


var coords = {
  x: 0,
  y: 0
}

var radius = 0.5

var pizzaSliceCount = 1;
var melonSliceCount = 1;
var cakeSliceCount = 1;
var exerciseSliceCount = 1;
const maxSliceCount = 8;

const pizzaId = "foodSpot1";
const melonId = "foodSpot2";
const cakeId = "foodSpot3";
const exerciseId = "foodSpot4";
const itemTypes = ["pizza", "melon", "cake"];



function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev, el) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var droppedObject = document.getElementById(data);
  droppedObject.classList.remove("cutable");
  var id = el.getAttribute("id")
  var foodArea;
  switch (el.getAttribute("id")) {
    case "target1":
      if (droppedObject.getAttribute("class").includes("item pizza"))
        el.appendChild(document.getElementById(data));
      // pizza section
      foodArea = document.getElementById("target1");
      var placedFood = foodArea.childNodes;
      var sum = 0;
      placedFood.forEach(function (food) {
        sum += parseFloat(food.getAttribute("data-size"));
      });
      if (sum == fixedFraction1) {
       foodArea.style.backgroundColor = "green";
        foodArea.setAttribute("ondrop", "return false");
        $(".pizza").each(function (index, slice) {
          slice.setAttribute("draggable", "false");
        });
      }
      break;
    case "target2":
      if (droppedObject.getAttribute("class").includes("item melon"))
        el.appendChild(document.getElementById(data));
      // watermelon section
      foodArea = document.getElementById("target2");
      placedFood = foodArea.childNodes;
      sum = 0;
      placedFood.forEach(function (food) {
        sum += parseFloat(food.getAttribute("data-size"));
      });
      if (sum == fixedFraction2) {
        foodArea.style.backgroundColor = "green";
        foodArea.setAttribute("ondrop", "return false");
        $(".melon").each(function (index, slice) {
          slice.setAttribute("draggable", "false");
        });
      }
      break;
    case "target3":
      if (droppedObject.getAttribute("class").includes("item cake"))
        el.appendChild(document.getElementById(data));
      // cake section
      foodArea = document.getElementById("target3");
      placedFood = foodArea.childNodes;
      sum = 0;
      placedFood.forEach(function (food) {
        sum += parseFloat(food.getAttribute("data-size"));
      });
      if (sum == fixedFraction3) {
        foodArea.style.backgroundColor = "green";
        foodArea.setAttribute("ondrop", "return false");
        $(".cake").each(function (index, slice) {
          slice.setAttribute("draggable", "false");
        });
      }
      break
    case "target4":
       // random exercise section
    el.appendChild(document.getElementById(data));
    foodArea = document.getElementById("target4");
    placedFood = foodArea.childNodes;
    sum = 0;
    placedFood.forEach(function (food) {
      sum += parseFloat(food.getAttribute("data-size"));
    });
    if (sum.toFixed(5) == randomFraction.toFixed(5) && spawned) {
      correct.play();
      foodArea.style.backgroundColor = "green";
      spawned = false;
      if(LEVSCORING) {
        score += numerator;
      }
      else {
        score += 1;
      }
      var sol = document.createElement("div");
      sol.setAttribute("id", "solved" + score);
      sol.setAttribute("class", "solved");
      placedFood.forEach(function (food) {
        food.style["visibility"] = 'hidden';
        food.setAttribute("draggable", "false");
        food.setAttribute("ondragstart", "return false");
        food.classList.remove("grabable");
        food.classList.remove("cutable");
      });
      sol.append(...placedFood);
      $("#solved").append(sol);
      foodArea.innerHTML = "";

      $('#' + exerciseId).empty();
      document.getElementById("fractare4").innerHTML = "";

      //foodArea.setAttribute("ondrop", "return false");
      //$(".cake").each(function(index, slice) {
      //  slice.setAttribute("draggable", "false");
      //});
      checkCutableExercise(ev);
    }
      break;
    default:
      el.appendChild(document.getElementById(data));
      break;
  }


}
function cutApple() {
  if (!appleCut) {
    $("#svg").remove();
    $('#canvas').prepend(createFraction(1, 2));
    var draw = SVG().addTo('#canvas').size(200, 130);
    let img = draw.image('apple_half.png').size(200, 130);
    draw = SVG().addTo('#canvas').size(200, 130);
    img = draw.image('apple_half.png').size(200, 130);
    $('#canvas').append(createFraction(1, 2));
    appleCut = true;
    $('.hidden').css("display", "inline");
  }
}

window.onload = function () {
  var draw = SVG().addTo('#canvas').size(200, 130);
  var svg = $("svg").attr("onclick", "cutApple()").attr("id", "svg")
  var image = draw.image('apple.png');
  image.size(200, 130);

  $(".playArea .foodSpot").each(function (index) {
    drawSectors($(this).attr("id"), itemTypes[index]);
  })


  //calculating clip-paths. Using the clip-paths somehow does not work when they are generated in realtime
  //calculating the results and then copying them in the html does work tho. 

  /*for (var i = 0; i < maxSliceCount; i++) {
    angleInDegrees = getAngle(i+1, true, 50);
    getSliceCoords(radius, angleInDegrees);
    var path = document.createElement('path');
      
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#111');
      path.setAttribute('stroke-width','1');
      path.setAttribute("class","sector");
    if ((i+1) == 1) {
     path.setAttribute('d', 'M' + menuCenter.x + ',' + menuCenter.y + ' l' + radius + ',0 A' + radius + ',' + radius + ' 0 1,0 ' + coords.x + ',' + (coords.y + 0.0001) + ' z');
    }
    else {
      path.setAttribute('d', 'M' + menuCenter.x + ',' + menuCenter.y + ' l' + radius + ',0 A' + radius + ',' + radius + ' 0 0,0 ' + coords.x + ',' + coords.y + ' z');
    }
    var clipPath = document.createElement('clipPath');
    clipPath.setAttribute("clipPathUnits","objectBoundingBox");
    clipPath.setAttribute("id", 'sector'+(i+1));
    clipPath.appendChild(path);
    $('defs').append(clipPath);
  }*/

  // make nice looking fractions for html
  var block = document.createElement('div');
  block.innerHTML = createFraction(1, 2);
  document.getElementById("fractare1").appendChild(block);


  var block = document.createElement('div');
  block.innerHTML = createFraction(3, 4);
  document.getElementById("fractare2").appendChild(block);


  var block = document.createElement('div');
  block.innerHTML = createFraction(5, 8);
  document.getElementById("fractare3").appendChild(block);
}

function createFraction(numerator, denominator) {
  return "<div class=\"fraction\"><span>" + numerator + "</span><span class=\"denominator\">" + denominator + "</span></div>"
}

function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    if (timeLeft <= 0) {
      //timeLeft = 0;
      clearInterval(timerInterval);
      hideRandomElements();
      showResult();
 
    }
    document.getElementById("timerfield").innerHTML = formatTimeLeft(timeLeft);
  }, 1000);
}

function cut(event) {
  var values = 0;
  var eventId = event.currentTarget.id;
  var itemType = "";
  $("#" + eventId + " .item").each(function (index) {
    values += parseFloat($(this).attr("data-size"));
    itemType = $(this).attr("class").split(' ')[1];
  });

  if (eventId == pizzaId) {
    if (pizzaSliceCount < 8 && values.toFixed(2) == 1) {
      pizzaSliceCount += 1;
      drawSectors(event.currentTarget.id, itemType);
      checkCutablePizza(event);
    }
  }
  else if (eventId == melonId) {
    if (melonSliceCount < 8 && values.toFixed(2) == 1) {
      melonSliceCount += 1;
      drawSectors(event.currentTarget.id, itemType);
      checkCutableMelon(event);
    }
  }
  else if (eventId == cakeId) {
    if (cakeSliceCount < 8 && values.toFixed(2) == 1) {
      cakeSliceCount += 1;
      drawSectors(event.currentTarget.id, itemType);
      checkCutableCake(event);
    }
  }
  else if (eventId == exerciseId) {
    if (exerciseSliceCount < 8 && values.toFixed(2) == 1) {
      exerciseSliceCount += 1;
      drawSectors(event.currentTarget.id, itemType, true);
      checkCutableExercise(event);
    }
  }
  

}



function getSliceCoords(radius, angle) {
  angleInRadians = -angle * Math.PI / 180.0;
  coords.x = menuCenter.x + radius * Math.cos(angleInRadians);
  coords.y = menuCenter.y + radius * Math.sin(angleInRadians);
}

function drawSectors(spotId, itemToSpawn, isExercise) {

  var sliceNum = 0;
  var additionalClass = itemToSpawn;
  var id = "";
  if (itemToSpawn == itemTypes[0]) {
    sliceNum = pizzaSliceCount;
    additionalClass = "pizza";
  }
  else if (itemToSpawn == itemTypes[1]) {
    sliceNum = melonSliceCount;
    additionalClass = "melon";
  }
  else if (itemToSpawn == itemTypes[2]) {
    sliceNum = cakeSliceCount;
    additionalClass = "cake";
  }

  id = additionalClass;

  if (isExercise) {
    sliceNum = exerciseSliceCount;
    id += "exercise";
  }

  var anchor = document.createElement("div");
  anchor.setAttribute('class', 'item ' + additionalClass);
  anchor.setAttribute('id', id + sliceNum)
  anchor.setAttribute('draggable', 'true');
  anchor.setAttribute('ondragstart', 'drag(event)');
  $("#" + spotId).append(anchor);
  $("#" + spotId).append(document.createTextNode("\t\t"));
  $("#" + spotId).append(document.createTextNode("\n"));


  for (var i = 0; i < sliceNum; i++) {

    anchor = $('#' + id + (i + 1));
    anchor.attr('data-size', 1 / sliceNum);
    anchor.attr('style', 'clip-path:url(#sector' + sliceNum + '); transform:rotate(' + getAngle(sliceNum) * i + 'deg); visibility:visible');
  }
}




function getAngle(sliceCount, gaps, gapVal) {
  //calculate angle without gaps
  if(gaps && sliceCount != 1){
    return angle = 360 / sliceCount - (360 / sliceCount / gapVal);
  }
  else{
    return 360/sliceCount;
  }
}

function startGame() {
  $("#solved").empty();
  var timeLeft = 5;
  $("#exerciseCanvas > p").text(timeLeft);
  $("button").attr("style", "display:none");
  $("#exerciseCanvas").attr("style", "height:50em");
  $("#exerciseCanvas > p").attr("style", "visibility:visible");
  document.getElementById("scorefield").style['display'] = 'none';
  var downloadTimer = setInterval(function () {
    if (timeLeft <= 0) {
      $("#exerciseCanvas *").attr("style", "visibility:visible");
      $("#exerciseCanvas > p").attr("style", "visibility:hidden");
      clearInterval(downloadTimer);
      // start 90 seconds game timer
      startTimer();
      showRandomElements();
      manageExercise();
    }
    $("#exerciseCanvas > p").text(timeLeft);
    timeLeft -= 1;
  }, 1000);
}

function manageExercise() {
  initialized = false;
  score = 0;
  var target = document.getElementById("target4");
  gameInterval = setInterval(() => {
    if (!initialized) {
      generateTask()
      initialized = true;
      spawned = true;
    }
    if (target.style.backgroundColor == "green" && !spawned) {
      target.style.backgroundColor = "transparent";
      generateTask();
      spawned = true;
    }
    if (timeLeft <= 0) {
      document.getElementById("scorefield").innerHTML = "Deine Punktzahl: " + score;
      $("button").attr("style", "display:block");
      target.innerHTML = "";
      $('#' + exerciseId).empty();
      document.getElementById("fractare4").innerHTML = "";
      clearInterval(gameInterval);
      timeLeft = TIME_LIMIT;
      timePassed = 0;
    }
  }, 1000);
}

function generateTask() {
  // Generate random numbers
  var childNumber = Math.floor(Math.random() * 3);
  var foodNumber = Math.floor(Math.random() * 3);
  denominator = Math.floor(Math.random() * 8) + 1;
  numerator = Math.floor(Math.random() * denominator) + 1;

  exerciseSliceCount = 1;

  // Set fraction value and create HTML element
  randomFraction = numerator / denominator;
  var block = document.createElement('div');
  block.innerHTML = createFraction(numerator, denominator);
  document.getElementById("fractare4").appendChild(block);

  // Set child image
  var randomPicture = document.getElementById("randomKid");
  if (childNumber == 0) {
    randomPicture.setAttribute("src", "kid1.png");
  }
  else if(childNumber == 1) {
    randomPicture.setAttribute("src", "kid2.png");
  }
  else if(childNumber == 2) {
    randomPicture.setAttribute("src", "kid3.png");
  }
  randomPicture.style.opacity = "1.0";

  drawSectors(exerciseId, itemTypes[foodNumber], true);
}

function resetItem(itemId) {
  let targetName = '';
  let exerciseBool = false;
  
  if(itemId == pizzaId) {
    pizzaSliceCount = 1;
    targetName = '#target1';
  }
  else if(itemId == melonId) {
    melonSliceCount = 1;
    targetName = '#target2';
  }
  else if(itemId == cakeId) {
    cakeSliceCount = 1;
    targetName = '#target3';
  }
  else {
    exerciseSliceCount = 1;
    targetName = '#target4';
    exerciseBool = true;
  }

  let item = $('#' + itemId + ' .item');
  if(item.length === 0){
    item = $(targetName + ' .item');
  }
  let itemType = item.attr("class").split(' ')[1];

  $('#' + itemId).empty();
  $(targetName).empty();
  $(targetName).css("backgroundColor", "transparent");
  $(targetName).attr("ondrop", "drop(event, this)");
  drawSectors(itemId, itemType, exerciseBool);
}

function checkCutablePizza(event) {
  var eventId = event.currentTarget.id;
  var values = 0;
  $("#" + eventId + " .item").each(function (index) {
    values += parseFloat($(this).attr("data-size"));
  });
  if(values.toFixed(2) == 1 && exerciseSliceCount != maxSliceCount && !(pizzaSliceCount == denom1)){
    $("#" + eventId + " .item").each(function (index) {
      $(this).removeClass("grabable");
      $(this).addClass("cutable");
    });
  }
  else{
    $("#" + eventId + " .item").each(function (index) {
      $(this).removeClass("cutable");
      $(this).addClass("grabable");
    });
  }
}

function checkCutableMelon(event) {
  var eventId = event.currentTarget.id;
  var values = 0;
  $("#" + eventId + " .item").each(function (index) {
   
    values += parseFloat($(this).attr("data-size"));
  });
  if(values.toFixed(2) == 1 && exerciseSliceCount != maxSliceCount && !(melonSliceCount == denom2)){
    $("#" + eventId + " .item").each(function (index) {
      $(this).removeClass("grabable");
      $(this).addClass("cutable");
    });
  }
  else{
    $("#" + eventId + " .item").each(function (index) {
      $(this).removeClass("cutable");
      $(this).addClass("grabable");
    });
  }
}

function checkCutableCake(event) {
  var eventId = event.currentTarget.id;
  var values = 0;
  $("#" + eventId + " .item").each(function (index) {
    
    values += parseFloat($(this).attr("data-size"));
  });
  if(values.toFixed(2) == 1 && exerciseSliceCount != maxSliceCount && !(cakeSliceCount == denom3)){
    $("#" + eventId + " .item").each(function (index) {
      $(this).removeClass("grabable");
      $(this).addClass("cutable");
    });
  }
  else{
    $("#" + eventId + " .item").each(function (index) {
      $(this).removeClass("cutable");
      $(this).addClass("grabable");
    });
  }
}

function checkCutableExercise(event) {
  var eventId = event.currentTarget.id;
  var values = 0;
  $("#" + eventId + " .item").each(function (index) {
    values += parseFloat($(this).attr("data-size"));
  });
  if(values.toFixed(2) == 1 && exerciseSliceCount != maxSliceCount && !(exerciseSliceCount == denominator)){
    $("#" + eventId + " .item").each(function (index) {
      $(this).removeClass("grabable");
      $(this).addClass("cutable");
    });
  }
  else{
    $("#" + eventId + " .item").each(function (index) {
      $(this).removeClass("cutable");
      $(this).addClass("grabable");
    });
  }
}

function showResult(){
  $('#solved .solved .item').each( function(index){
    var elem = this;
    setTimeout( function(){  elem.style['visibility'] = 'visible'; }, index * 200 )
});
}

/*function showRandomElements() {
  document.getElementById("trash").style['visibility'] = 'visible';
  document.getElementById("scorefield").style['visibility'] = 'hidden';
}

function hideRandomElements() {
  document.getElementById("randomKid").style['visibility'] = 'hidden';
  document.getElementById("target4").style['visibility'] = 'hidden';
  document.getElementById("trash").style['visibility'] = 'hidden';
  document.getElementById("timerfield").style['visibility'] = 'hidden';
  document.getElementById("scorefield").style['visibility'] = 'visible';
}*/

function showRandomElements() {
  document.getElementById("trash").style['display'] = 'block';
  document.getElementById("scorefield").style['display'] = 'none';
  document.getElementById("target4").style['display'] = 'block';
}

function hideRandomElements() {
  document.getElementById("randomKid").style['display'] = 'none';
  document.getElementById("fractare4").style['display'] = 'none';
  document.getElementById("foodSpot4").style['display'] = 'none';
  document.getElementById("target4").style['display'] = 'none';
  document.getElementById("trash").style['display'] = 'none';
  document.getElementById("timerfield").style['display'] = 'none';
  document.getElementById("scorefield").style['display'] = 'block';
  $("#exerciseCanvas").css("height", "6em");
}
