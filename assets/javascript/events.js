var latitude = 41.50;
var longitude = -81.61;
var date = "2018-12-23";
var resultNumber = 20;

function eventGenerator (response, i) {
    var eventHolder =  $("<div>");
    eventHolder.addClass("row m-2 p-4 rounded");
    eventHolder.attr("id", "event");
    var eventBox1 = $("<div>");
    eventBox1.addClass("col-6");
    eventBox1.attr("id", "event-box");
    var eventBox2 = $("<div>");
    eventBox2.addClass("col-6");
    eventBox2.attr("id", "event-box");

    //Showing Name
    var titleHolder = $("<p>");
    var eventName = response.events[i].title;
    titleHolder.text(eventName);
    eventBox1.append(titleHolder);

    //Showing Time
    var timeHolder = $("<p>");
    var eventTime = response.events[i].datetime_local;
    var eventTimeConverted = moment(eventTime);
    timeHolder.text(moment(eventTimeConverted).format("MMMM DD, YYYY: LT"));
    eventBox1.append(timeHolder);

    //Showing Image
    var imageHolder = $("<img>");
    imageHolder.addClass("m-2 rounded");
    imageHolder.attr("src", response.events[i].performers[0].image);
    imageHolder.attr("id", "performer-image");
    imageHolder.attr("alt", response.events[i].title);
    eventBox1.append(imageHolder);
    eventHolder.append(eventBox1);

    //Listing Venue
    var venueHolder = $("<div>");
    var nameHolder = $("<p>");
    var venueName = response.events[i].venue.name;
    nameHolder.text(venueName);
    venueHolder.append(nameHolder);
    var addressHolder = $("<p>");
    var venueAddress = response.events[i].venue.address;
    addressHolder.text(venueAddress);
    venueHolder.append(addressHolder);
    var extHolder = $("<p>");
    var extAddress = response.events[i].venue.extended_address;
    extHolder.text(extAddress);
    venueHolder.append(extHolder);
    eventBox2.append(venueHolder);

    //Showing tickets URL
    var urlHolder = $("<a>");
    urlHolder.addClass("row p-3");
    urlHolder.attr("target", "_blank");
    urlHolder.attr("href", response.events[i].url);
    urlHolder.text("Buy Tickets Here!");
    eventBox2.append(urlHolder);

    //Showing Prices Starting At!!:
    var lowestDeal = response.events[i].stats.lowest_price_good_deals;
    var lowestPrice = response.events[i].stats.lowest_price;
    if (lowestDeal > 0) {
        var priceHolder = $("<p>");
        priceHolder.text("Prices from SeatGeek as low as: $" + lowestDeal);
        eventBox2.append(priceHolder);
    } else if (lowestPrice > 0) {
        var priceHolder = $("<p>");
        priceHolder.text("Prices from SeatGeek as low as: $" + lowestPrice);
        eventBox2.append(priceHolder);
    }
    eventHolder.append(eventBox2);
    return eventHolder;
}


function exampleEventGenerator (response, i) {
    var eventHolder =  $("<div>");
    eventHolder.addClass("row m-2 p-4 rounded");
    eventHolder.attr("id", "event");
    var eventBox = $("<div>");
    eventBox.addClass("col");
    eventBox.attr("id", "event-box");

    //Showing Name
    var titleHolder = $("<p>");
    var eventName = response.events[i].title;
    titleHolder.text(eventName);
    eventBox.append(titleHolder);

    //Showing Time
    var timeHolder = $("<p>");
    var eventTime = response.events[i].datetime_local;
    var eventTimeConverted = moment(eventTime);
    timeHolder.text(moment(eventTimeConverted).format("MMMM DD, YYYY: LT"));
    eventBox.append(timeHolder);

    //Showing Image
    var imageHolder = $("<img>");
    imageHolder.addClass("my-2 rounded");
    imageHolder.attr("src", response.events[i].performers[0].image);
    imageHolder.attr("id", "performer-image");
    imageHolder.attr("alt", response.events[i].title);
    eventBox.append(imageHolder);

    //Showing tickets URL
    var urlHolder = $("<a>");
    urlHolder.addClass("row p-3");
    urlHolder.attr("target", "_blank");
    urlHolder.attr("href", response.events[i].url);
    urlHolder.text("Buy Tickets Here!");
    eventBox.append(urlHolder);
    eventHolder.append(eventBox);
    return eventHolder;
}


var queryURL = "https://api.seatgeek.com/2/events?client_id=MTQzMzg2MzV8MTU0NDQ5MjAwMi4xNg&client_secret=07a2f186cd6c200528c78f45c202b99f757f075db02c6aee3b12efda60c06fcf&lat="+ latitude +"&lon=" + longitude + "&datetime_local.gte=" + date + "&per_page=" + resultNumber;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    $("#event-example").append(exampleEventGenerator(response, 0));
    for (var i = 0; i < response.events.length; i++) {
        $("#result-holder").append(eventGenerator(response, i));
    }
});

