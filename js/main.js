/**
 * Created by Henry on 15.02.17.
 */
var unit = "celsius";
var temp = 0;

$(document).ready(function () {
    getLocation();


    function getLocation() {
        $.getJSON("http://ip-api.com/json/?fields=country,city,lat,lon", function (location) {

            var latitude = location.lat;
            var longitude = location.lon;

            getWeather(latitude, longitude);
        });
    }

    function getWeather(latitude, longitude) {
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude
            + "&appid=42d4c944c359e9102a517de5e8b362f7", function (data) {

            console.log(data);

            displayWeather(data.name, data.sys.country, data.weather[0]);
            displayTemp(data.main.temp, "celsius");
            temp = data.main.temp;
        });
    }

    function displayWeather(city, country, weather) {
        $("#location").html(city + ", " + country);
        $("#condition").html(weather.main);

        var weatherId = "owf-" + weather.id;
        $("#icon").addClass(weatherId);
    }

    function displayTemp(temp, desiredUnit) {
        if (desiredUnit === "celsius") {
            var celsius = Math.round(temp - 273.15);
            $("#temp").html(celsius + " °C");
        }

        else if (desiredUnit === "fahrenheit") {
            var fahrenheit = Math.round((temp * (9 / 5)) - 459.67);
            $("#temp").html(fahrenheit + " °F");
        }
    }

    $("#temp").click(function () {
        if (unit === "celsius") {
            unit = "fahrenheit";
        }

        else if (unit === "fahrenheit") {
            unit = "celsius";
        }

        displayTemp(temp, unit);
    });

});