let apiKey = '1758be2b00925f7c46528a12c0005c59'; // personal API key
let units = 'metric'; // 'metric' to get celsius
let searchMethod; // q or zip

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) // '5' for the characters postcode. 'Number' to make every single item a number
        searchMethod = 'zip';

    else
        searchMethod = 'q';
}

async function backgroundImage() { //function to set background according to the city entered
    let response = await fetch('https://api.unsplash.com/search/photos?query=$'+ searchInput.value+'&client_id=8b3303518e733b03bb9fbe890041915da381de31ef0602ad71dc8adfd4b79f83');
    let data = await response.json();
    let countryImage = data['results'][1]['urls']['regular'];
    document.body.style.backgroundImage = `url(${countryImage})`;
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

        let averageForDays = arr => Math.floor((arr.reduce((a, b) => a + b, 0)  / arr.length )) + '&#176' + 'C'; // to calculate average for day

        // getting id 'temperature'
        let temperatureElementOne = document.getElementById('temperatureOne');
        let temperatureElementTwo = document.getElementById('temperatureTwo');
        let temperatureElementThree = document.getElementById('temperatureThree');
        let temperatureElementFour = document.getElementById('temperatureFour');
        let temperatureElementFive = document.getElementById('temperatureFive');


        let cityHeader = document.getElementById('cityHeader');  // getting id 'city'
        cityHeader.innerHTML = data.city.name;

        let searchInput = document.getElementById('searchInput') // getting id 'searchinput' for background image

        // getting id 'description weather'
        let weatherDescriptionHeaderOne = document.getElementById('weatherDescriptionOne');
        let weatherDescriptionHeaderTwo = document.getElementById('weatherDescriptionTwo');
        let weatherDescriptionHeaderThree = document.getElementById('weatherDescriptionThree');
        let weatherDescriptionHeaderFour = document.getElementById('weatherDescriptionFour');
        let weatherDescriptionHeaderFive = document.getElementById('weatherDescriptionFive');

        // getting icon images
        let weatherIconOne = document.getElementById('documentIconImgOne');
        let weatherIconTwo = document.getElementById('documentIconImgTwo');
        let weatherIconThree = document.getElementById('documentIconImgThree');
        let weatherIconFour = document.getElementById('documentIconImgFour');
        let weatherIconFive = document.getElementById('documentIconImgFive');

        // calculating description weather
        let descripWeatherOne = data.list[0].weather[0].description;
        weatherDescriptionHeaderOne.innerHTML = descripWeatherOne.charAt(0).toUpperCase() + descripWeatherOne.slice(1);

        let descripWeatherTwo = data.list[8].weather[0].description;
        weatherDescriptionHeaderTwo.innerHTML = descripWeatherTwo.charAt(0).toUpperCase() + descripWeatherTwo.slice(1);

        let descripWeatherThree = data.list[16].weather[0].description;
        weatherDescriptionHeaderThree.innerHTML = descripWeatherThree.charAt(0).toUpperCase() + descripWeatherThree.slice(1);

        let descripWeatherFour = data.list[24].weather[0].description;
        weatherDescriptionHeaderFour.innerHTML = descripWeatherFour.charAt(0).toUpperCase() + descripWeatherFour.slice(1);

        let descripWeatherFive = data.list[30].weather[0].description;
        weatherDescriptionHeaderFive.innerHTML = descripWeatherFive.charAt(0).toUpperCase() + descripWeatherFive.slice(1);

        temperatureElementOne.innerHTML = averageForDays(dayOne); // to display temperature day one
        temperatureElementTwo.innerHTML = averageForDays(dayTwo);
        temperatureElementThree.innerHTML = averageForDays(dayThree);
        temperatureElementFour.innerHTML = averageForDays(dayFour);
        temperatureElementFive.innerHTML = averageForDays(dayFive);

        // get icon URL
        weatherIconOne.src = 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
        weatherIconTwo.src = 'http://openweathermap.org/img/w/' + data.list[8].weather[0].icon + '.png';
        weatherIconThree.src = 'http://openweathermap.org/img/w/' + data.list[16].weather[0].icon + '.png';
        weatherIconFour.src = 'http://openweathermap.org/img/w/' + data.list[24].weather[0].icon + '.png';
        weatherIconFive.src = 'http://openweathermap.org/img/w/' + data.list[30].weather[0].icon + '.png';

        // to get current date and upcoming days
        var currentDate = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var n = weekday[currentDate.getDay()];

        document.getElementById("day1").innerHTML = weekday[currentDate.getDay()];
        document.getElementById("day2").innerHTML = weekday[currentDate.getDay()+1];
        document.getElementById("day3").innerHTML = weekday[currentDate.getDay()+2];
        document.getElementById("day4").innerHTML = weekday[currentDate.getDay()+3];
        document.getElementById("day5").innerHTML = weekday[currentDate.getDay()+4];
    })
}

function setVisibilityforWeather() { // to make it visible after entering city
    let weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => { // function added for the search button
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
    backgroundImage();
    setVisibilityforWeather();
});





