window.onload = function(){
//document ready
var longitude;
var latitude;
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
    //get user entered date
    date = $("#date-input").val();
    //if zipcode is not entered
    if($("#zipcode-input").val() == ""){
        var city = $("#city-input").val().trim();
        var state = $("#state-input").val();
        var apiKey = "l9q0mOZpkOQJ2keHRlEisVi8HOMgGRkkPZKSGhHh3n5OqSVRRUzVqDs42RvVbkjE"
        var queryURL = "https://www.zipcodeapi.com/rest/" + apiKey + "/city-zips.json/"+ city + "/" + state;
        $.ajax({
        url: queryURL,
        method: "GET"
        })
            .then(function(response){
                console.log(response);
                zipcode = response.zip_codes[0];
                console.log(zipcode);
            })
    }
    //if zipcode is entered
    else{
        zipcode=$("#zipcode-input").val();
    }
    var apiKey = "l9q0mOZpkOQJ2keHRlEisVi8HOMgGRkkPZKSGhHh3n5OqSVRRUzVqDs42RvVbkjE"
        var queryURL = "https://www.zipcodeapi.com/rest/"+ apiKey + "/info.json/"+ zipcode + "/degrees";
        $.ajax({
        url: queryURL,
        method: "GET"
        })
            .then(function(response){
                console.log(response)
                latitude = response.lat;
                longitude = response.lng;
            })


})




} //end of onload
