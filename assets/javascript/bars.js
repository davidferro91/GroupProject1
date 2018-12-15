//$.getJSON("https://maps.googleapis.com/maps/api/js?key=AIzaSyDIOdzXh8_8Z4Jj1zqdz7p7tn87J8Adf_c&bars=places&callback=initAutocomplete", function(data) {
    //console.log(data);

//}
//);

    var latitude = 41.50;
    var longitude = -81.61;
    var date = "2018-12-22";


    function barsGenerator (response, i) {
    var barsHolder =  $("<div>");
    barsHolder.addClass("row m-2 p-4");
    barsHolder.attr("id", "bars");
    var barsBox = $("<div>");
    barsBox.addClass("col");
    barsBox.attr("id", "bars-box");
    var nameHolder = $("<p>");
    var barsName = response.businesses[i].name;
    nameHolder.text(barsName);
    barsBox.append(nameHolder);
    // var timeHolder = $("<p>");
    // var barsTime = response.bars[i].datetime_local;
    // timeHolder.text(barsTime);
    // barsBox.append(timeHolder);

    var phoneHolder = $("<p>");
    var phone = response.businesses[i].display_phone;
    phoneHolder.text(phone);
    barsBox.append(phoneHolder);

    var barImageHolder = $("<img>");
    barImageHolder.attr("src", response.businesses[i].image_url);
    barImageHolder.attr("id", "bar-image");
    barImageHolder.attr("alt", response.businesses[i].name);
    barsBox.append(barImageHolder);
    var url = $("<a>");
    url.addClass("row p-3");
    url.attr("target", "_blank");
    url.attr("href", response.businesses[i].url);
    url.text("See how we're rated!");
    barsBox.append(url);
    barsHolder.append(barsBox);
    return barsHolder;
    
    }


// function barsGenerator (response, i) {
//     var term = $("bars");
// }


var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&latitude=" + latitude + "&longitude=" + longitude;



$.ajax({
    url: queryURL,
    headers: {
        'Authorization': 'Bearer QiSiGUzNr0RXh7Wq5EZoWw6hX-lkEoG8BDVQOxBK0r-SQZqlpTDyEPr1uQWIYf3K5WU8BkeVJmB4CM-CE9ErxihC8oKGR94orBwXVSIEYn9_lsbGMz70tdlFHxQPXHYx',
    },
    method: "GET",
    dataType: "json"
}).then(function(response) { 
    console.log(response);
    $("#bar-example").append(barsGenerator(response, 0));
    for (var i = 0; i < response.businesses.length; i++) {
        $("#result-holder").append(barsGenerator(response, i));
    }
});


