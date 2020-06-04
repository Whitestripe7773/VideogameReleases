var pageLastMonth = 1;
var pageThisMonth = 1;

function getAllGames(){
    $.getJSON("https://api.rawg.io/api/games?page_size=40&dates=2010-01-01,2018-12-31.1960-01-01,1969-12-31", showdata = function(data){

        var title = document.getElementById("gamesearch");

        console.log(data);
        console.log(data.results);
        $(".result").text(title);
    });
}

function main(){
    getNewReleasesLastMonth();
    getNewReleasesNextMonth();
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

function getNewReleasesLastMonth(){
    var todaysDate = new Date();
    var lastMonthDate = new Date();
    var date = todaysDate.getFullYear()+'-'+(todaysDate.getMonth()+1)+'-'+todaysDate.getDate();
    var date2 = lastMonthDate.getFullYear()+'-'+(lastMonthDate.getMonth())+'-'+lastMonthDate.getDate();
    var today = formatDateToStringThisMonth(date);
    var lastMonth = formatDateToStringLastMonth(date2);

    $.getJSON("https://api.rawg.io/api/games?page_size=40&dates=" + lastMonth + "," + today + "&page=" + pageLastMonth, showdata = function(data){

        var results = data.results;
        var generateResults = document.getElementById("newReleasesLast");

        var platformsArr; 

        for (var i = 0; i < results.length; i++){
            platformsArr = results[i].platforms;
            generateResults.innerHTML += "<a target='_blank' class='divlink' href='https://google.de/search?q=" + results[i].name + "'><div class='game'><p>" + results[i].name + "</p> <br>" +
            "Release date: " + results[i].released + "<br>" +
            "Rating: " + results[i].rating + "<br>" + 
            "Platforms: ";
            platformsArr.forEach(element => {
                generateResults.innerHTML += " | " + element.platform.name + " | ";
            });
            generateResults.innerHTML += "</a>";
        }
    });
    pageLastMonth += 1;
}

function getNewReleasesNextMonth(){
    var todaysDate = new Date();
    var nextMonth = new Date();
    var date = todaysDate.getFullYear()+'-'+(todaysDate.getMonth()+1)+'-'+todaysDate.getDate();
    var date2 = nextMonth.getFullYear()+'-'+(nextMonth.getMonth())+'-'+nextMonth.getDate();
    var today = formatDateToStringThisMonth(date);
    var next = formatDateToStringNextMonth(date2);

    $.getJSON("https://api.rawg.io/api/games?page_size=40&dates=" + today + "," + next + "&page=" + pageThisMonth, showdata = function(data){

        var results = data.results;
        var generateResults = document.getElementById("newReleasesNext");

        console.log(data);

        var platformsArr; 

        for (var i = 0; i < results.length; i++){
            platformsArr = results[i].platforms;
            generateResults.innerHTML += "<a target='_blank' class='divlink' href='https://google.de/search?q=" + results[i].name + "'><div class='game'><p>" + results[i].name + "</p> <br>" +
            "Release date: " + results[i].released + "<br>" +
            "Rating: " + results[i].rating + "<br>" +
            "Platforms: ";
            platformsArr.forEach(element => {
                generateResults.innerHTML += " | " + element.platform.name + " | ";
            });
            generateResults.innerHTML += "</a>";
        }
    });
    pageThisMonth += 1;
}

function formatDateToStringThisMonth(date){
    date = new Date();
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth()+1);
    var yyyy = date.getFullYear();

    return (yyyy + "-" + MM + "-" + dd)
}

function formatDateToStringLastMonth(date){
    date = new Date();
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth());
    var yyyy = date.getFullYear();

    return (yyyy + "-" + MM + "-" + dd)
}

function formatDateToStringNextMonth(date){
    date = new Date();
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth()+2);
    var yyyy = date.getFullYear();

    return (yyyy + "-" + MM + "-" + dd)
}

function reset(){
    $("#result").text("");
}