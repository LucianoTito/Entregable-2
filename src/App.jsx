import './App.css'
import { useEffect,useState } from "react"
import  axios  from "axios";
import WeatherCard from './components/WeatherCard';

function App() {
  
const [coords, setCoords] = useState()
const [weather, setWeather] = useState()
const [temperature, setTemperature] = useState()
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {

  const success = pos => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }
navigator.geolocation.getCurrentPosition(success) /*Esto nos sirve para encontrar la ubicación actual del usuario */
}, [])

useEffect(() => {
  if(coords){
    const APIkey= '0de09f4d09580cfe6ca4c4af4cbe048d'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`

    axios.get(url)
    .then(res => {
      setWeather(res.data)
      const obj= {
        celsius: (res.data.main.temp - 273.15).toFixed(1) ,
        farenheit: ((res.data.main.temp - 273.15) * 9/5 +32).toFixed(1)
      }

      setTemperature(obj)})

    .catch(err=> console.log(err))
    .finally (()=>setIsLoading(false))
  }
}, [coords])


  return (
    <div className="App">
      {
        isLoading?
        <h1 className='set__loading'>
          Loading...
          </h1>
        :
     <WeatherCard 
      weather={weather}
      temperature={temperature}/>
     }
    </div>
  )
}

export default App
