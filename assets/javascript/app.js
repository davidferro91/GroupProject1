    var validInput = true;
    var latitude = 41.50;
    var longitude = -81.69;
    var resultNumber = 20;
    var zipcode;
    var date = moment().format("YYYY-MM-DD");
    $("#date-input").attr("value", date);
    
    //create dropdown options for state box
    var states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];
    // console.log(states.length);
    for (i = 0; i < states.length; i++) {
        opt = "<option>" + states[i] + "</option>";
        $("#state-input").append(opt);
    }
    
    //get user location via geolocation and stores longitude and latitude, this is called on load
    //function that does everything if browser supports geolocation
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            console.log("error: geolocation not available");
        }
    }
        
    //function called within getLocation that stores latitude and longitude
    function showPosition (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log("latitude: " + latitude);
        console.log("longitude: " + longitude);
        eventAPICall();
        barAPICall();
        restAPICall();
    }

    //if data is entered by user
    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        errorReset();
        $("#result-holder").empty();
        //get user entered date
        date = $("#date-input").val();
        
        //if date is before current date
        if (moment(date, "YYYY-MM-DD").isBefore(moment().format("YYYY-MM-DD"))){
           $("#date-input").addClass("invalid-input");
           validInput = false;
        }
        //if didn't enter city or zipcode
        if( ($("#zipcode-input").val() == "") && ($("#city-input").val() == "") ) {
            $("#zipcode-input").addClass("invalid-input");
            $("#city-input").addClass("invalid-input");
            validInput = false;
        }
    
        //if zipcode is not entered
        if ($("#zipcode-input").val() == "") {
            var city = $("#city-input").val().trim();
            var state = $("#state-input").val();
            var queryURL = "https://api.zippopotam.us/us/" + state + "/" + city;
            $.ajax({
                url: queryURL,
                method: "GET",
                error: function(xhr, status) {
                    console.log("ERROR");
                    $("#city-input").addClass("invalid-input");
                    validInput = false;
                }
            }).then(function (response) { 
                if (validInput == true) {
                    console.log(response);
                    latitude = response.places[0].latitude;
                    longitude = response.places[0].longitude;
                    console.log(latitude);
                    console.log(longitude);
                    eventAPICall();
                    barAPICall();
                    restAPICall();
                    locationDisplayer();
                }        
            });
        }
        
        //if zipcode is entered
        else {
            zipcode = $("#zipcode-input").val();
        
            var queryURL = "https://api.zippopotam.us/us/" + zipcode;

            $.ajax({
            url: queryURL,
            method: "GET",
            error: function(xhr, status) {
                console.log("ERROR");
                $("#zipcode-input").addClass("invalid-input");
                validInput = false;
            }
            }).then(function (response) {
                if (validInput == true) {
                    console.log(response);
                    latitude = response.places[0].latitude;
                    longitude = response.places[0].longitude;
                    console.log(latitude);
                    console.log(longitude);
                    eventAPICall();
                    barAPICall();
                    restAPICall();
                    locationDisplayer();
                }
            });
        }
    });
    
    //function to reset error class
    function errorReset () {
        $("#city-input").removeClass("invalid-input");
        $("#zipcode-input").removeClass("invalid-input");
        $("#date-input").removeClass("invalid-input");
        validInput = true;
    }

    function locationDisplayer () {
        $("#location-display").empty();
        var city = $("#city-input").val().trim();
        console.log(city);
        var state = $("#state-input").val();
        var zipcode = $("#zipcode-input").val();
        console.log(zipcode);
        if (zipcode == "") {
            $("#location-display").append("<h4>" + city + ", " + state + "</h4>");
        } else if (city == "") {
            $("#location-display").append("<h4>" + zipcode + "</h4>");
        } else {
            $("#location-display").append("<h4>" + city + ", " + state + " " + zipcode + "</h4>");
        }
        $("#city-input").val("");
        $("#zipcode-input").val("");
        $("#state-input").val("AK");
    }
    
    function eventGenerator (response, i) {
        var eventHolder =  $("<div>");
        eventHolder.addClass("row m-2 p-4 rounded");
        eventHolder.attr("id", "event");
        eventHolder.attr("data-aos", "zoom-in-up");
        eventHolder.attr("data-aos-anchor-placement", "center-bottom");
        eventHolder.attr("data-aos-delay", "500");
        eventHolder.attr("data-aos-duration", "500");
        var eventBox1 = $("<div>");
        eventBox1.addClass("col-6");
        eventBox1.attr("id", "event-box");
        var eventBox2 = $("<div>");
        eventBox2.addClass("col-6");
        eventBox2.attr("id", "event-box");
        
        if (response.events.length == 0) {
            var noEvent = $("<h4>");
            noEvent.text("Sorry, there are no events in this area on this date.");
            eventBox1.append(noEvent);
            eventHolder.append(eventBox1);
            return eventHolder;

        } else {

        //Showing Name
        var titleHolder = $("<h4>");
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
        var imageUrl = response.events[i].performers[0].image;
        if (imageUrl != null) {
            var imageHolder = $("<img>");
            imageHolder.addClass("m-2 rounded");
            imageHolder.attr("src", response.events[i].performers[0].image);
            imageHolder.attr("id", "performer-image");
            imageHolder.attr("alt", response.events[i].title);
            eventBox1.append(imageHolder);
        }
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
        
        //Showing tickets URL
        var urlHolder = $("<a>");
        urlHolder.addClass("row p-3");
        urlHolder.attr("target", "_blank");
        urlHolder.attr("href", response.events[i].url);
        urlHolder.text("Buy Tickets Here!");
        eventBox2.append(urlHolder);
            
        eventHolder.append(eventBox2);
        return eventHolder;

        }
    }
    
    function exampleEventGenerator (response, i) {
        var eventHolder =  $("<div>");
        eventHolder.addClass("row m-1 p-4 rounded");
        eventHolder.attr("id", "event");
        var eventBox = $("<div>");
        eventBox.addClass("col");
        eventBox.attr("id", "event-box");
    
        if (response.events.length == 0) {
            var noEvent = $("<h4>");
            noEvent.text("Sorry, there are no events in this area on this date.");
            eventBox.append(noEvent);
            eventHolder.append(eventBox);
            return eventHolder;

        } else {

        //Showing Name
        var titleHolder = $("<h4>");
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
        var imageUrl = response.events[i].performers[0].image;
        if (imageUrl != null) {
            var imageHolder = $("<img>");
            imageHolder.addClass("my-2 rounded");
            imageHolder.attr("src", response.events[i].performers[0].image);
            imageHolder.attr("id", "performer-image");
            imageHolder.attr("alt", response.events[i].title);
            eventBox.append(imageHolder);
        }
    
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
    }
    
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
        var nameHolder = $("<h4>");
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
        for (var j = 0; j < response.businesses[i].location.display_address.length; j++) {
            var barAddressHolder = $("<p>");
            var barAddress = response.businesses[i].location.display_address[j];
            barAddressHolder.text(barAddress);
            locationHolder.append(barAddressHolder);
        }
        barBox2.append(locationHolder);

        //Showing Rating
        var barRating = response.businesses[i].rating;
        if (barRating > 0) {
            var barRatingHolder = $("<p>");
            barRatingHolder.text("Rating: " + barRating);
            barBox2.append(barRatingHolder);
        }
        
        //Showing Price Level
        var barprice = response.businesses[i].price;
        if (barprice != undefined) {
            var priceHolder = $("<p>");
            priceHolder.text("Price Level: " + barprice);
            barBox2.append(priceHolder);
        }
        
        //Showing YELP url
        var barUrl = $("<a>");
        barUrl.addClass("row p-3");
        barUrl.attr("target", "_blank");
        barUrl.attr("href", response.businesses[i].url);
        barUrl.text("See more info here!");
        barBox2.append(barUrl);
            
        barHolder.append(barBox2);
        return barHolder;
    }
    
    function exampleBarGenerator (response, i) {
        var barHolder =  $("<div>");
        barHolder.addClass("row m-1 p-4 rounded");
        barHolder.attr("id", "bar");
        var barBox = $("<div>");
        barBox.addClass("col");
        barBox.attr("id", "bar-box");
    
        // Showing bar name
        var nameHolder = $("<h4>");
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
        barImageHolder.addClass("my-2 rounded");
        barImageHolder.attr("src", response.businesses[i].image_url);
        barImageHolder.attr("id", "bar-image");
        barImageHolder.attr("alt", response.businesses[i].name);
        barBox.append(barImageHolder);
    
        //Showing Link to YELP
        var barUrl = $("<a>");
        barUrl.addClass("row p-3");
        barUrl.attr("target", "_blank");
        barUrl.attr("href", response.businesses[i].url);
        barUrl.text("See more info here!");
        barBox.append(barUrl);
        barHolder.append(barBox);
        return barHolder;
    }

    function restaurantGenerator (response, i) {
        var restHolder =  $("<div>");
        restHolder.addClass("row m-2 p-4 rounded");
        restHolder.attr("id", "restaurant");
        restHolder.attr("data-aos", "zoom-in-up");
        restHolder.attr("data-aos-anchor-placement", "center-bottom");
        restHolder.attr("data-aos-delay", "500");
        restHolder.attr("data-aos-duration", "500");
        var restBox1 = $("<div>");
        restBox1.addClass("col-6");
        restBox1.attr("id", "rest-box");
        var restBox2 = $("<div>");
        restBox2.addClass("col-6");
        restBox2.attr("id", "rest-box");
    
        // Showing restaurant name
        var nameHolder = $("<h4>");
        var restName = response.restaurants[i].restaurant.name;
        nameHolder.text(restName);
        restBox1.append(nameHolder);
    
        //Showing cuisine types
        var cuisineHolder = $("<p>");
        var cuisineType = response.restaurants[i].restaurant.cuisines;
        cuisineHolder.text(cuisineType);
        restBox1.append(cuisineHolder);

        //Showing Stock Food Photo
        var stockImageHolder = $("<img>");
        stockImageHolder.addClass("m-2 rounded");
        stockImageHolder.attr("src", "assets/images/food_stock_photo.jpg");
        stockImageHolder.attr("id", "food-image");
        stockImageHolder.attr("alt", "stock_food_photo");
        restBox1.append(stockImageHolder);
        restHolder.append(restBox1);
    
        //Listing Address
        var restAddressHolder = $("<div>");
        var restAddLine = $("<p>");
        var restAddress = response.restaurants[i].restaurant.location.address;
        restAddLine.text(restAddress);
        restAddressHolder.append(restAddLine);
        var restLocHolder = $("<p>");
        var restLocality = response.restaurants[i].restaurant.location.locality_verbose;
        restLocHolder.text(restLocality);
        restAddressHolder.append(restLocHolder);
        restBox2.append(restAddressHolder);

        //Showing Average Price for Two
        var restPrice = response.restaurants[i].restaurant.average_cost_for_two;
        if (restPrice > 0) {
            var restPriceHolder = $("<p>");
            restPriceHolder.text("Average cost for two: $" + restPrice);
            restBox2.append(restPriceHolder);
        }

        //Showing Ratings
        var userRating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
        if (userRating > 0) {
            var ratingHolder = $("<p>");
            var ratingText = response.restaurants[i].restaurant.user_rating.rating_text;
            ratingHolder.text(ratingText + " rating: " + userRating);
            restBox2.append(ratingHolder);
        }

        //Showing Image URL
        var restImageUrl = $("<a>");
        restImageUrl.addClass("row p-3");
        restImageUrl.attr("target", "_blank");
        restImageUrl.attr("href", response.restaurants[i].restaurant.photos_url);
        restImageUrl.text("See our images here!");
        restBox2.append(restImageUrl);

        //Showing Menu URL
        var restMenuUrl = $("<a>");
        restMenuUrl.addClass("row p-3");
        restMenuUrl.attr("target", "_blank");
        restMenuUrl.attr("href", response.restaurants[i].restaurant.menu_url);
        restMenuUrl.text("See our menu here!");
        restBox2.append(restMenuUrl);

        restHolder.append(restBox2);
        return restHolder;
    }
        
    function exampleRestGenerator (response, i) {
        var restHolder =  $("<div>");
        restHolder.addClass("row m-1 p-4 rounded");
        restHolder.attr("id", "restaurant");
        var restBox = $("<div>");
        restBox.addClass("col");
        restBox.attr("id", "rest-box");
    
        // Showing restaurant name
        var nameHolder = $("<h4>");
        var restName = response.restaurants[i].restaurant.name;
        nameHolder.text(restName);
        restBox.append(nameHolder);
    
        //Showing cuisine types
        var cuisineHolder = $("<p>");
        var cuisineType = response.restaurants[i].restaurant.cuisines;
        cuisineHolder.text(cuisineType);
        restBox.append(cuisineHolder);

        //Showing Stock Food Photo
        var stockImageHolder = $("<img>");
        stockImageHolder.addClass("my-2 rounded");
        stockImageHolder.attr("src", "assets/images/food_stock_photo.jpg");
        stockImageHolder.attr("id", "food-image");
        stockImageHolder.attr("alt", "stock_food_photo");
        restBox.append(stockImageHolder);

        //Showing Menu URL
        var restMenuUrl = $("<a>");
        restMenuUrl.addClass("row p-3");
        restMenuUrl.attr("target", "_blank");
        restMenuUrl.attr("href", response.restaurants[i].restaurant.menu_url);
        restMenuUrl.text("See our menu here!");
        restBox.append(restMenuUrl);
        restHolder.append(restBox);
        return restHolder;
    }


    function eventAPICall () {
        // $("#event-example").empty();
        var eventQueryURL = "https://api.seatgeek.com/2/events?client_id=MTQzMzg2MzV8MTU0NDQ5MjAwMi4xNg&client_secret=07a2f186cd6c200528c78f45c202b99f757f075db02c6aee3b12efda60c06fcf&lat="+ latitude +"&lon=" + longitude + "&datetime_local.gte=" + date + "&per_page=" + resultNumber;
    
        $.ajax({
            url: eventQueryURL,
            method: "GET"
        }).then(function(response) {
            $("#event-example").empty();
            console.log(response);
            $("#event-example").append(exampleEventGenerator(response, 0));
        });
    }

    function barAPICall () {
        // $("#bar-example").empty();
        var barQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&latitude=" + latitude + "&longitude=" + longitude + "&sort_by=rating&limit=" + resultNumber;
    
        $.ajax({
            url: barQueryURL,
            headers: {
                'Authorization': 'Bearer QiSiGUzNr0RXh7Wq5EZoWw6hX-lkEoG8BDVQOxBK0r-SQZqlpTDyEPr1uQWIYf3K5WU8BkeVJmB4CM-CE9ErxihC8oKGR94orBwXVSIEYn9_lsbGMz70tdlFHxQPXHYx',
            },
            method: "GET",
            dataType: "json"
        }).then(function(response) {
            $("#bar-example").empty();
            console.log(response);
            $("#bar-example").append(exampleBarGenerator(response, 0));
        });
    }

    function restAPICall () {
        // $("#food-example").empty();
        var restaurantQueryURL = "https://developers.zomato.com/api/v2.1/search?count=" + resultNumber + "&lat="+ latitude +"&lon=" + longitude + "&radius=10000&sort=real_distance";
    
        $.ajax({
            url: restaurantQueryURL,
            headers: {
                "user-key": "152c06012922cebbca2dce06afb59357"
            },
            method: "GET",
            dataType: "json"
        }).then(function(response) {
            $("#food-example").empty();
            console.log(response);
            $("#food-example").append(exampleRestGenerator(response, 0));
        });
    }

    $("#event-button").on("click", function () {
        var eventQueryURL = "https://api.seatgeek.com/2/events?client_id=MTQzMzg2MzV8MTU0NDQ5MjAwMi4xNg&client_secret=07a2f186cd6c200528c78f45c202b99f757f075db02c6aee3b12efda60c06fcf&lat="+ latitude +"&lon=" + longitude + "&datetime_local.gte=" + date + "&per_page=" + resultNumber;
    
        $.ajax({
            url: eventQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#result-holder").empty();
            for (var i = 0; i < response.events.length; i++) {
                $("#result-holder").append(eventGenerator(response, i));
                $("#result-holder").append("<br>");
            }
        });
    });

    $("#bar-button").on("click", function() {
        var barQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&latitude=" + latitude + "&longitude=" + longitude + "&sort_by=rating&limit=" + resultNumber;
    
        $.ajax({
            url: barQueryURL,
            headers: {
                'Authorization': 'Bearer QiSiGUzNr0RXh7Wq5EZoWw6hX-lkEoG8BDVQOxBK0r-SQZqlpTDyEPr1uQWIYf3K5WU8BkeVJmB4CM-CE9ErxihC8oKGR94orBwXVSIEYn9_lsbGMz70tdlFHxQPXHYx',
            },
            method: "GET",
            dataType: "json"
        }).then(function(response) { 
            console.log(response);
            $("#result-holder").empty();
            for (var i = 0; i < response.businesses.length; i++) {
                $("#result-holder").append(barGenerator(response, i));
                $("#result-holder").append("<br>");
            }
        });
    });

    $("#food-button").on("click", function() {
        var restaurantQueryURL = "https://developers.zomato.com/api/v2.1/search?count=" + resultNumber + "&lat="+ latitude +"&lon=" + longitude + "&radius=10000&sort=real_distance";
    
        $.ajax({
            url: restaurantQueryURL,
            headers: {
                "user-key": "152c06012922cebbca2dce06afb59357"
            },
            method: "GET",
            dataType: "json"
        }).then(function(response) {
            console.log(response);
            $("#result-holder").empty();
            for (var i = 0; i < response.restaurants.length; i++) {
                $("#result-holder").append(restaurantGenerator(response, i));
                $("#result-holder").append("<br>");
            }
        });
    });

    //call function on page load
    getLocation();
    eventAPICall();
    barAPICall();
    restAPICall();