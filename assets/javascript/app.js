    var validInput = true;
    // var longitude = -81.667;
    // var latitude = 41.4946;
    var longitude;
    var latitude;
    var resultNumber = 20;
    var zipcode;
    var date = moment().format("YYYY-MM-DD");
    $("#date-input").attr("value", date);
    
    //create dropdown options for state box
    var states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];
    console.log(states.length);
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
    }

    //call function on page load
    getLocation();
        
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
                }
            });
        }
        
        $("#city-input").val("");
        $("#zipcode-input").val("");
        $("#state-input").val("AK");
    });
    
    //function to reset error class
    function errorReset () {
        $("#city-input").removeClass("invalid-input");
        $("#zipcode-input").removeClass("invalid-input");
        $("#date-input").removeClass("invalid-input");
        validInput = true;
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
        var barprice = response.businesses[i].price;
        if (barprice != undefined) {
            var priceHolder = $("<p>");
            priceHolder.text("Price Level: " + barprice);
            barBox2.append(priceHolder);
        }
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
        barUrl.text("See how we're rated!");
        barBox.append(barUrl);
        barHolder.append(barBox);
        return barHolder;
    }


    function eventAPICall () {
        $("#event-example").empty();
        var eventQueryURL = "https://api.seatgeek.com/2/events?client_id=MTQzMzg2MzV8MTU0NDQ5MjAwMi4xNg&client_secret=07a2f186cd6c200528c78f45c202b99f757f075db02c6aee3b12efda60c06fcf&lat="+ latitude +"&lon=" + longitude + "&datetime_local.gte=" + date + "&per_page=" + resultNumber;
    
        $.ajax({
            url: eventQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#event-example").append(exampleEventGenerator(response, 0));
        });
    }

    function barAPICall () {
        $("#bar-example").empty();
        var barQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&latitude=" + latitude + "&longitude=" + longitude + "&sort_by=rating";
    
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
        var barQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bars&latitude=" + latitude + "&longitude=" + longitude + "&sort_by=rating";
    
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
    })

