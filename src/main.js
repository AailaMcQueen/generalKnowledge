var url = "https://opentdb.com/api.php?amount=1&type=multiple";
var buttonRefresh = document.querySelector(".buttonRefresh");
var questionArray = [];
var questionDiv = document.querySelectorAll(".questionCard");
var timerX = document.querySelector(".seconds");
var timerY = document.querySelector(".timer");
var question = document.querySelector(".question");
var option1 = document.querySelector("#option1");
var option2 = document.querySelector("#option2");
var option3 = document.querySelector("#option3");
var option4 = document.querySelector("#option4");
var difficulty = document.querySelector(".difficulty");
var category = document.querySelector(".category");
var correctAnswer = "option";
var random;
var seconds = 45;
var diff = "medium";
var totalQuestions = 1;
var correctAnswers = 0;
var clockTimer;

buttonRefresh.addEventListener("click", function(){
    clearInterval(clockTimer);
    questionUpdate();
});

function questionDataInput(){
    fetch(url)
    .then(function(request){
        if(!request.ok){
            throw Error(request.status);
        }
        return request.json();
    })
    .then(function(response){
        var data = response.results[0];
        console.log("Hello");
    })
    .catch(function(error){
        alert(error);
    });
}


function questionUpdate(){
    showCorrectAnswer();
    setTimeout(function(){
        $(".questionContainer").slideUp(1000);
        $(".difficulty").removeClass();
        questionDataInput();
        $(".questionContainer").slideDown(1000);
        totalQuestions++;
    }, 5000);
}

clockTimer = setInterval(timerFunction, 1000);

function timerFunction(){
    seconds--;
    var x = "0";
    if(seconds>=10){
        timerX.innerHTML = seconds;
    }
    else{
        timerY.style.webkitAnimationPlayState = "running";
        timerX.innerHTML = x + seconds;
    }
    if(seconds==0){
        timerY.style.webkitAnimationPlayState = "paused";
        clearInterval(clockTimer);
        questionUpdate();
    }
}
