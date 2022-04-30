const Forecast = ({ weather }) => {
    
  const getDirection = (angle) => {
    const directions = [
      "N",
      "NE",
      "E",
      "SE",
      "S",
      "SW",
      "W",
      "NW",
    ];
    let index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
  }

  return (
    <div className="weatherContainer">
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
