import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'

function App() {

const [location, setLocation] = useState("2092 Avenue Road, Toronto Canada")
const [birdsArray, setBirdsArray] = useState([])

useEffect(() => {
// Location API Call for Lat & Long

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
    birdCall(latitude, longitude)
}

// Bird API call for recent sitings
const birdCall = (latitude, longitude) => {

const configBird = {
  method: 'get',
  url: `https://api.ebird.org/v2/data/obs/geo/recent?lat=${latitude}&lng=${longitude}`,
  params: {
        key:
        'kmbrhsdgnjs1', 
        dist: 10,
        maxResults: 10,
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


}, [])





  return (
    <div className="App">
     
    </div>
  );
}

export default App;
