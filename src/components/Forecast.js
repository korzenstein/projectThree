const Forecast = ({ weather }) => {
    
  const getDirection = (angle) => {
    const directions = [
      "n",
      "ne",
      "e",
      "se",
      "s",
      "sw",
      "w",
      "nw",
    ];
    let index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
  }


  return (
    <div className="weatherContainer">
      {weather.loading ? (
        <>
          <div className="weatherIcon">
          <img 
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          />
          </div>
          <p className="temperature">{Math.round(weather.main.temp - 273.15)} C</p>
          {/* <p>{weather.name}</p> */}
          <p className="winds">{Math.round((weather.wind.speed) * 3.6)} km {getDirection(weather.wind.deg)}</p>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Forecast;
