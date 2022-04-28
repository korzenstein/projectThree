const Forecast = ({weather}) => {
    return (
        <div>
            <h4>Current Weather</h4>
            <p>{Math.round((weather.main.temp)-273.15)} C</p>
            <p>{weather.name}</p>
            <p>{weather.weather[0].description}</p>
            <p>{weather.wind.deg}</p>
            <p>{weather.wind.speed}</p>
        </div>
    )
}

export default Forecast