window.onload = function(){
//document ready
var longitude = "";
var latitude = "";
var date = moment().format("YYYY-MM-DD");


//get user location via geolocation and stores longitude and latitude, this is called on load
    //function that does everything if browser supports geolocation
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else{
            console.log("error: geolocation no available");
        }
    }
    //function called within getLocation that stores latitude and longitude
    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log("latitude: " + latitude);
        console.log("longitude: " + longitude);
    }
    //call function on page load
    getLocation();
    
//if data is entered by user
$("#submit-button").on("click", function(event){
    event.preventDefault();
    //get user entered date
    date = $("#date-input").val();
    //get lat/long from user location
    locationInput = $("#location-input").val().trim();
    //check if input is a number
    locationCheck = $.isNumeric(locationInput);
    //if entry is not zipcode convert to zipcode
    if (locationCheck == false){
        //need to split city from state 
        console.log("not number")
        var locationSplit = locationInput.split(",")
        var city = locationSplit[0].trim();
        var state = locationSplit[1].trim();
        //get zipcode for city and state
        var apiKey = "l9q0mOZpkOQJ2keHRlEisVi8HOMgGRkkPZKSGhHh3n5OqSVRRUzVqDs42RvVbkjE"
        var queryURL = "https://www.zipcodeapi.com/rest/" + apiKey + "/city-zips.json/"+ city + "/" + state;
        $.ajax({
        url: queryURL,
        method: "GET"
        })
            .then(function(response){
                console.log(response)
                //grab zipcode here
            })
    }
    else{
        zipcode = locationInput;
        console.log(zipcode)
    }
    //get lat/long from zipcode
    var apiKey = "l9q0mOZpkOQJ2keHRlEisVi8HOMgGRkkPZKSGhHh3n5OqSVRRUzVqDs42RvVbkjE"
    var queryURL = "https://www.zipcodeapi.com/rest/"+ apiKey + "/info.json/"+ zipcode + "/degrees";
    $.ajax({
    url: queryURL,
    method: "GET"
    })
        .then(function(response){
            console.log(response)
        })
    
    
})




} //end of onload
