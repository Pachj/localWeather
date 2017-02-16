/**
 * Created by Henry on 15.02.17.
 */
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
        + "&appid=42d4c944c359e9102a517de5e8b362f7", function (weather) {

        console.log(weather);
    });
}

