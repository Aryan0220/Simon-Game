var n = $(".btn").length;
var colors = ["blue","green","yellow","red","orange","pink"];
var gameSequence = [];
var userSequence = [];
var level = 0;
var start = false;
function nextPattern (){
    level++;
    userSequence = [];
    $("h1").text("Level " + level);
    var random = Math.floor(Math.random()*n);
    gameSequence.push(colors[random]);
    $("#" + colors[random]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colors[random]);
}
function checkPattern(currentPattern){
    if(start){
        if(gameSequence[currentPattern] === userSequence[currentPattern]){
            if(gameSequence.length === userSequence.length){
                setTimeout(function(){
                    nextPattern();
                },500);
            }
        }
        else{
            playSound("wrong");
            $("body").addClass("gameOver");
            $("h1").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){
                $("body").removeClass("gameOver");
            },300);
            level = 0;
            gameSequence = [];
            start = false;
        }
    }
}
function playSound(event){
            var sound = new Audio("../assets/sounds/" + event + ".mp3");
            sound.play();
    }
function aniPress(event){
        $("#" + event).addClass("pressed");
        playSound(event);
        setTimeout(function(){
            $("#" + event).removeClass("pressed");
        },100);
}
$(document).keypress(function(){
    if(!start){
        nextPattern();
        start = true;
    }
});
$(".btn").on("click", function(){
    var userClick = $(this).attr("id");
    userSequence.push(userClick);
    aniPress(userClick);
    checkPattern(userSequence.length-1);
});
$("h1").click(function(){
    if(!start){
        nextPattern();
        start = true;
    }
});
