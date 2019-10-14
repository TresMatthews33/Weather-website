(function () {

})();

//Function to connect to the dark sky API and gethte weather data
function getWeatherInfo() {
    //https://api.darksky.net/forecast/5b2c7c8fd6bcc49bbafedd2df059a9e1/37.8267,-122.4233
    //Base-URL/APIKey/Latitude,Longitude

    $.ajax("https://api.darksky.net/forecast/5b2c7c8fd6bcc49bbafedd2df059a9e1/37.8267,-122.4233" + darkSkyKey + "5b2c7c8fd6bcc49bbafedd2df059a9e1", {dataType: "jsonp"})
    .done(function(data) {
        console.log(data);
    })
    .fail(function(error) {
        console.log(error);
    })
    .always(function() {
        console.log("Weather call complete!");
    })

}

//Function to connect to the MapQuest Geocoding API and get the geocoding data
function geocode() {

}