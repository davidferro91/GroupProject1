var latitude = 41.50;
var longitude = -81.61;
var date = "2018-12-23";
var resultNumber = 20;

function restaurantsGenerator (response, i) {
    var restaurantsHolder =  $("<div>");
    restaurantsHolder.addClass("row m-2 p-4 rounded");
    restaurantsHolder.attr("id", "resturants");
    var restaurantsBox1 = $("<div>");
    restaurantsBox1.addClass("col-6");
    restaurantsBox1.attr("id", "resturants-box");
    var restaurantsBox2 = $("<div>");
    restaurantsBox2.addClass("col-6");
    restaurantsBox2.attr("id", "restrurants-box");

    //Showing Name
    var nameHolder = $("<p>");
    var restaurantsName = response.restaurants.restaurant[i].name;
    nameHolder.text(restaurantsName);
    restaurantsBox1.append(nameHolder);

//     //Showing Time
//     var timeHolder = $("<p>");
//     var eventTime = response.events[i].datetime_local;
//     var eventTimeConverted = moment(eventTime);
//     timeHolder.text(moment(eventTimeConverted).format("MMMM DD, YYYY: LT"));
    // restaurantsBox1.append(timeHolder);

    // Showing Image
    // var photosHolder = $("<img>");
    // photosHolder.addClass("m-2 rounded");
    // photosHolder.attr("src", response.restaurants.restaurant[i].photos_url);
    // photosHolder.attr("id", "restaurants-image");
    // photosHolder.attr("alt", response.restaurants.restaurant[i].name);
    // restaurantsBox1.append(photosHolder);
    // restaurantsHolder.append(restaurantsBox1);

    //Listing Venue
    // var locationHolder = $("<div>");
    // var nameHolder = $("<p>");
    // var locationName = response.restaurants[i].location.name;
    // nameHolder.text(locationName);
    // locationHolder.append(nameHolder);
    // var addressHolder = $("<p>");
    // var locationAddress = response.restaurants[i].location.address;
    // addressHolder.text(locationAddress);
    // locationHolder.append(addressHolder);
    // var extHolder = $("<p>");
    // var extAddress = response.restaurants[i].location.extended_address;
    // extHolder.text(extAddress);
    // locationHolder.append(extHolder);
    // restaurantsBox2.append(locationHolder);

//     //Showing tickets URL
//     var urlHolder = $("<a>");
//     urlHolder.addClass("row p-3");
//     urlHolder.attr("target", "_blank");
//     urlHolder.attr("href", response.events[i].url);
//     urlHolder.text("Buy Tickets Here!");
//     eventBox2.append(urlHolder);

//     //Showing Prices Starting At!!:
//     var lowestDeal = response.events[i].stats.lowest_price_good_deals;
//     var lowestPrice = response.events[i].stats.lowest_price;
//     if (lowestDeal > 0) {
//         var priceHolder = $("<p>");
//         priceHolder.text("Prices from SeatGeek as low as: $" + lowestDeal);
//         eventBox2.append(priceHolder);
//     } else if (lowestPrice > 0) {
//         var priceHolder = $("<p>");
//         priceHolder.text("Prices from SeatGeek as low as: $" + lowestPrice);
//         eventBox2.append(priceHolder);
//     }
//     eventHolder.append(eventBox2);
//     return eventHolder;
// }
























// function exampleEventGenerator (response, i) {
//     var eventHolder =  $("<div>");
//     eventHolder.addClass("row m-2 p-4 rounded");
//     eventHolder.attr("id", "event");
//     var eventBox = $("<div>");
//     eventBox.addClass("col");
//     eventBox.attr("id", "event-box");

//     //Showing Name
//     var titleHolder = $("<p>");
//     var eventName = response.events[i].title;
//     titleHolder.text(eventName);
//     eventBox.append(titleHolder);

//     //Showing Time
//     var timeHolder = $("<p>");
//     var eventTime = response.events[i].datetime_local;
//     var eventTimeConverted = moment(eventTime);
//     timeHolder.text(moment(eventTimeConverted).format("MMMM DD, YYYY: LT"));
//     eventBox.append(timeHolder);

//     //Showing Image
//     var imageHolder = $("<img>");
//     imageHolder.addClass("my-2 rounded");
//     imageHolder.attr("src", response.events[i].performers[0].image);
//     imageHolder.attr("id", "performer-image");
//     imageHolder.attr("alt", response.events[i].title);
//     eventBox.append(imageHolder);

//     //Showing tickets URL
//     var urlHolder = $("<a>");
//     urlHolder.addClass("row p-3");
//     urlHolder.attr("target", "_blank");
//     urlHolder.attr("href", response.events[i].url);
//     urlHolder.text("Buy Tickets Here!");
//     eventBox.append(urlHolder);
//     eventHolder.append(eventBox);
//     return eventHolder;
}


var queryURL = "https://developers.zomato.com/api/v2.1/search?count=20&lat="+ latitude +"&lon=" + longitude + "&radius=20000&sort=rating";

$.ajax({
    url: queryURL,
    headers: {
        "user-key": "152c06012922cebbca2dce06afb59357"
    },
    method: "GET",
    dataType: "json"
}).then(function(response) {
    console.log(response);
    // response.restaurants.restaurant[0]
    console.log(response.restaurants.restaurant[0].currency)
    // $("#restaurants-example").append(exampleRestaurantsGenerator(response, 0));
    for (var i = 0; i < response.restaurants.restaurant.length; i++) {
        $("#result-holder").append(restaurantsGenerator(response, i));
    }
});

