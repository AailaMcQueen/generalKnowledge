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
var seconds = 5;
var diff = "medium";
var totalQuestions = 1;
var correctAnswers = 0;
var clickedAnswer = 2;
var clockTimer;
var answer = 1;

function correctAnswerF(){
    var str = "#option"+answer;
    $(str).css("background-color", "#138c0a");
    $(str).css("border-color", "#138c0a");
}

function wrongAnswerF(str){
    $(str).css("background-color", "red");
    $(str).css("border-color", "red");
}


function questionDataInput(){
    var str1 = "#option"+answer;
    var str2 = "#option"+clickedAnswer;
    $(str1).css("background-color", "black");
    $(str1).css("border-color", "white");
    $(str2).css("background-color", "black");
    $(str2).css("border-color", "white");
    fetch(url)
    .then(function(request){
        if(!request.ok){
            throw Error(request.status);
        }
        return request.json();
    })
    .then(function(response){
        var data = response.results[0];
        
    })
    .catch(function(error){
        alert(error);
    });
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

function questionUpdate(){
    wrongAnswerF("#option2");
    correctAnswerF();
    setTimeout(function(){
        $(".questionContainer").slideUp(1000);
        setTimeout(function(){
            $(".difficulty").removeClass();
            questionDataInput();
            $(".questionContainer").slideDown(1000);
            totalQuestions++;
            seconds = 6;
            clockTimer = setInterval(timerFunction, 1000);
        }, 1000);
    }, 5000);
}

buttonRefresh.addEventListener("click", function(){
    clearInterval(clockTimer);
    questionUpdate();
});
