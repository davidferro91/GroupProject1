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
    console.log(locationInput)
    //parse int of value user entered and check if number
    locationCheck = parseInt(locationInput);
    //if entry is not zipcode convert to zipcode
    if (locationCheck = NaN){
            

    }
    //get lat/long from zipcode

    
    
})


} //end of onload
