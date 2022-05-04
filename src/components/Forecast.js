import windNorth from "../assets/windNorth.svg";
import windNorthEast from "../assets/windNorthEast.svg";
import windEast from "../assets/windEast.svg";
import windSouthEast from "../assets/windSouthEast.svg";
import windSouth from "../assets/windSouth.svg";
import windSouthWest from "../assets/windSouthWest.svg";
import windWest from "../assets/windWest.svg";
import windNorthWest from "../assets/windNorthWest.svg";

const Forecast = ({ weather }) => {

  // Function to get weather arrow icons
  const getArrow = (angle) => {
    const directions = [
      windNorth,
      windNorthEast,
      windEast,
      windSouthEast,
      windSouth,
      windSouthWest,
      windWest,
      windNorthWest,
    ];
    let index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
  };

  // Function to get weather directions
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
  };

  return (
    <div className="weatherContainer">
      {weather.loading ? (
        <div className="weatherContent">
          <div className="weatherIcon">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
          <p className="temperature">
            {Math.round(weather.main.temp - 273.15)} C
          </p>
          <span className="winds">
            <div className="windDirection">
              <img src={getArrow(weather.wind.deg)} />
            </div>
            <p className="windSpeed">
              {Math.round(weather.wind.speed * 3.6)} kph {getDirection(weather.wind.deg)}
            </p>
          </span>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Forecast;
