// var latitude = 41.50;
// var longitude = -81.61;
// var date = "2018-12-22";


function barGenerator (response, i) {
    var barHolder =  $("<div>");
    barHolder.addClass("row m-2 p-4 rounded");
    barHolder.attr("id", "bar");
    barHolder.attr("data-aos", "zoom-in-up");
    barHolder.attr("data-aos-anchor-placement", "center-bottom");
    barHolder.attr("data-aos-delay", "500");
    barHolder.attr("data-aos-duration", "500");
    var barBox1 = $("<div>");
    barBox1.addClass("col-6");
    barBox1.attr("id", "bar-box");
    var barBox2 = $("<div>");
    barBox2.addClass("col-6");
    barBox2.attr("id", "bar-box");

    // Showing bar name
    var nameHolder = $("<p>");
    var barName = response.businesses[i].name;
    nameHolder.text(barName);
    barBox1.append(nameHolder);

    //Showing phone number
    var phoneHolder = $("<p>");
    var phoneNumber = response.businesses[i].display_phone;
    phoneHolder.text(phoneNumber);
    barBox1.append(phoneHolder);

    //Showing Image
    var barImageHolder = $("<img>");
    barImageHolder.addClass("m-2 rounded");
    barImageHolder.attr("src", response.businesses[i].image_url);
    barImageHolder.attr("id", "bar-image");
    barImageHolder.attr("alt", response.businesses[i].name);
    barBox1.append(barImageHolder);
    barHolder.append(barBox1);
    
    //Listing Address
    var locationHolder = $("<div>");
    var barNameHolder = $("<p>");
    var locationName = response.businesses[i].name;
    barNameHolder.text(locationName);
    locationHolder.append(barNameHolder);
    for (var j = 0; j < response.businesses[i].location.display_address.length; j++) {
        var barAddressHolder = $("<p>");
        var barAddress = response.businesses[i].location.display_address[j];
        barAddressHolder.text(barAddress);
        locationHolder.append(barAddressHolder);
    }
    barBox2.append(locationHolder);

    //Showing YELP url
    var barUrl = $("<a>");
    barUrl.addClass("row p-3");
    barUrl.attr("target", "_blank");
    barUrl.attr("href", response.businesses[i].url);
    barUrl.text("See how we're rated!");
    barBox2.append(barUrl);

    //Showing Price Level
    var priceHolder = $("<p>");
    var barprice = response.businesses[i].price;
    priceHolder.text("Price Level: " + barprice);
    barBox2.append(priceHolder);
    barHolder.append(barBox2);
    return barHolder;
}


function exampleBarGenerator (response, i) {
    var barHolder =  $("<div>");
    barHolder.addClass("row m-2 p-4 rounded");
    barHolder.attr("id", "bar");
    var barBox = $("<div>");
    barBox.addClass("col");
    barBox.attr("id", "bar-box");

    // Showing bar name
    var nameHolder = $("<p>");
    var barName = response.businesses[i].name;
    nameHolder.text(barName);
    barBox.append(nameHolder);

    //Showing phone number
    var phoneHolder = $("<p>");
    var phoneNumber = response.businesses[i].display_phone;
    phoneHolder.text(phoneNumber);
    barBox.append(phoneHolder);

    //Showing Image
    var barImageHolder = $("<img>");
    barImageHolder.addClass("m-2 rounded");
    barImageHolder.attr("src", response.businesses[i].image_url);
    barImageHolder.attr("id", "bar-image");
    barImageHolder.attr("alt", response.businesses[i].name);
    barBox.append(barImageHolder);

    //Showing Price Level
    var priceHolder = $("<p>");
    var barprice = response.businesses[i].price;
    priceHolder.text("Price Level: " + barprice);
    barBox.append(priceHolder);
    barHolder.append(barBox);
    return barHolder;
}


var barQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&latitude=" + latitude + "&longitude=" + longitude;

$.ajax({
    url: barQueryURL,
    headers: {
        'Authorization': 'Bearer QiSiGUzNr0RXh7Wq5EZoWw6hX-lkEoG8BDVQOxBK0r-SQZqlpTDyEPr1uQWIYf3K5WU8BkeVJmB4CM-CE9ErxihC8oKGR94orBwXVSIEYn9_lsbGMz70tdlFHxQPXHYx',
    },
    method: "GET",
    dataType: "json"
}).then(function(response) { 
    console.log(response);
    $("#bar-example").append(exampleBarGenerator(response, 0));
    for (var i = 0; i < response.businesses.length; i++) {
        $("#result-holder").append(barGenerator(response, i));
        $("#result-holder").append("<br>");
    }
});