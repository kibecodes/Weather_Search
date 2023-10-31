import { useState, useEffect } from "react";
import SearchTab from "./components/search.tab";

interface WeatherDataProps {
  location: {
    name: string,
    region: string,
    country: string
  },
  current: {
    temp_c: string, 
    temp_f: string, 
    condition: string, 
    humidity: number
  },
  condition: {
    text: string,
  }
}

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [query, setQuery] = useState("")

    const handleSearch = () => {
        setSearchHistory(prevHistory => [...prevHistory, query]);
        setQuery(query)
    }

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
      e.preventDefault();
      handleSearch();
  }
    

  useEffect (() => {
    ( async() => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8d2f97e789064394953175937231306&q=${query}`)
        if (!response.ok){
          throw new Error("Request failed")
        }
        const data =  await response.json()
        console.log(data)
        const {location, current} = data
        const {name, region, country} = location
        const {temp_c, temp_f, condition, humidity} = current
        const {text} = condition 
        const transformedData = {
          location: {name, region, country},
          current: {temp_c, temp_f, condition, humidity},
          condition: {text}
        }
        setWeatherData(transformedData)
        setIsLoading(false)
      } catch (error) {
        console.error("An error occurred:", error)
      }
    })()
  },[searchHistory])

  return ( 
    <>
    <div>
      <SearchTab 
        query={query} 
        setQuery={setQuery}
        handleSubmit={handleSubmit}
        handleSearch={handleSearch} 
        setSearchHistory={setSearchHistory}

        />

          <div>
      {isLoading ? 
      <div>... Loading </div>
       : 
      <div style={{ backgroundColor: "lightgreen", display: "flex",flexDirection: "column", textAlign: "center", padding: 4}}>
        <p>Location: {weatherData?.location.name}, {weatherData?.location.country}</p>
        <p>Temperature: {weatherData?.current.temp_c}°C / {weatherData?.current.temp_f}°F</p>
        <p>Condition: {weatherData?.condition.text}</p>
      </div> 
      }
    </div>
    </div>
    </>
  )
}

export default App