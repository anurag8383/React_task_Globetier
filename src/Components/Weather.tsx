// WeatherComponent.tsx
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

interface ForecastData {
  date: string;
  temperature: number;
  description: string;
}

const Weather: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);

  useEffect(() => {
    const place = 'delhi'
    const apiKey = '8cb9e9b7703c0af7e1734d9ce7caed07';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then((data: any) => {
        const dailyForecasts: ForecastData[] = data.list.map((item: any) => ({
          date: item.dt_txt,
          temperature: item.main.temp,
          description: item.weather[0].description,
        }));

        const uniqueDailyForecasts = dailyForecasts.filter((item, index, self) => {
          const date = new Date(item.date).toLocaleDateString();
          return index === self.findIndex(forecast => new Date(forecast.date).toLocaleDateString() === date);
        });

        setForecastData(uniqueDailyForecasts);
      })
      .catch((error: Error) => {
        console.error('Error fetching forecast data:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  };

  return (
    <Card className='forecast' style={{width: '276px' , height: '400px'}}>
      {forecastData && forecastData.length > 0 ? (
        <div className='temperature'>
          <div className='upperTemperature'>
            <p>Date: {getFormattedDate(forecastData[0].date)}</p>
            <p>Temperature: {forecastData[0].temperature}°C</p>
            <p>Description: {forecastData[0].description}</p>
          </div>
          <div className="lowerTemperature">
            {React.Children.toArray(
              forecastData.slice(1).map(forecast => (
                <div key={forecast.date} className='points'>
                  <p>Date: {getFormattedDate(forecast.date)}</p>
                  <p>Temperature: {forecast.temperature}°C</p>
                  <p>Description: {forecast.description}</p>
                  <hr />
                </div>
              ))
            )
            }
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
};

export default Weather;
