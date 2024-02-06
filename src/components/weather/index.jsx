import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

   async function fetchweatherData(param) {
   setLoading(true);
    try{                        
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&APPID=289420d70c11dac2a8eb1cae3368c8b5`)
  const data = await response.json()
  if(data){
    setWeatherData(data)
    setLoading(false)
  }

}
    catch(e){
    setLoading(false)
        console.log(e)
    }
   }

  function getCurrentDate(){
    return new Date().toLocaleDateString('en-us', {
        weekday : 'long',
        month : 'long',
        day : 'numeric',
        year : 'numeric'
    })
  }

   function handleSearch() {
        fetchweatherData(search)
    }

    useEffect(() => {
   fetchweatherData("bangalore");
    },[])

    return (
        <div>
            <Search search = {search} setSearch={setSearch} handleSearch={handleSearch}/>
     {loading ? <div>Loading...</div> : <div> <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2><div/>
     <div className="date">
        <span>{getCurrentDate()}</span>
     </div>
     <div className="temperature">
        {weatherData?.main?.temp}
        <p className="description">
            {weatherData && weatherData.Weather && weatherData.Weather[0] ? weatherData.Weather[0].description : ''}
        </p>
        <div className="weather-info">
            <div>
                <div>
                    <p className="wind">{weatherData?.wind?.speed}</p>
                    <p>Wind speed</p>
                </div>
            </div>
            <div>
                <div>
                    <p className="humidity">{weatherData?.main?.humidity}</p>
                    <p>Humidity</p>
                </div>
            </div>
        </div>
     </div>
     </div>}
              
        </div>
    
    )
}