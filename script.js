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
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${apiKey}&units=${units}`).then(result => { // calling url. 'Result' to get the information from the server.
        return result.json(); // to convert into a json
    }).then(data => {
        /*init(data); // result from the server */
        console.log(data);

        let tempArray= []; // empty array for the temperature
        let descripArray = []; // empty array for the description

        for (let i = 0; i < 40 ; i++) {
            tempArray.push(data.list[i].main.temp);
        }
        console.log(tempArray);

        let dayOne = tempArray.slice(0,8);
        let dayTwo = tempArray.slice(8,16);
        let dayThree = tempArray.slice(16,24);
        let dayFour = tempArray.slice(24,32);
        let dayFive = tempArray.slice(32,40);

        let averageForDays = arr => Math.floor((arr.reduce((a, b) => a + b, 0)  / arr.length )) + '&#176'; // to calculate average for day

        // getting id 'temperature'
        let temperatureElementOne = document.getElementById('temperatureOne');
        let temperatureElementTwo = document.getElementById('temperatureTwo');
        let temperatureElementThree = document.getElementById('temperatureThree');
        let temperatureElementFour = document.getElementById('temperatureFour');
        let temperatureElementFive = document.getElementById('temperatureFive');

        // getting id 'city'
        let cityHeaderOne = document.getElementById('cityHeaderOne');

        // getting id 'description weather'
        let weatherDescriptionHeaderOne = document.getElementById('weatherDescriptionOne');
        let weatherDescriptionHeaderTwo = document.getElementById('weatherDescriptionTwo');
        let weatherDescriptionHeaderThree = document.getElementById('weatherDescriptionThree');
        let weatherDescriptionHeaderFour = document.getElementById('weatherDescriptionFour');
        let weatherDescriptionHeaderFive = document.getElementById('weatherDescriptionFive');

        cityHeaderOne.innerHTML = data.city.name;

        // calculating description weather
        let descripWeatherOne = data.list[0].weather[0].description;
        weatherDescriptionHeaderOne.innerHTML = descripWeatherOne.charAt(0).toUpperCase() + descripWeatherOne.slice(1);




        temperatureElementOne.innerHTML = averageForDays(dayOne); // to display temperature day one
        temperatureElementTwo.innerHTML = averageForDays(dayTwo);
        temperatureElementThree.innerHTML = averageForDays(dayThree);
        temperatureElementFour.innerHTML = averageForDays(dayFour);
        temperatureElementFive.innerHTML = averageForDays(dayFive);


    })
}



/* function init(resultFromServer) {
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
*/
document.getElementById('searchBtn').addEventListener('click', () => { // function added for the search button
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});





