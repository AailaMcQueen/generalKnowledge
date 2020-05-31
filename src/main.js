var url = "https://opentdb.com/api.php?amount=1&type=multiple"


fetch(url)
.then(function(request){
    if(!request.ok){
        throw Error(request.status);
    }
    return request.json();
})
.then(function(response){
    var data = response.results[0];
    return data;
})
.catch(function(error){
    alert(error);
});