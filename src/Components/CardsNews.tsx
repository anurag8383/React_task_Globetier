// Weather.tsx
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const CardsNews: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>([]);

  useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=8cb9e9b7703c0af7e1734d9ce7caed07') 
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }, []);

  return (
    <div>
      <h2>Weather</h2>
      {weatherData && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>temp :{weatherData.main?.temp}</Card.Title>
            <p>Feels Like :{weatherData.main.feels_like}</p>
            <p>Visibilty :{weatherData.visibility}</p>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default CardsNews;
