import "./styles/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

// components imported
import Forecast from "./components/Forecast";
import BirdHouse from "./components/BirdHouse";
import searchCrow from "./assets/searchCrow.png";
import puffin from "./assets/puffinSmall.png";
import bobby from "./assets/bobbySmall.png";
import tern from "./assets/ternSmall.png";


function App() {

  // useState 
  const [location, setLocation] = useState("Toronto, Canada");
  const [birdsArray, setBirdsArray] = useState([]);
  const [weather, setWeather] = useState({ loading: false });
  const [toggleApi, setToggleApi] = useState(false);


  // UseEffect API Calls for all data
  useEffect(() => {
    // STEP 1 - Location API Call for Latitude & Longitude
    const configLocale = {
      method: "get",
      url: `https://api.openweathermap.org/geo/1.0/direct`,
      params: {
        appid: "61ff2ff2a45475c0d60c3ba5c2a56d10",
        q: location,
      },
    };

    axios(configLocale)
      .then(function (response) {
        const results = response.data[0];
        getLocation(results);
      })

      .catch(function (error) {
        console.log(error);
      });

    // Function to get location and break it down to 2 decimal places
    const getLocation = (data) => {
      let latitude = data.lat.toFixed(2);
      let longitude = data.lon.toFixed(2);

      // STEP 2 - API call to get local bird sightings
      birdCall(latitude, longitude);
      // STEP 3 - API call to get local weather
      weatherCall(latitude, longitude);
    };

    // Cornell University's eBird API that grabs recent sitings, passing in lat and long as arguments
    const birdCall = (latitude, longitude) => {
      const configBird = {
        method: "get",
        url: `https://api.ebird.org/v2/data/obs/geo/recent?lat=${latitude}&lng=${longitude}`,
        params: {
          key: "kmbrhsdgnjs1",
          dist: 10,
          maxResults: 6,
        },
      };

      axios(configBird)
        .then(function (response) {
          const birdData = [
            response.data[0],
            response.data[1],
            response.data[2],
            response.data[3],
            response.data[4],
            response.data[5],
          ];

          // Passing in 6 bird names to the image API as arguments to grab images of them using 6 API 'promise all' calls
          const fetchImages = async () => {
            try {
              const res = await Promise.allSettled([
                getPexel(`${birdData[0].comName} bird`),
                getPexel(`${birdData[1].comName} bird`),
                getPexel(`${birdData[2].comName} bird`),
                getPexel(`${birdData[3].comName} bird`),
                getPexel(`${birdData[4].comName} bird`),
                getPexel(`${birdData[5].comName} bird`),
              ]);
              const pexelData = res.map((res) => {
                return res.value.data.photos[0];
              });

              const finalData = birdData.map((v, i) => ({
                v,
                ...pexelData[i],
              }));

              setBirdsArray(finalData);
            } catch {
              throw Error("Promise failed");
            }
          };
          fetchImages();
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // Backup keys for Pexel API
    // 563492ad6f9170000100000164e2845cbb41412ea75d4386889a4b2b
    // 563492ad6f91700001000001c6c2def7324b4e4d8e07033d45546233

    // API call for Pexels image database
    const getPexel = (term) => {
      const APIkey = "563492ad6f91700001000001c6c2def7324b4e4d8e07033d45546233";
      const configPexel = {
        method: "get",
        url: `https://api.pexels.com/v1/search`,
        headers: {
          Authorization: APIkey,
        },
        params: {
          query: term,
          size: "small",
          orientation: "portrait",
          per_page: 1,
        },
      };

      return axios(configPexel);
    };

    // Weather API - for location
    const weatherCall = (latitude, longitude) => {
      const APIkey = `61ff2ff2a45475c0d60c3ba5c2a56d10`;
      const configWeath = {
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`,
      };

      axios(configWeath)
        .then(function (response) {
          const data = { ...response.data, loading: true };
          setWeather(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }, [toggleApi]);

  // Toggle function to call useState/APIs after user submits new city
  const handleSubmit = (event) => {
    event.preventDefault();
    setToggleApi(!toggleApi);
  };

  return (
    <main className="main">
      <div className="wrapper">
        <div class="topContainer">
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <span>
                <img
                  src={searchCrow}
                  alt="Crow icon for search bar"
                  className="searchIcon" />
              </span>
              <input
                type="text"
                className="search"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <input className="submit" type="submit" />
          </form>
          <header className="header">
            <div className="titleContainer">
              <h1>
                Birds <span>in Your Backyard</span>
              </h1>
              <h4>
                Find migratory & local birds in your city and let's get birding!
              </h4>
            </div>
            <Forecast weather={weather} />
          </header>
        </div>
        <BirdHouse birdsArray={birdsArray} />
        <footer className="footer">
          <p>Stephen Korzenstein / Juno College 2022</p>
        </footer>
      </div>
      <img
        className="frigate"
        src={tern}
        alt="frigate" />
      <img
        className="bobby"
        src={bobby}
        alt="Bobby" />
      <img
        className="puffin"
        src={puffin}
        alt="puffin" />
    </main>
  );
}

export default App;
