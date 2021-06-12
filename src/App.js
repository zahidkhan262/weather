import React, { useState } from 'react';
import './index.css';

const api ={
  key: "a229595aedecb9153c053b3eb331b952",
  base: "https://api.openweathermap.org/data/2.5/",
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setWeather(result)});
    }
  }



  const dateBuilder = (d)=>{
    let months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="container">
      <div className={typeof weather.main !="undefined" ? ((weather.main.temp>17) ? 'app warm':'app'): 'app'}>
      <main>
        <div className="search-box">
          <input type="text"
          placeholder="Search......."
          className="search-bar"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search} />
        </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box center">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box center">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].main}</div>
                
              </div>
            </div>
          ) : ('')}
      </main>
    </div>
    </div>
  );
}

export default App;
