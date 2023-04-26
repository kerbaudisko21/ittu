import React, { useState } from 'react';

function ListTest2() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [weatherDataArray, setWeatherDataArray] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  const getWeatherDataForDateRange = async () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const weatherDataArray = [];

    while (start <= end) {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=44.34&lon=10.99&exclude=current,minutely,hourly&appid=ab153f1fe2b71c6c9649d3beaeefc00c&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);
      console.log(start);
      console.log(end);

      weatherDataArray.push(data);
      start.setDate(start.getDate() + 1);
    }
   
    setWeatherDataArray(weatherDataArray);
  };



  return (
    <div>
      <input type="date" value={startDate.toISOString().slice(0, 10)} onChange={handleStartDateChange} />
      <input type="date" value={endDate.toISOString().slice(0, 10)} onChange={handleEndDateChange} />
      <button onClick={getWeatherDataForDateRange}>Get Weather Data</button>
      {weatherDataArray.map((weatherData) => (
        <div key={weatherData.dt}>
          <p>Date: {new Date(weatherData.dt * 1000).toLocaleDateString()}</p>
          <p>Temperature: {weatherData?.main?.temp} K</p>
          <p>Humidity: {weatherData?.main?.humidity}%</p>
          <p>Description: {weatherData?.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default ListTest2;