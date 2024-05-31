var maxLevel = parseInt(prompt("enter highest level number"));
var basicColors = ["red", "blue", "yellow", "green"];
var reference = getColorsArray();
var input = [];
var clickCounter = 0;
var animatedCount = 0;

function getRandomNumber() {
  return Math.floor(Math.random() * 4);
}

function getColorsArray() {
  var output = [];

  for (i = 0; i < maxLevel; i++) {
    output.push(basicColors[getRandomNumber()]);
  }

  return output;
}

function animateButton(key) {
  var audio = new Audio("sounds/" + key + ".mp3");

  audio.play();

  $("#" + key).addClass("pressed");

  setTimeout(function () {
    $("#" + key).removeClass("pressed");
  }, 500);
}

function removeKeypressAnimation() {
  $(document).off("keypress");
}

function removeMouseClick() {
  $(".btn").off("click");
}

function displayCurrentLevel() {
  setTimeout(function () {
    $("h1").text("Level: " + animatedCount);
  }, 850);
}

function startAnimation() {
  console.log("startAnimation");
  var key = reference[0];
  animateButton(key);
  removeKeypressAnimation();
  animatedCount++;
  displayCurrentLevel();
}

function getNextAnimation() {
  setTimeout(function () {
    animateButton(reference[animatedCount - 1]);
  }, 2000);
  animatedCount++;
  displayCurrentLevel();
}

function checkInputValid() {
  var isValid = true;

  for (var i = 0; i < input.length; i++) {
    if (reference[i] != input[i]) {
      isValid = false;
      break;
    }
  }
  return isValid;
}

console.log("max level: " + maxLevel);

function playGame() {
  if (animatedCount > 0) {
    console.log("animated count is not 0");

    console.log("inside playGame");

    var key = $(this).attr("id");
    console.log(key);
    animateButton(key);
    input.push(key);
    clickCounter++;
    console.log("click count: " + clickCounter);
    console.log("animated count: " + animatedCount);

    if (maxLevel >= clickCounter) {
      var isInputValid = checkInputValid();
      if (isInputValid) {
        console.log("input is valid");
        console.log("reference: " + reference);
        console.log("your input: " + input);

        if (animatedCount == clickCounter && clickCounter != maxLevel) {
          getNextAnimation();
          input = [];
          clickCounter = 0;
        }

        if (maxLevel === clickCounter) {
          $("h1").text("WIN");
          removeMouseClick();
        }
      } else {
        $("h1").text("Game over");

        var audio = new Audio("sounds/wrong.mp3");

        audio.play();

        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 250);

        removeMouseClick();
      }
    }
  }
}

$(document).keypress(startAnimation);

console.log("before IF animatedCount " + animatedCount);

// if(animatedCount > 0){
$(".btn").on("click", playGame);
// }
