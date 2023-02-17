const timeEL = document.getElementById('time');
const dateEL = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById
('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'monday',  'Tuesday', 'Wednesday',
 'Thursday', 'Friday', 'Saturday', ];

 const months = ['Jan', 'Feb',  'Mar', 'Apr',
 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov','Dec' ];

 const API_KEY = '697138912dd875faf3e15d3563276437';
setInterval(()=> {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn24HrFormat = hour >=24 ? hour %24 :hour
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hour >= 24 ? 'PM' : 'AM';
    

    timeEL.innerHTML= hoursIn24HrFormat + ':' + minutes + '' + 
    `<span id="am-pm">${ampm}</span>`

    dateEL.innerHTML = days[day] + ', ' + date + ' ' + months[month]


}, 1000);
getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let{latitude, longitude}= success.coords;

        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}
function showWeatherData(data){
    let {humidity, pressure, sunrise, sunset, wind_speed}= data.current; //probably to do with the api key nee one that shows that data

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML =  
    `<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}</div>
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
</div>`
   

}
let otherDayForcast =''
data.daily.forEach((day, idx) =>{
    if (idx == 0){
        currentTempEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
            <div class="temp">Night - ${day.temp.night}&#176;C</div>
            <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>
        
        `

    }else{
        otherDayForcast += `
        <div class="weather-forecast-item">
                    <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                    <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
                    <div class="temp">Night- 25.6&#176; C</div>
                    <div class="temp">Day- 30.6&#176; C</div>
                </div>
        `
    }
} )
weatherForecastEl.innerHTML = otherDayForcast;