var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(document).keydown(function(){

    if(!gameStarted){

        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }

});

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
    
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game over, press any key to restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var id = "#" + randomChosenColor;

    $(id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {
    
    var id = "#" + currentColor;

    $(id).addClass("pressed");

    setTimeout(function() {

        $(id).removeClass("pressed");

    }, 100);

}
