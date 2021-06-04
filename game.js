var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStarted = false;

// Button audio clips
var redSound = new Audio("sounds/red.mp3");
var blueSound = new Audio("sounds/blue.mp3");
var greenSound = new Audio("sounds/green.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");

function nextSequence() {
	// Game has begun
	gameStarted = true;

	// Increase level for each round
	level += 1;
	$("#level-title").text(`Level ${level}`);

	// Generate new random number between 0 and 3
	var randNum = Math.floor(Math.random() * 3) + 1;
	var randChosenColor = buttonColors[randNum];

	// Add random color to game pattern
	gamePattern.push(randChosenColor);

	// Trigger button animation and sounds for new color in sequence
	setTimeout(() => {
		playSound(randChosenColor);
		animateButton(randChosenColor);
	}, 300);
}

function animateButton(color) {
	var selectedButton = `#${color}`;

	$(selectedButton).addClass("pressed");

	setTimeout(() => {
		$(selectedButton).removeClass("pressed");
	}, 100);
}

function playSound(color) {
	switch (color) {
		case "red":
			redSound.play();
			break;
		case "blue":
			blueSound.play();
			break;
		case "green":
			greenSound.play();
			break;
		case "yellow":
			yellowSound.play();
			break;
		default:
			wrongSound.play();
			break;
	}
}

function checkAnswer(currentLevel) {
	if (userPattern[currentLevel] != gamePattern[currentLevel]) {
		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text(`Game Over, Press Any Key to Restart`);

		startOver();
	}

	if (userPattern.length === gamePattern.length) {
		// Reset user's selected pattern for next level
		userPattern = [];

		// Begin next level
		setTimeout(() => {
			nextSequence();
		}, 1000);
	}
}

function startOver() {
	// Reset Game
	gameStarted = false;
	level = 0;
	gamePattern = [];
	userPattern = [];
}

// Trigger game start
$(document).on("keypress", (e) => {
	if (gameStarted == false) {
		nextSequence();
	}
});

// Check for user guesses
$(".btn").on("click", function () {
	var userChosenColor = this.id;

	animateButton(userChosenColor);
	playSound(userChosenColor);

	// Add user selected color to user's selected pattern
	userPattern.push(userChosenColor);

	var currentLevel = userPattern.length - 1;
	checkAnswer(currentLevel);
});
