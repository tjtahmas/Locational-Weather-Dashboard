//TJ Tahmassebi's Code
// 10/18: Created HTML outline from Bootstrap, got fetch request to work by long, lat and by city, 
//        got information to display, got input from searchbar, add recent search buttons, added to local storage
// 10/19: Added moment.js to give current day and future dates. Fixed CSS styling

//TODO: Add Screenshot to Readme

var city = '';
//console.log(localStorage.getItem('cityNames'))
if (localStorage.getItem('cityNames') === null) {
    cityNames = [];
} else {
    cityNames = JSON.parse(localStorage.getItem('cityNames'));
}
function getCity() {
    city = document.querySelector('.getCity').value;
    updateCity(city);
    addToList(city);
}

function addToList(name) {
    var list = document.querySelector('.button-list');
    var button = document.createElement('button');
    button.innerHTML = name;
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.addEventListener('click', function () {
        updateCity(name);
    });
    //console.log(cityNames)
    cityNames.push(name);
    localStorage.setItem('cityNames', JSON.stringify(cityNames));
    list.appendChild(button);
}

function getCityNames() {
    var cities = JSON.parse(localStorage.getItem('cityNames'));
    if (cities !== null) {
        for (var i = 0; i < cities.length; i++){
            console.log(cities.length)
            var list = document.querySelector('.button-list');
            var button = document.createElement('button');
            button.innerHTML = cities[i];
            button.classList.add('btn');
            button.classList.add('btn-primary');
            button.addEventListener('click', function () {
                updateCity(this.innerHTML);
            });
            list.appendChild(button);
        }
    }
}

getCityNames();

function setDates() {
    //Current Date
    var today = moment();
    var currentTime = today.format('L');
    var cityTitle = document.querySelector('.cityName');
    var cityTime = cityTitle.innerHTML;
    cityTime = cityTime.concat(', ' + currentTime);
    cityTitle.innerHTML = cityTime;

    //Day1
    var firstdayTime = today.add(1, 'days').format('L');
    var firstdayEl = document.querySelector('#day1').children[0];
    firstdayEl.innerHTML = firstdayTime;

    //Day2
    var seconddayTime = today.add(1, 'days').format('L');
    var seconddayEl = document.querySelector('#day2').children[0];
    seconddayEl.innerHTML = seconddayTime;

    //Day3
    var thirddayTime = today.add(1, 'days').format('L');
    var thirddayEl = document.querySelector('#day3').children[0];
    thirddayEl.innerHTML = thirddayTime;

    //Day4
    var fourthdayTime = today.add(1, 'days').format('L');
    var fourthdayEl = document.querySelector('#day4').children[0];
    fourthdayEl.innerHTML = fourthdayTime;

    //Day5
    var fifthdayTime = today.add(1, 'days').format('L');
    var fifthdayEl = document.querySelector('#day5').children[0];
    fifthdayEl.innerHTML = fifthdayTime;
}

function updateCity(city) {


    var APIkey = 'ebea214579512211db301dcf4d7f10c9';
    var weather = {};

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey, {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            locationlat = data.coord.lat;
            locationlon = data.coord.lon;

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + locationlat + '&lon=' + locationlon + '&exclude=minutely&appid=' + APIkey, {
                // The browser fetches the resource from the remote server without first looking in the cache.
                // The browser will then update the cache with the downloaded resource.
                cache: 'reload',
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    weather = data;

                    // Example Variables
                    var temp = 77;
                    var wind = 27;
                    var humidity = 38;
                    var uvIndex = 5;

                    function AssignVariables() {
                        wind = weather.current.wind_speed;
                        temp = weather.current.temp;
                        temp = toFar(temp);
                        humidity = weather.current.humidity;
                        uvIndex = weather.current.uvi;
                    }

                    function toFar(temp) {
                        temp = (temp - 273.15) * (9 / 5) + 32;
                        temp = temp.toFixed(2);
                        return temp;
                    }

                    function AssignCurrent() {
                        AssignVariables();
                        var current = document.querySelector('.current');
                        current.children[0].textContent = city;
                        current.children[2].textContent = 'Temp: ' + temp + '°F';
                        current.children[4].textContent = 'Wind: ' + wind + ' MPH';
                        current.children[6].textContent = 'Humidity: ' + humidity + ' %';
                        current.children[8].textContent = 'UV Index: ' + uvIndex;
                        if (uvIndex <= 2) {
                            current.children[8].style.color = 'green';
                            console.log('GREEN')
                        } else if (uvIndex > 2 && uvIndex <= 5) {
                            current.children[8].style.color = 'yellow';
                            console.log('YELLOW')
                        } else if (uvIndex > 5 && uvIndex <= 7) {
                            current.children[8].style.color = 'orange';
                            console.log('ORANGE')
                        } else if (uvIndex > 7 && uvIndex <= 10) {
                            current.children[8].style.color = 'red';
                        }
                    }
                

                    function AssignForecast() {
                        //Assign Variables!
                        //Day1 Variables
                        var temp1 = weather.daily[1].temp.day;
                        var temp1 = toFar(temp1);
                        var wind1 = weather.daily[1].wind_speed;
                        var humidity1 = weather.daily[1].humidity;

                        //Day2 Variables
                        var temp2 = weather.daily[2].temp.day;
                        var temp2 = toFar(temp2);
                        var wind2 = weather.daily[2].wind_speed;
                        var humidity2 = weather.daily[2].humidity;

                        //Day3 Variables
                        var temp3 = weather.daily[3].temp.day;
                        var temp3 = toFar(temp3);
                        var wind3 = weather.daily[3].wind_speed;
                        var humidity3 = weather.daily[3].humidity;

                        //Day4 Variables
                        var temp4 = weather.daily[4].temp.day;
                        var temp4 = toFar(temp4);
                        var wind4 = weather.daily[4].wind_speed;
                        var humidity4 = weather.daily[4].humidity;

                        //Day5 Variables
                        var temp5 = weather.daily[5].temp.day;
                        var temp5 = toFar(temp5);
                        var wind5 = weather.daily[5].wind_speed;
                        var humidity5 = weather.daily[5].humidity;

                        var firstday = document.querySelector('#day1');
                        firstday.children[1].textContent = 'Temp: ' + temp1 + '°F';
                        firstday.children[2].textContent = 'Wind: ' + wind1 + ' MPH';
                        firstday.children[3].textContent = 'Humidity: ' + humidity1 + ' %';

                        var secondday = document.querySelector('#day2');
                        secondday.children[1].textContent = 'Temp: ' + temp2 + '°F';
                        secondday.children[2].textContent = 'Wind: ' + wind2 + ' MPH';
                        secondday.children[3].textContent = 'Humidity: ' + humidity2 + ' %';

                        var thirdday = document.querySelector('#day3');
                        thirdday.children[1].textContent = 'Temp: ' + temp3 + '°F';
                        thirdday.children[2].textContent = 'Wind: ' + wind3 + ' MPH';
                        thirdday.children[3].textContent = 'Humidity: ' + humidity3 + ' %';

                        var fourthday = document.querySelector('#day4');
                        fourthday.children[1].textContent = 'Temp: ' + temp4 + '°F';
                        fourthday.children[2].textContent = 'Wind: ' + wind4 + ' MPH';
                        fourthday.children[3].textContent = 'Humidity: ' + humidity4 + ' %';

                        var fifthday = document.querySelector('#day5');
                        fifthday.children[1].textContent = 'Temp: ' + temp5 + '°F';
                        fifthday.children[2].textContent = 'Wind: ' + wind5 + ' MPH';
                        fifthday.children[3].textContent = 'Humidity: ' + humidity5 + ' %';
                    }

                    function addIcons() {
                        
                       
                        var container = document.querySelector('.current');
                        var container1 = document.querySelector('#day1');
                        var container2 = document.querySelector('#day2');
                        var container3 = document.querySelector('#day3');
                        var container4 = document.querySelector('#day4');
                        var container5 = document.querySelector('#day5');

                    
                        var checkIMG = container.children[1].outerHTML;
                        checkIMG = checkIMG.slice(0,4)
                        //console.log(container1.children[1])
                        if (checkIMG == '<img'){
                            container.children[1].remove();
                            container1.children[1].remove();
                            container2.children[1].remove();
                            container3.children[1].remove();
                            container4.children[1].remove();
                            container5.children[1].remove();
                        }

                         //Current Day
                        var iconIMG = document.createElement('img');
                        var icon = weather.current.weather[0].icon;
                        iconIMG.src = 'https://openweathermap.org/img/w/' + icon + '.png';
                        container.appendChild(iconIMG);
                        container.insertBefore(iconIMG, container.childNodes[2]);

                        //Day1
                        
                        var iconIMG1 = document.createElement('img');
                        var icon1 = weather.daily[1].weather[0].icon;
                        iconIMG1.src = 'https://openweathermap.org/img/w/' + icon1 + '.png';
                        container1.appendChild(iconIMG1);
                        container1.insertBefore(iconIMG1, container1.childNodes[2])

                        //Day2
                        
                        var iconIMG2 = document.createElement('img');
                        var icon2 = weather.daily[2].weather[0].icon;
                        iconIMG2.src = 'https://openweathermap.org/img/w/' + icon2 + '.png';
                        container2.appendChild(iconIMG2);
                        container2.insertBefore(iconIMG2, container2.childNodes[2])

                        //Day3
                        
                        var iconIMG3 = document.createElement('img');
                        var icon3 = weather.daily[3].weather[0].icon;
                        iconIMG3.src = 'https://openweathermap.org/img/w/' + icon3 + '.png';
                        container3.appendChild(iconIMG3);
                        container3.insertBefore(iconIMG3, container3.childNodes[2])

                        //Day4
                       
                        var iconIMG4 = document.createElement('img');
                        var icon4 = weather.daily[4].weather[0].icon;
                        iconIMG4.src = 'https://openweathermap.org/img/w/' + icon4 + '.png';
                        container4.appendChild(iconIMG4);
                        container4.insertBefore(iconIMG4, container4.childNodes[2])

                        //Day5
                        
                        var iconIMG5 = document.createElement('img');
                        var icon5 = weather.daily[5].weather[0].icon;
                        iconIMG5.src = 'https://openweathermap.org/img/w/' + icon5 + '.png';
                        container5.appendChild(iconIMG5);
                        container5.insertBefore(iconIMG5, container5.childNodes[2])
                    }

                    AssignCurrent();
                    AssignForecast();
                    setDates();
                    addIcons();

                });
        });

}