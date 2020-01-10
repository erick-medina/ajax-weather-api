let apiKey = '1758be2b00925f7c46528a12c0005c59'; // personal API key
let units = 'metric'; // 'metric' to get celsius
let searchMethod; // q or zip

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) // '5' for the characters postcode. 'Number' to make every single item a number
        searchMethod = 'zip';

    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm); // to call the method
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${apiKey}&units=${units}`).then(result => { // calling url. 'Result' to get the information from the server.
        return result.json(); // to convert into a json
    }).then(result => {
        init(result); // result from the server
    })
}
function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) { // background images for weather conditions
        case 'Clear':
            document.body.style.backgroundImage = 'url("images/water-blue-ocean.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("images/pexels-photo-289649.jpeg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("images/pexels-photo-281260.jpeg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("images/lightning-storm-weather-sky-53459.jpeg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("images/clouds-cloudporn-weather-lookup-158163.jpeg")';
            break;

        default:
            break;
    }

let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
let temperatureElement = document.getElementById('temperature');
let humidityElement = document.getElementById('humidity');
let windSpeedElement = document.getElementById('windSpeed');
let cityHeader = document.getElementById('cityHeader');
let weatherIcon = document.getElementById('documentIconImg');

weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png'; // get icon URL

let resultDescription = resultFromServer.weather[0].description; // to give a description about the weather condition
weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1); // for the uppercase

temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176'; // to display temperature
windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s'; // to display wind
cityHeader.innerHTML = resultFromServer.name; // to display city name
humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%'; // to display humidity
}

document.getElementById('searchBtn').addEventListener('click', () => { // function added for the search button
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});






