import axios from "axios"
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js"

// const key = 'a3e003feebbee39c7d59ca9a3c5b41c4'

const getWheather = async (city) => {

    const API_KEY = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
    console.log(API_KEY)
    const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: API_KEY,
            limit: 1
        }
    })

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: response.data[0]?.lat,
            lon: response.data[0]?.lon,
            appid: API_KEY,
            units: 'metric',
            lang: 'ru',
        }
    })
    return data;


}

export { getWheather }