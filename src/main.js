var url = "https://opentdb.com/api.php?amount=1&type=multiple";
var buttonRefresh = document.querySelector(".buttonRefresh");
var questionArray = [];
var questionDiv = document.querySelectorAll(".questionCard");

buttonRefresh.addEventListener("click", function(){
    questionArray.splice(0, questionArray.length);
    for(var i=0;i<7;i++){
        fetch(url)
        .then(function(request){
            if(!request.ok){
                throw Error(request.status);
            }
            return request.json();
        })
        .then(function(response){
            var data = response.results[0];
            questionArray.push(data);
        })
        .catch(function(error){
            alert(error);
        });
    }
});

function questionUpdate(question){
    console.log("Hello");
}