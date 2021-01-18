gamePattern=[];
playersPattern=[];
buttonColors=["red", 'blue',"green", 'yellow'];

var started=false;
var level=0;

$(document).on('keydown',function(){
    if(!started){
        nextMove();
        $('#level-title').text('Level '+ level);     
        started = true;   
    }
});

//
$('.btn').on('click',function(){
    var playerChosenColour=$(this).attr('id');
    playersPattern.push(playerChosenColour);
    playSound(playerChosenColour);
    animatePress(playerChosenColour);
    checkAnswer(playersPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===playersPattern[currentLevel]){
        if(gamePattern.length===playersPattern.length){
            setTimeout(function(){
                nextMove();
            },1000)
        }   
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

function nextMove(){
    playersPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColors[randomNumber];    
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut('fast').fadeIn('fast');
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;  
}


    
    

