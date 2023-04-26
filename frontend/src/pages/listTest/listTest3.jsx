import React, { useState, useEffect } from "react";
import axios from "axios";

const ListTest3 = () => {
  const [weatherData, setWeatherData] = useState(null);
const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weatherForRange, setWeatherForRange] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=44.34&lon=10.99&exclude=current,minutely,hourly&appid=ab153f1fe2b71c6c9649d3beaeefc00c&units=metric"
      );
      setWeatherData(response.data);
    };
    fetchData();
  }, []);


  const getWeatherForRange = (startDate, endDate) => {
    if (weatherData) {
      const startDay = new Date(startDate);
      const endDay = new Date(endDate);
      endDay.setDate(endDay.getDate() + 1);
      const weatherForRange = weatherData.daily.filter((day) => {
        const dayDate = new Date(day.dt * 1000);
        return dayDate >= startDay && dayDate <= endDay;
      });
      setWeatherForRange(weatherForRange);
      console.log(weatherForRange)
    }
  };

  return (
    <div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={() =>
                console.log(getWeatherForRange(startDate, endDate))
              }
            >
              Get Weather
            </button>
          </form>
          {weatherForRange.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temperature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {weatherForRange.map((day) => (
                  <tr key={day.dt}>
                    <td>{new Date(day.dt * 1000).toLocaleDateString()}</td>
                    <td>{day.temp.day}°C</td>
                    <td>{day.weather[0].description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
    </div>
  );
};

export default ListTest3;