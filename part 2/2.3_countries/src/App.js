import React,{useState,useEffect} from 'react'
import axios from 'axios'


const App =()=> {

  const [countries, setCountries] = useState ([])
  const [country , setCountry] = useState ('')
  const [weather, setWeather] = useState('')

  useEffect(()=>{ axios.get('https://restcountries.eu/rest/v2/all').then(response =>{setCountries(response.data)})},[])
  
  const handleCountry = (event) => setCountry(event.target.value)
  
  const handleButton=(event)=> setCountry(event.target.getAttribute('data-con'))
     
  const countryFiltered = countries.filter(p=>p.name.toLowerCase().includes(country.toLowerCase()))

  return(
    <div>
      <form>
        find countries <input value={country} onChange={handleCountry}/>
      </form>
      <Display filtered = {countryFiltered} handleButton={()=>handleButton} weather= {weather} setWeather = {setWeather}/>  
    </div>
  )
}

const DisWeather = ({capital,setWeather,weather}) => {
  useEffect(()=>{ axios.get('http://api.apixu.com/v1/current.json?key=b607e9a2aa4f4e39bb1100150190707&q='+capital)
      .then(response=>{
        setWeather(response.data)    
      })
  },[capital,setWeather])
  if(weather){
    return(
      <div>
      <h3>Wheather in {capital}</h3>
      <p><b>temperature:</b> {weather.current.temp_c} Celsius</p>
      <img src ={weather.current.condition.icon} height ="50" alt ="weather" />
      <p><b>wind: </b>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
      </div>
      )}
      else{
      return('')
      }
}

const Display = ({filtered,handleButton, weather,setWeather}) => {
  if(filtered.length===1){
    return(
      <div>
      <h1>{filtered[0].name}</h1>
      <p>Capital: {filtered[0].capital}</p>
      <p>Population: {filtered[0].population}</p>
      <h2>Languages</h2>
      {filtered[0].languages.map(lang=> <li key={lang.iso639_1}> {lang.name}</li>)}
      <p><img src ={filtered[0].flag} height="130" width="200" alt = "flag" /></p>
      <DisWeather capital = {filtered[0].capital} setWeather = {setWeather} weather = {weather}/>
      </div> 
    )} else if(filtered.length<11 && filtered.length>0){
    return(
      <div>
        { filtered.map(p=> <p key = { p.alpha2Code}>{p.name}<button onClick ={handleButton()} data-con ={p.name} >show</button></p>)}
      </div>
    )}  
    return(
      <div>Too many matches, specify another filter</div>
    )}

export default App