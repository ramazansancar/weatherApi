import axios from 'axios';
import asyncHandler from 'express-async-handler';

import {
    errorMessage,
    successMessage,
    convertTimestamp
} from '../../functions/helpers.js';

// @desc    Get weather by city
// @route   GET /weather/:city
// @access  Public
export const getWeatherbyCity = asyncHandler(async (req, res) => {
    const { city } = req.params;
    const { units, lang } = req.query;

    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&q=${city}&lang=${(lang)?lang:'en'}&units=${(units)?units:'metrics'}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, '[secret]') : null;
        return errorMessage(res, err.message, {'params:':req.params,'query':req.query}, err, 400);
    });

    if (data.cod === 200) {
        let result = {
            "cod": data.cod,
            "id": data.id,
            "name": data.name,
            "country": data.sys.country,
            "lat": data.coord.lat,
            "long": data.coord.lon,
            "weather": data.weather[0].main,
            "weather_description": data.weather[0].description,
            "weather_icon": data.weather[0].icon,
            "temp": data.main.temp,
            "temp_min": data.main.temp_min,
            "temp_max": data.main.temp_max,
            "pressure": data.main.pressure,
            "humidity": data.main.humidity,
            "wind_speed": data.wind.speed,
            "wind_deg": data.wind.deg,
            "wind_gust": data.wind.gust,
            "rain_1h": (data.rain) ? data.rain["1h"] : null,
            "clouds": data.clouds.all,
            "sunrise": convertTimestamp(data.sys.sunrise, 'tr-TR', 'Europe/Istanbul'),
            "sunset": convertTimestamp(data.sys.sunset, 'tr-TR', 'Europe/Istanbul'),
            "timezone": data.timezone,
            "datetime": convertTimestamp(data.dt, 'tr-TR', 'Europe/Istanbul'),
            "base": data.base,
            "visibility": data.visibility
        }
        return successMessage(res, result, 'Weather API up!', {'params:':req.params,'query':req.query}, 200);
    } else {
        return errorMessage(res, '404 Not Found', {'params:':req.params,'query':req.query}, '404 Not Found', 404);
    }
});

// @desc    Get weather by lat and long
// @route   GET /weather/:lat/:long
// @access  Public
export const getWeatherbyLatLong = asyncHandler(async (req, res) => {
    const { lat, long } = req.params;
    const { units, lang } = req.query;

    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:'en'}&units=${(units)?units:'metrics'}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, '[secret]') : null;
        return errorMessage(res, err.message, {'params:':req.params,'query':req.query}, err, 400);
    });

    if (data.cod === 200) {
        let result = {
            "cod": data.cod,
            "id": data.id,
            "name": data.name,
            "country": data.sys.country,
            "lat": data.coord.lat,
            "long": data.coord.lon,
            "weather": data.weather[0].main,
            "weather_description": data.weather[0].description,
            "weather_icon": data.weather[0].icon,
            "temp": data.main.temp,
            "temp_min": data.main.temp_min,
            "temp_max": data.main.temp_max,
            "pressure": data.main.pressure,
            "humidity": data.main.humidity,
            "wind_speed": data.wind.speed,
            "wind_deg": data.wind.deg,
            "wind_gust": data.wind.gust,
            "rain_1h": (data.rain) ? data.rain["1h"] : null,
            "clouds": data.clouds.all,
            "sunrise": convertTimestamp(data.sys.sunrise, 'tr-TR', 'Europe/Istanbul'),
            "sunset": convertTimestamp(data.sys.sunset, 'tr-TR', 'Europe/Istanbul'),
            "timezone": data.timezone,
            "datetime": convertTimestamp(data.dt, 'tr-TR', 'Europe/Istanbul'),
            "base": data.base,
            "visibility": data.visibility
        }
        return successMessage(res, result, 'Weather API up!', {'params:':req.params,'query':req.query}, 200);
    } else {
        return errorMessage(res, '404 Not Found', {'params:':req.params,'query':req.query}, '404 Not Found', 404);
    }
});

// @desc    Get weather by city
// @route   GET /weather/
// @access  Public
export const getWeather = asyncHandler(async (req, res) => {
    const { city, lat, long } = req.params;
    const { units, lang } = req.query;

    if (city) {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&q=${city}&lang=${(lang)?lang:'en'}&units=${(units)?units:'metrics'}`).catch((err) => {
            err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, '[secret]') : null;
            return errorMessage(res, err.message, {'params:':req.params,'query':req.query}, err, 400);
        });

        if (data.cod === 200) {
            let result = {
                "cod": data.cod,
                "id": data.id,
                "name": data.name,
                "country": data.sys.country,
                "lat": data.coord.lat,
                "long": data.coord.lon,
                "weather": data.weather[0].main,
                "weather_description": data.weather[0].description,
                "weather_icon": data.weather[0].icon,
                "temp": data.main.temp,
                "temp_min": data.main.temp_min,
                "temp_max": data.main.temp_max,
                "pressure": data.main.pressure,
                "humidity": data.main.humidity,
                "wind_speed": data.wind.speed,
                "wind_deg": data.wind.deg,
                "wind_gust": data.wind.gust,
                "rain_1h": (data.rain) ? data.rain["1h"] : null,
                "clouds": data.clouds.all,
                "sunrise": convertTimestamp(data.sys.sunrise, 'tr-TR', 'Europe/Istanbul'),
                "sunset": convertTimestamp(data.sys.sunset, 'tr-TR', 'Europe/Istanbul'),
                "timezone": data.timezone,
                "datetime": convertTimestamp(data.dt, 'tr-TR', 'Europe/Istanbul'),
                "base": data.base,
                "visibility": data.visibility
            }
            return successMessage(res, result, 'Weather API up!', {'params:':req.params,'query':req.query}, 200);
        } else {
            return errorMessage(res, '404 Not Found', {'params:':req.params,'query':req.query}, '404 Not Found', 404);
        }
    } else if (lat && long) {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:'en'}&units=${(units)?units:'metrics'}`).catch((err) => {
            err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, '[secret]') : null;
            return errorMessage(res, err.message, req.params, err, 400);
        });

        if (data.cod === 200) {
            let result = {
                "cod": data.cod,
                "id": data.id,
                "name": data.name,
                "country": data.sys.country,
                "lat": data.coord.lat,
                "long": data.coord.lon,
                "weather": data.weather[0].main,
                "weather_description": data.weather[0].description,
                "weather_icon": data.weather[0].icon,
                "temp": data.main.temp,
                "temp_min": data.main.temp_min,
                "temp_max": data.main.temp_max,
                "pressure": data.main.pressure,
                "humidity": data.main.humidity,
                "wind_speed": data.wind.speed,
                "wind_deg": data.wind.deg,
                "wind_gust": data.wind.gust,
                "rain_1h": (data.rain) ? data.rain["1h"] : null,
                "clouds": data.clouds.all,
                "sunrise": convertTimestamp(data.sys.sunrise, 'tr-TR', 'Europe/Istanbul'),
                "sunset": convertTimestamp(data.sys.sunset, 'tr-TR', 'Europe/Istanbul'),
                "timezone": data.timezone,
                "datetime": convertTimestamp(data.dt, 'tr-TR', 'Europe/Istanbul'),
                "base": data.base,
                "visibility": data.visibility
            }
            return successMessage(res, result, 'Weather API up!', req.params, 200);
        } else {
            return errorMessage(res, '404 Not Found', req.params, '404 Not Found', 404);
        }
    } else {
        return errorMessage(res, 'Bad Request', req.params, 'Bad Request', 404);
    }
});

// @desc    Get weather list by lat and long
// @route   GET /weather/find/:lat/:long
// @access  Public
export const getWeatherListbyLatLong = asyncHandler(async (req, res) => {
    const { lat, long } = req.params;
    const { units, lang, count } = req.query;

    if(count > 50) return errorMessage(res, 'Count must be less than 50', {'params:':req.params,'query':req.query}, 'Count must be less than 50', 400);

    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/find?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:'en'}&units=${(units)?units:'metrics'}&cnt=${(count)?count:10}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, '[secret]') : null;
        return errorMessage(res, err.message, {'params:':req.params,'query':req.query}, err, 400);
    });
    
    if (data.cod === "200") {
        let result = data.list.map((item) => {
            let newItem = {};

            newItem.id = item.id;
            newItem.name = item.name;
            newItem.country = item.sys.country;
            newItem.lat = item.coord.lat;
            newItem.long = item.coord.lon;
            newItem.weather = item.weather[0].main;
            newItem.weather_description = item.weather[0].description;
            newItem.weather_icon = item.weather[0].icon;
            newItem.temp = item.main.temp;
            newItem.temp_min = item.main.temp_min;
            newItem.temp_max = item.main.temp_max;
            newItem.pressure = item.main.pressure;
            newItem.humidity = item.main.humidity;
            newItem.wind_speed = item.wind.speed;
            newItem.wind_deg = item.wind.deg;
            newItem.wind_gust = item.wind.gust;
            newItem.rain_1h = (item.rain) ? item.rain["1h"] : null;
            newItem.clouds = item.clouds.all;
            newItem.sunrise = (item.sys.sunrise) ? convertTimestamp(item.sys.sunrise, 'tr-TR', 'Europe/Istanbul') : undefined;
            newItem.sunset = (item.sys.sunset) ? convertTimestamp(item.sys.sunset, 'tr-TR', 'Europe/Istanbul') : undefined;
            newItem.datetime = (item.dt) ? convertTimestamp(item.dt, 'tr-TR', 'Europe/Istanbul') : undefined;
            newItem.base = item.base;
            newItem.visibility = item.visibility;

            return newItem;
        });

        return successMessage(res, result, 'Weather API up!', {'params:':req.params,'query':req.query}, 200);
    } else {
        return errorMessage(res, '404 Not Found', {'params:':req.params,'query':req.query}, '404 Not Found', 404);
    }
});
