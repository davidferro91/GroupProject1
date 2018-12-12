var latitude = 41.50;
var longitude = -81.61;
var date = "2018-12-22";

function eventGenerator (response, i) {
    var eventHolder =  $("<div>");
    eventHolder.addClass("row m-2 p-4");
    eventHolder.attr("id", "event");
    var eventBox = $("<div>");
    eventBox.addClass("col");
    eventBox.attr("id", "event-box");
    var titleHolder = $("<p>");
    var eventName = response.events[i].title;
    titleHolder.text(eventName);
    eventBox.append(titleHolder);
    var timeHolder = $("<p>");
    var eventTime = response.events[i].datetime_local;
    timeHolder.text(eventTime);
    eventBox.append(timeHolder);
    var imageHolder = $("<img>");
    imageHolder.attr("src", response.events[i].performers[0].image);
    imageHolder.attr("id", "performer-image");
    imageHolder.attr("alt", response.events[i].title);
    eventBox.append(imageHolder);
    var urlHolder = $("<a>");
    urlHolder.addClass("row p-3");
    urlHolder.attr("target", "_blank");
    urlHolder.attr("href", response.events[i].url);
    urlHolder.text("Buy Tickets Here!");
    eventBox.append(urlHolder);
    eventHolder.append(eventBox);
    return eventHolder;
}


var queryURL = "https://api.seatgeek.com/2/events?client_id=MTQzMzg2MzV8MTU0NDQ5MjAwMi4xNg&client_secret=07a2f186cd6c200528c78f45c202b99f757f075db02c6aee3b12efda60c06fcf&lat="+ latitude +"&lon=" + longitude + "&datetime_local.gte=" + date;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    $("#event-example").append(eventGenerator(response, 0));
    for (var i = 0; i < response.events.length; i++) {
        $("#result-holder").append(eventGenerator(response, i));
    }
});

