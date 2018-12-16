window.onload = function() {
//document ready
var validInput = true;
var longitude = -81.667;
var latitude = 41.4946;
var zipcode;
var date = moment().format("YYYY-MM-DD");
$("#date-input").attr("value", date)

//create dropdown options for state box
var states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];
console.log(states.length)
for(i = 0; i < states.length; i++){
    opt = "<option>" + states[i] + "</option>"
    $("#state-input").append(opt);
}

//get user location via geolocation and stores longitude and latitude, this is called on load
    //function that does everything if browser supports geolocation
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else{
            console.log("error: geolocation not available");
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
    errorReset();
    //get user entered date
    date = $("#date-input").val();
    
    //if date is before current date
    if (moment(date, "YYYY-MM-DD").isBefore(moment().format("YYYY-MM-DD"))){
       $("#date-input").addClass("invalid-input");
       validInput = false;
    }
    //if didn't enter city or zipcode
    if(($("#zipcode-input").val() == "") && ($("#city-input").val() == "")){
        $("#zipcode-input").addClass("invalid-input")
        $("#city-input").addClass("invalid-input")
        validInput = false;
    }

    //if zipcode is not entered
    if($("#zipcode-input").val() == ""){
        var city = $("#city-input").val().trim();
        var state = $("#state-input").val();
        var queryURL = "http://api.zippopotam.us/us/" + state + "/" + city
        $.ajax({
        url: queryURL,
        method: "GET",
        error: function(xhr, status) {
            console.log("ERROR")
            $("#city-input").addClass("invalid-input")
            validInput = false;
        }
        })
            .then(function(response){ 
                if(validInput == true){
                console.log(response)
                latitude = response.places[0].latitude
                longitude = response.places[0].longitude
                console.log(latitude)
                console.log(longitude)
                }
                
            })
    }
    
    //if zipcode is entered
    else{
        zipcode=$("#zipcode-input").val();
    }
        var queryURL = "http://api.zippopotam.us/us/" + zipcode
        $.ajax({
        url: queryURL,
        method: "GET",
        error: function(xhr, status) {
            console.log("ERROR")
            $("#zipcode-input").addClass("invalid-input")
            validInput = false;
        }
        })
            .then(function(response){
                if(validInput == true){
                console.log(response)
                latitude = response.places[0].latitude
                longitude = response.places[0].longitude
                console.log(latitude)
                console.log(longitude)
                }
            })


})

//function to reset error class
function errorReset (){
    $("#city-input").removeClass("invalid-input")
    $("#zipcode-input").removeClass("invalid-input")
    $("#date-input").removeClass("invalid-input")
    validInput = true;
}


} //end of onload
