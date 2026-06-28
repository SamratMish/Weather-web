const apiKey = "e62fc0e7aadf4de2800143819262006";

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("weatherResult").style.display = "none";

    try{

        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
        );

        const data = await response.json();

        if(data.error){
            alert(data.error.message);
            document.getElementById("loading").style.display = "none";
            return;
        }

        document.getElementById("city").innerText =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById("temp").innerText =
            `${data.current.temp_c}°C`;

        document.getElementById("condition").innerText =
            data.current.condition.text;

        document.getElementById("humidity").innerText =
            `${data.current.humidity}%`;

        document.getElementById("wind").innerText =
            `${data.current.wind_kph} km/h`;

        document.getElementById("icon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("loading").style.display = "none";
        document.getElementById("weatherResult").style.display = "block";

    } catch(error){

        document.getElementById("loading").style.display = "none";
        alert("Failed to fetch weather data");

        console.error(error);
    }
}