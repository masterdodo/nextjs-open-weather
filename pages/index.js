import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import React from 'react'
import {BsSearch} from 'react-icons/bs'
import Weather from '../components/Weather'
import Loading from '../components/Loading'

export default function Home() {

  const [city, setCity] = React.useState('')
  const [weather, setWeather] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API}`

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(api_url).then(response => {
      setWeather(response.data);
    })

    setCity('');
    setLoading(false);
  }

  if (loading) {
    return <Loading />
  }
  else {
    return (
      <div>
        <Head>
          <title>NextJS - Open Weather</title>
          <meta name="description" content="NextJS - Weather App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/30 z-[1]' />
        <Image src='/images/weather-overlay.jpg' layout='fill' className='object-cover' />
  
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
          <form onSubmit={fetchWeather} className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
            <div>
              <input onChange={e => setCity(e.target.value)} className='bg-transparent border-none text-white focus:outline-none text-2xl' type="text" placeholder="Search" />
            </div>
            <button onClick={fetchWeather}><BsSearch size={20} /></button>
          </form>
        </div>
  
        {/* weather widget */}
  
        {weather.main && <Weather data={weather} />}
  
      </div>
    )
  }
}
