/**
 * Created by Henry on 15.02.17.
 */
var tempUnit = "celsius";
var temp = 0;

var windUnit = "kph";
var wind = 0;

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

            displayWind(data.wind.speed, "kph");
            wind = data.wind.speed;
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

    function displayWind(wind, desiredUnit) {
        if (desiredUnit === "kph") {
            var kph = Math.round(wind * 1.609344);
            $("#wind").html(kph + " KpH");
        }
        else if (desiredUnit === "mph") {
            $("#wind").html(wind + " MpH");
        }
    }

    $("#temp").click(function () {
        if (tempUnit === "celsius") {
            tempUnit = "fahrenheit";
        }

        else if (tempUnit === "fahrenheit") {
            tempUnit = "celsius";
        }

        displayTemp(temp, tempUnit);
    });

    $("#wind").click(function () {
        if (windUnit === "kph") {
            windUnit = "mph";
        }
        else if (windUnit === "mph") {
            windUnit = "kph";
        }

        displayWind(wind, windUnit);
    });

});