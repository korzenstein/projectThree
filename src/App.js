import "./styles/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

// components
import Forecast from "./components/Forecast";
import BirdHouse from "./components/BirdHouse";

function App() {
  const [location, setLocation] = useState("Toronto");
  const [birdsArray, setBirdsArray] = useState([]);
  const [weather, setWeather] = useState({ loading: false });
  const [pexImage, setPexImage] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    // STEP 1 - Location API Call for Lat & Long
    const configLocale = {
      method: "get",
      url: `http://api.positionstack.com/v1/forward`,
      params: {
        access_key: "d8801a309d70e704b6f58e27f167e2e6",
        query: location,
      },
    };

    axios(configLocale)
      .then(function (response) {
        const results = response.data.data[0];
        getLocation(results);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Function to get location
    const getLocation = (data) => {
      let latitude = data.latitude.toFixed(2);
      let longitude = data.longitude.toFixed(2);
  
      // STEP 2 - birdCall function
      birdCall(latitude, longitude);
      // STEP 3 - weatherCall function
      weatherCall(latitude, longitude);
    };

    // Bird API call for recent sitings, passing in lat and long
    const birdCall = (latitude, longitude) => {
      const configBird = {
        method: "get",
        url: `https://api.ebird.org/v2/data/obs/geo/recent?lat=${latitude}&lng=${longitude}`,
        params: {
          key: "kmbrhsdgnjs1",
          dist: 10,
          maxResults: 5,
        },
      };

      axios(configBird)
        .then(function (response) {
          // setBirdsArray(response.data);
    
          const birdData = [
            response.data[0].comName,
            response.data[1].comName,
            response.data[2].comName,
            response.data[3].comName,
            response.data[4].comName,
          ]
          

          const fetchImages = async () => {
            try {
              const res = await Promise.allSettled([
                getPexel(birdData[0]),
                getPexel(birdData[1]),
                getPexel(birdData[2]),
                getPexel(birdData[3]),
                getPexel(birdData[4]),
              ]);
              const pexelData = res.map((res) => {
                // console.log(res.value.data.photos[0])
                return res.value.data.photos[0]
              });

              const finalData = birdData.map((v, i) => ({ v, ...pexelData[i] }));
   
              setBirdsArray(finalData)
              console.log(birdsArray)
            } catch {
              throw Error("Promise failed");
            }
          };
          fetchImages()
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // 563492ad6f9170000100000164e2845cbb41412ea75d4386889a4b2b
   
    // Pexel Image API call
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

      return axios(configPexel)

        // .then(function (response) {
        //   return response.data
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
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

  }, [toggle]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setToggle(!toggle);
  };

  return (
    <main className="main">
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="form">
          <label>
            Enter your address:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
        <Forecast weather={weather} />
        <BirdHouse birdsArray={birdsArray} toggle={toggle} />
      </div>
    </main>
  );
}

export default App;
