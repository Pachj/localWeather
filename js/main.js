/**
 * Created by Henry on 15.02.17.
 */
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (location) {
            $("#test").html(location.coords.latitude + " " + location.coords.longitude);

        })
    }
}

$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=47&lon=8&appid=42d4c944c359e9102a517de5e8b362f7", function (data) {
    console.log(data.name);
});