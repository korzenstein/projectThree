const Forecast = ({ weather }) => {
    
  const getDirection = (angle) => {
    const directions = [
      "North",
      "North-East",
      "East",
      "South-East",
      "South",
      "South-West",
      "West",
      "North-West",
    ];
    let index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
  }

  return (
    <div className="weatherContainer">
      <h4>Current Weather</h4>

      {weather.loading ? (
        <>
          <p>{Math.round(weather.main.temp - 273.15)} C</p>
          <p>{weather.name}</p>
          <p>{weather.weather[0].description}</p>
          <p>{getDirection(weather.wind.deg)} {Math.round((weather.wind.speed) * 3.6)} km/hr</p>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Forecast;
