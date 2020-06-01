function getAllGames(){
    $.getJSON("https://api.rawg.io/api/games?page_size=40&dates=2010-01-01,2018-12-31.1960-01-01,1969-12-31", showdata = function(data){

        var title = document.getElementById("gamesearch");

        console.log(data);
        console.log(data.results);
        $(".result").text(title);
    });
}

function getGameByName(){
    var title = document.getElementById("gamesearch").value;
    console.log(title);
    $.getJSON("https://api.rawg.io/api/games?search=" + title, showdata = function(data){

        var results = data.results;
        var generateResult = document.getElementById("result");
        console.log(results[0].name);
        
        for (var i = 0; i < results.length; i++){
            generateResult.innerHTML += "<div class='game'><p>" + results[i].name + "</p> <br>" +
            "Release date: " + results[i].released + "<br>" +
            "Rating: " + results[i].rating;
        }
    });
}

function reset(){
    $("#result").text("");
}