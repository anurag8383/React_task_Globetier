// WeatherComponent.tsx
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { WiCloud, WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

interface ForecastData {
  date: string;
  temperature: number;
  description: string;
}

const Weather: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);

  useEffect(() => {
    const place = 'delhi';
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
    const options = { weekday: 'long' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  };

  const isToday = (dateString: string) => {
    const today = new Date().toLocaleDateString();
    return new Date(dateString).toLocaleDateString() === today;
  };

  const getCardStyle = (isToday: boolean) => ({
    color: isToday ? 'blue' : 'black',
    width: '100%',
    marginLeft: '-20%',
    height: '100%',
  });
  

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case 'clouds':
        return <WiCloud />;
      case 'clear':
        return <WiDaySunny />;
      case 'rain':
        return <WiRain />;
      case 'snow':
        return <WiSnow />;
      case 'thunderstorm':
        return <WiThunderstorm />;
      default:
        return null;
    }
  };


  return (
    <div className='forecast' style={{ width: '276px', height: '400px', marginLeft: '45%' }}>
      {forecastData && forecastData.length > 0 ? (
        <div className='temperature'>
          <Card className='upperTemperature' style={getCardStyle(isToday(forecastData[0].date))}>
            <h5 style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{getFormattedDate(forecastData[0].date)}</span>
              <span>{Math.round(forecastData[0].temperature)}°C <WiCloud style={{fontSize:'2rem'}} /></span>
            </h5>
            {getWeatherIcon(forecastData[0].description)}
          </Card>
          <div className="lowerTemperature">
            {React.Children.toArray(
              forecastData.slice(1).map(forecast => (
                <div key={forecast.date} className='points' style={getCardStyle(isToday(forecast.date))}>
                  <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{getFormattedDate(forecast.date)}</span><WiCloud style={{color:'black',fontSize:'2rem'}} />
                    <span>{Math.round(forecast.temperature)}°C  </span>
                  </p>
                  {getWeatherIcon(forecast.description)}
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
