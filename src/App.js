import './styles/styles.css';
import {useEffect, useState} from 'react'
import axios from 'axios'

// components
import Forecast from './components/Forecast'
import BirdHouse from './components/BirdHouse'

function App() {

const [location, setLocation] = useState("Toronto")
const [birdsArray, setBirdsArray] = useState([])
const [weather, setWeather] = useState([])
const [toggle, setToggle] = useState(false)

useEffect(() => {
// STEP 1 - Location API Call for Lat & Long
  const configLocale = {
  method: 'get',
  url: `http://api.positionstack.com/v1/forward`,
  params: {
        access_key:
        'd8801a309d70e704b6f58e27f167e2e6', 
        query: location,
  }
};

axios(configLocale)
.then(function (response) {
  console.log((response.data.data[0]));
  const results = response.data.data[0]
  getLocation(results)
})
.catch(function (error) {
  console.log(error);
});

// Function to get location
const getLocation = (data) => {
    let latitude = data.latitude.toFixed(2)
    let longitude = data.longitude.toFixed(2)
    console.log(latitude)
    console.log(longitude)
    // STEP 2 - birdCall function
    birdCall(latitude, longitude)
    // STEP 3 - weatherCall function
    weatherCall(latitude, longitude)
}

// Bird API call for recent sitings, passing in lat and long
const birdCall = (latitude, longitude) => {
const configBird = {
  method: 'get',
  url: `https://api.ebird.org/v2/data/obs/geo/recent?lat=${latitude}&lng=${longitude}`,
  params: {
        key:
        'kmbrhsdgnjs1', 
        dist: 10,
        maxResults: 6,
  }
};

axios(configBird)
.then(function (response) {
  console.log((response.data));
  setBirdsArray(response.data)
})
.catch(function (error) {
  console.log(error);
});
}

// Weather API - for location
const weatherCall = (latitude, longitude) => {
  const APIkey = `61ff2ff2a45475c0d60c3ba5c2a56d10`;
  const configWeath = {
  method: 'get',
  url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`,
};

axios(configWeath)
.then(function (response) {
  console.log((response.data));
  setWeather(response.data)
})
.catch(function (error) {
  console.log(error);
});
}


const getUnsplash = () => {
  const query = 'House Finch'
  const APIkey = 'nF_y6-AHiFcd560pleOqLVzuFpkZXAt5c4ZqQrcy_HU'
  const configSplash = {
  method: 'get',
  url: `https://api.unsplash.com/search/photos?query=${query}&client_id=${APIkey}`,
};

axios(configSplash)
.then(function (response) {
  console.log((response.data));
})
.catch(function (error) {
  console.log(error);
});

}
// getUnsplash()

}, [toggle])

  const handleSubmit = (event) => {
    event.preventDefault();
    setToggle(!toggle)
    console.log('switched')
  }

  return (
    <main className="main">
      <div className="wrapper">
      <form onSubmit={handleSubmit} className="form">
      <label>Enter your address:
        <input 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
     <Forecast 
     weather={weather}
     />
     <BirdHouse 
     birdsArray={birdsArray}
     />
     </div>
    </main>
  );
}

export default App;


// A landing page with the app heading 'Birds in Your Neighbourhood' and a welcome message asking users to search their location to find birds around them.

// The page also contains an input field (text) for them to place their address. Once submitted, an API call (axios) is made using “Positionstack” to translate the users string location into numeric lat/long data that can be used for the other APIs. 

// These will be stored as variables which will be passed into the “Cornell eBird" API that will make a call using to grab a set of recently spotted birds in the users area/search terms. 

// Another API will be called to grab local weather data (“Openweather”) again using the lad/long variables. A fourth API ("Unsplash") will then obtain bird images to be passed into the cards.

// The page will then display a selection (2-6) birds as cards. The cards will contain the following information on each, using the .map array method:

// Name
// Exact location
// Scientific name
// Image

// Weather data that can help inform birders on their outdoor quests will be listed at the top of the page with the current:

// Temp
// Wind speed / direction
// Visibility


