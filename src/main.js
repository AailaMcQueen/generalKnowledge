var url = "https://opentdb.com/api.php?amount=1&type=multiple";
var buttonRefresh = document.querySelector(".buttonRefresh");
var questionArray = [];
var questionDiv = document.querySelectorAll(".questionCard");
var timerX = document.querySelector(".seconds");
var timerY = document.querySelector(".timer");
var question = document.querySelector(".question");
var option1 = document.querySelector("#option0");
var option2 = document.querySelector("#option1");
var option3 = document.querySelector("#option2");
var option4 = document.querySelector("#option3");
var difficulty = document.querySelector(".difficulty");
var category = document.querySelector(".category");
var correctAnswer = "option";
var random;
var seconds = 45;
var diff = "medium";
var totalQuestions = 0;
var correctAnswers = 0;
var clickedAnswer = -1;
var clockTimer;
var answer = 0;
var data = {};

$(".questionContainer").css("display", "none");
initiate();

function initiate(){
    fetchData();
    setTimeout(function(){
        questionDataInput();
        $(".questionContainer").slideDown(1000);
        totalQuestions++;
        clearInterval(clockTimer);
        seconds = 46;
        clockTimer = setInterval(timerFunction, 1000);
    }, 3000);
}

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
    $("#option0").removeAttr('style');
    $("#option1").removeAttr('style');
    $("#option2").removeAttr('style');
    $("#option3").removeAttr('style');
    dataInput();
}


function fetchData(){
    fetch(url)
    .then(function(request){
        if(!request.ok){
            throw Error(request.status);
        }
        return request.json();
    })
    .then(function(response){
        data = response.results[0];
    })
    .catch(function(error){
        alert(error);
    });
}

function dataInput(){
    random = Math.random()*10;
    random = Math.floor(random);
    random = random%4;
    answer = random;
    category.innerHTML = data.category;
    question.innerHTML = "<h2>"+data.question+"</h2>";
    diff = data.difficulty;
    difficulty.innerHTML = diff;
    $(".difficulty").addClass(diff);
    $("#option"+random).html(data.correct_answer);
    random = (random+1)%4;
    $("#option"+random).html(data.incorrect_answers[0]);
    random = (random+1)%4;
    $("#option"+random).html(data.incorrect_answers[1]);
    random = (random+1)%4;
    $("#option"+random).html(data.incorrect_answers[2]);
}


function timerFunction(){
    seconds--;
    var x = "0";
    if(seconds>=10){
        timerX.innerHTML = seconds;
    }
    else{
        $(".timer").css("color", "red");
        timerX.innerHTML = x + seconds;
    }
    if(seconds==0){
        $(".timer").removeAttr("style");
        clearInterval(clockTimer);
        correctAnswerF();
        if(totalQuestions <= 30){
            questionUpdate();
        }
    }
}

function questionUpdate(){
    fetchData();
    $(".score").html(correctAnswers);
    clearInterval(clockTimer);
    setTimeout(function(){
        $(".questionContainer").slideUp(1000);
        setTimeout(function(){
            $(".difficulty").removeClass(diff);
            questionDataInput();
            $(".questionContainer").slideDown(1000);
            totalQuestions++;
            seconds = 46;
            clockTimer = setInterval(timerFunction, 1000);
        }, 1500);
    }, 3000);
}

buttonRefresh.addEventListener("click", function(){
    correctAnswerF();
    questionUpdate();
});

option1.addEventListener("click", function(){
    if(seconds>0){
        clickedAnswer==0;
        if(answer==0){
            seconds = 0;
            clearInterval(clockTimer);
            correctAnswerF();
            correctAnswers++;
            questionUpdate();
        }
        else{
            seconds = 0;
            clearInterval(clockTimer);
            wrongAnswerF("#option0");
            correctAnswerF();
            questionUpdate();
        }
    }
})

option2.addEventListener("click", function(){
    if(seconds>0){
        clickedAnswer==1;
        if(answer==1){
            seconds = 0;
            clearInterval(clockTimer);
            correctAnswerF();
            correctAnswers++;
            questionUpdate();
        }
        else{
            seconds = 0;
            clearInterval(clockTimer);
            wrongAnswerF("#option1");
            correctAnswerF();
            questionUpdate();
        }
    }
})

option3.addEventListener("click", function(){
    if(seconds>0){
        clickedAnswer==2;
        if(answer==2){
            seconds = 0;
            clearInterval(clockTimer);
            correctAnswerF();
            correctAnswers++;
            questionUpdate();
        }
        else{
            seconds = 0;
            clearInterval(clockTimer);
            wrongAnswerF("#option2");
            correctAnswerF();
            questionUpdate();
        }
    }
})

option4.addEventListener("click", function(){
    if(seconds>0){
        clickedAnswer==3;
        if(answer==3){
            seconds = 0;
            clearInterval(clockTimer);
            correctAnswerF();
            correctAnswers++;
            questionUpdate();
        }
        else{
            seconds = 0;
            clearInterval(clockTimer);
            wrongAnswerF("#option3");
            correctAnswerF();
            questionUpdate();
        }
    }
})
