(function() {
 
    $("#submit").click(function () {
      const searchLocation = $("#searchBar").val();
      geocode(searchLocation);
      $("#searchBar").val("");
    });
  })();
  //Function to connect to the Dark Sky API
  function getWeatherInfo(latitude, longitude, city, state) {
    //https://api.darksky.net/forecast/73df02eb733faad1b783530f33626c95/37.8267,-122.4233
    //BaseAPI/APIKey/Lat,Long
    $.ajax(
      "https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," +longitude,
      { dataType: "jsonp" }
    )
    .done(function(data) {
        console.log(data);
        let templateHTML = $("#template").html();
        console.log(templateHTML);
        let temperature = data.currently.temperature;
        let cityState = data.currently.cityState;
        let currentConditions = data.currently.summary;
        let currentDayInfo = data.daily.data[0];
        let lowTemp = currentDayInfo.temperatureLow;
        let highTemp = currentDayInfo.temperatureHigh;
        let precipChance = currentDayInfo.precipProbability * 100;
    
        // Replace the string "@@city@@" with this function in the HTML
        templateHTML = templateHTML.replace("@@condition@@", currentConditions);
        templateHTML = templateHTML.replace("@@cityState@@", city + " " + state)
        templateHTML = templateHTML.replace("@@city@@", city);
        templateHTML = templateHTML.replace("@@highTemp@@", highTemp);
        templateHTML = templateHTML.replace("@@lowTemp@@", lowTemp);
        templateHTML = templateHTML.replace("@@precipitation@@", precipChance);
        templateHTML = templateHTML.replace("@@currentTemp@@", Math.round(temperature));
        $(".row").append(templateHTML);
    })
    .fail(function(error) {
        console.log(error);
    })
    .always(function() {
        console.log("Weather call complete!");
    })
}
  //Function to connect to the GeoCode API
  function geocode(location) {
    // Base URL + API KEY + & Location+ + address
    $.ajax(
      "http://www.mapquestapi.com/geocoding/v1/address?key=4vHLla0Dc3xCvm7e4usxxyGM1AmQFkxN" + "&location=" + location
    )
      .done(function(data) {
        let locations = data.results[0].locations[0]
        let lat = locations.latLng.lat;
        let lng = locations.latLng.lng;
        let city = locations.adminArea5;
        let state = locations.adminArea3;
        getWeatherInfo(lat, lng, city, state);
        
      })
      .fail(function(error) {
        console.log(error);
      })
      .always(function() {
        console.log("GeoCode call complete");
      });
  }