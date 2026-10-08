document.addEventListener('DOMContentLoaded',()=>{
    const cityInput=document.getElementById("city-input");
    const getWeatherBtn=document.getElementById("get-weather-btn");
    const weatherrInfo=document.getElementById("weather-info")
    const cityNameDisplay=document.getElementById("city-name")
    const tempreatureDisplay=document.getElementById("tempreature")
    const descriptionDisplay=document.getElementById("description")
    const errorMessage=document.getElementById("error-message")

    const API_KEY="13148259f416a2a53ddc7b86db9c3ba8"; 


getWeatherBtn.addEventListener('click',async()=>{
    const city=cityInput.value.trim()
    if(!city) return;

    try{
        const weatherdata=await fetchWeatherData(city);
        displayWeatherData(weatherdata);
    }
    catch(error){
        showError();
    }
});
cityInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') { 
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherdata = await fetchWeatherData(city);
            displayWeatherData(weatherdata);
        } catch (error) {
            showError();
        }
    }
});

async function fetchWeatherData(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response=await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE",response);
    if(!response.ok){
        throw new Error('City Not found');
    }
    const data=await response.json();
    return data;
}
function displayWeatherData(data){
    console.log(data);
    const {name,main,weather}=data;
    cityNameDisplay.textContent=name;
    tempreatureDisplay.textContent=`Temperature:${main.temp}`;
descriptionDisplay.textContent=`Weather:${weather[0].description}`;

    weatherrInfo.classList.remove("hidden")
    errorMessage.classList.add("hidden")
}

function showError(){
    weatherrInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden')
}

}); 