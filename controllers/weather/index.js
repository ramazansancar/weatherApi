import axios from "axios";
import asyncHandler from "express-async-handler";

import {
    errorMessage,
    successMessage,
    resultObject,
    requestWeeklyObject,
} from "../../functions/helpers.js";

// @desc    Get weather by city
// @route   GET /weather/:city
// @access  Public
export const getWeatherbyCity = asyncHandler(async (req, res) => {
    const { city } = req.params;
    const { units, lang } = req.query;

    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&q=${decodeURI(city)}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });

    if (data.cod === 200) {
        return successMessage(res, resultObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
    } else {
        return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
    }
});

// @desc    Get weather by lat and long
// @route   GET /weather/:lat/:long
// @access  Public
export const getWeatherbyLatLong = asyncHandler(async (req, res) => {
    let { lat, long } = req.params;
    let { units, lang } = req.query;
    lat = parseFloat(lat);
    long = parseFloat(long);

    if(!lat || !long) return errorMessage(res, "Lat and Long are required", {"params":req.params,"query":req.query}, "Lat and Long are required", 400);

    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });

    if (data.cod === 200) {
        return successMessage(res, resultObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
    } else {
        return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
    }
});

// @desc    Get weather by city
// @route   GET /weather/
// @access  Public
export const getWeather = asyncHandler(async (req, res) => {
    const { city, lat, long } = req.params;
    const { units, lang } = req.query;

    if (city) {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&q=${decodeURI(city)}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
            err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
        });

        if (data.cod === 200) {
            return successMessage(res, resultObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
        } else {
            return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
        }
    } else if (lat && long) {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
            err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
        });

        if (data.cod === 200) {
            return successMessage(res, resultObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
        } else {
            return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
        }
    } else {
        return errorMessage(res, "Bad Request", {"params":req.params,"query":req.query}, "Bad Request", 404);
    }
});

// @desc    Get weather list by lat and long
// @route   GET /weather/find/:lat/:long
// @access  Public
export const getWeatherListbyLatLong = asyncHandler(async (req, res) => {
    let { lat, long } = req.params;
    let { units, lang, count } = req.query;
    lat = parseFloat(lat);
    long = parseFloat(long);
    count = parseInt(count);

    if(!lat || !long) return errorMessage(res, "Lat and Long are required", {"params":req.params,"query":req.query}, "Lat and Long are required", 400);
    if(isNaN(count)) return errorMessage(res, "Count must be a number", {"params":req.params,"query":req.query}, "Count must be a number", 400);
    if(count < 1) return errorMessage(res, "Count must be greater than 1", {"params":req.params,"query":req.query}, "Count must be greater than 1", 400);
    if(count > 50) return errorMessage(res, "Count must be less than 50", {"params":req.params,"query":req.query}, "Count must be less than 50", 400);
    
    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/find?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}&cnt=${(count)?count:10}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });
    
    if (data.cod === "200") {
        let result = data.list.map((item) => resultObject(item));
        return successMessage(res, result, "Weather API up!", {"params":req.params,"query":req.query}, 200);
    } else {
        return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
    }
});


// @desc    Get weather list by lat and long
// @route   GET /weather/weekly/:city
// @access  Public
export const getWeeklyWeatherListbyCity = asyncHandler(async (req, res) => {
    const { city } = req.params;
    let { units, lang, count } = req.query;
    count = parseInt(count);

    if(isNaN(count)) return errorMessage(res, "Count must be a number", {"params":req.params,"query":req.query}, "Count must be a number", 400);
    if(count < 1) return errorMessage(res, "Count must be greater than 1", {"params":req.params,"query":req.query}, "Count must be greater than 1", 400);
    if(count > 40) return errorMessage(res, "Count must be less than 40", {"params":req.params,"query":req.query}, "Count must be less than 40", 400);

    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.OPENWEATHERMAP_API_KEY}&q=${decodeURI(city)}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}&cnt=${(count)?count:40}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });
    
    if (data.cod === "200") {
        return successMessage(res, requestWeeklyObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
    } else {
        return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
    }
});

// @desc    Get weather list by lat and long
// @route   GET /weather/weekly/:lat/:long
// @access  Public
export const getWeeklyWeatherListbyLatLong = asyncHandler(async (req, res) => {
    let { lat, long } = req.params;
    let { units, lang, count } = req.query;
    lat = parseFloat(lat);
    long = parseFloat(long);
    count = parseInt(count);

    if(!lat || !long) return errorMessage(res, "Lat and Long are required", {"params":req.params,"query":req.query}, "Lat and Long are required", 400);
    if(isNaN(count)) return errorMessage(res, "Count must be a number", {"params":req.params,"query":req.query}, "Count must be a number", 400);
    if(count < 1) return errorMessage(res, "Count must be greater than 1", {"params":req.params,"query":req.query}, "Count must be greater than 1", 400);
    if(count > 40) return errorMessage(res, "Count must be less than 40", {"params":req.params,"query":req.query}, "Count must be less than 40", 400);

    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}&cnt=${(count)?count:40}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });
    
    if (data.cod === "200") {
        return successMessage(res, requestWeeklyObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
    } else {
        return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
    }
});