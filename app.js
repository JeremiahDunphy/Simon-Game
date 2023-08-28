let audios = {
  green: new Audio("sounds/green.mp3"),
  red: new Audio("sounds/red.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  blue: new Audio("sounds/blue.mp3"),
};

let wrong = new Audio("sounds/wrong.mp3");
let buttons = document.getElementsByClassName("btn");
let levelTitle = document.getElementById("level-title");
let gameStarted = false;
let gameLevel = 0;
let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["green", "red", "yellow", "blue"];
let randomNumber = 0;
let randomColorChosen = buttonColours[randomNumber];
let audio = audios[randomColorChosen];

if (!gameStarted) {
  function keydownHandler(event) {
    if (event.key) {
      levelTitle.innerHTML = `Level ${gameLevel}`;
      document.removeEventListener('keydown', keydownHandler);
      nextSequence();
    }
  }

  document.addEventListener('keydown', keydownHandler);
  gameStarted = true;
}

function nextSequence() {
  gameLevel++;
  console.log(gameLevel);
  levelTitle.innerHTML = `Level ${gameLevel}`;

  for (let i = 0; i < gameLevel; i++) {
    setTimeout(() => {
      randomNumber = Math.floor(Math.random() * 4);
      randomColorChosen = buttonColours[randomNumber];
      gamePattern.push(randomColorChosen);

      buttons[randomColorChosen].classList.add('pressed');
      setTimeout(() => {
        buttons[randomColorChosen].classList.remove('pressed');
      }, 100);

      playSound(randomColorChosen);
      animatePress(randomColorChosen);

      if (i === gameLevel - 1) {
        // Start user's turn after generating the pattern
        setTimeout(() => {
          userTurn();
        }, gameLevel * 1000); // Adjust the delay as needed
      }
    }, (i + 1) * 1000); // Adjust the delay as needed
  }
}


function playSound(name) {
  audio = audios[name];
  audio.play();
}

function animatePress(randomColorChosen) {
  let currentButton = document.getElementById(randomColorChosen);
  currentButton.classList.add("pressed");
  setTimeout(function() {
    currentButton.classList.remove("pressed");
  }, 100);
}

function clickEventHandler() {
  let arraysMatch = true;
  var userChosenColour = this.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(gamePattern, userClickedPattern);
  if(userClickedPattern.length === gamePattern.length ) {
  for (let i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      arraysMatch = false;
      break;
    }
  }
}
  if (arraysMatch) {
    nextSequence();
  } else {
    wrong.play();
    document.body.classList.add("game-over");
    levelTitle.innerHTML =
      "Game Over, you clicked the wrong pattern please click on any button below to restart the game.";
    gameLevel = -1;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].removeEventListener("click", clickEventHandler);
    }

    restartGame();
  }
}


function userTurn() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', clickEventHandler);
  }
  setTimeout(() => {
  for (let i = 0; i < buttons.length; i++) {

  buttons[i].removeEventListener('click', clickEventHandler);

    }
  }, gameLevel * 1000);
}


function restartGame() {
  gameLevel = -1;
  if (gameLevel == -1) {
    for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      location.reload();
    });
  }
  }
}
