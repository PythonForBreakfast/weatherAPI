    //Declare initial variables
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var dtime = new Date();
    var day = days[ dtime.getDay() ];
    var month = months[ dtime.getMonth() ];
    var APPID = 'f2b53e7ee56cee418dca0659c75a0fb8';

    //This function converts the unix time that we receive from the API.
    function convertTime(t) {
        var dt = new Date(t*1000);
        var hr = dt.getHours();
        var m = "0" + dt.getMinutes();
        var s = "0" + dt.getSeconds();
        return hr+ ':' + m.substr(-2);  
    }

    //This function fires off when the "Get Weather" button is clicked. It calls the function that gets information from the API with the user input.
    function getWeather() {
        let zipCode = document.getElementById("zip").value;

        if (zipCode.length === 5) {
            displayWeather(zipCode);

            $("#container")
                .css("display", "flex")
                .hide()
                .fadeIn("slow");  
        }
    }
    
    //This function calls the API and updates the DOM with the information it receives. 
    function displayWeather(zipCode) {
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" + APPID, function(data){
            $("#cityName").text(data.name);
            $("#icon").attr("src","images/" + data.weather[0].icon + ".png");
            $("#day").text(day);
            $("#date").text(month + " " + dtime.getDate() + ", 2018");
            $("#temperature").text(Math.floor(data.main.temp * (9/5) -459.67) + "°F");
            $("#time").html(convertTime(data.dt));
            $("#humidity").html(data.main.humidity + "%");
            $("#windSpeed").html(data.wind.speed + " MPH");
            $("#highTemp").html(Math.floor(data.main.temp_max * (9/5) -459.67) + "°F");
            $("#lowTemp").html(Math.floor(data.main.temp_min * (9/5) -459.67) + "°F");
            $("#sunrise").html(convertTime(data.sys.sunrise));
            $("#sunset").html(convertTime(data.sys.sunset));

            if (data.weather[0].icon[2] == "d") {
                $("body").css("background-image","url('images/sunnysky2.jpg')");
            } else {
                $("body").css("background-image","url('images/nightsky.jpg')");
            }
        });
    }