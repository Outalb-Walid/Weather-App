
const API="00dc79780e1ff7bb8c23bbdb6be8ba04"
const weatherDataEl=document.getElementById("Weather-Data")
const cityInputEl=document.getElementById("city-input")
const formEl=document.querySelector("form")
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    console.log(cityValue);
    getWeatherData(cityValue);
})
async function getWeatherData(cityValue){
    try{
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API}&units=metric`)
    if(!response.ok){
        throw new Error("Network response was not ok")
    }
    const data=await response.json();
    console.log(data);
    const tempreture=Math.round(data.main.temp);
    const description=data.weather[0].description;
    const icon=data.weather[0].icon;
    console.log(icon);
    const details=[
        `Feels like:${Math.round(data.main.feels_like)}`,
        `Humidity:${data.main.humidity}%`,
        `Wind speed:${data.wind.speed} m/s`,
    ] 
    weatherDataEl.querySelector(
        ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">` ;
    weatherDataEl.querySelector(".temperature").textContent=`${tempreture}°C`;
    weatherDataEl.querySelector(".description").textContent=description;
    weatherDataEl.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");
    }catch(error){
        weatherDataEl.querySelector(
            ".icon"
            ).innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent="";
        weatherDataEl.querySelector(".description").textContent="An Error happened please enter a valid City Name";
        weatherDataEl.querySelector(".details").innerHTML="";
    }
}