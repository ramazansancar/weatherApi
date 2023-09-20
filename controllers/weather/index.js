import axios from "axios";
import asyncHandler from "express-async-handler";

import {
    errorMessage,
    successMessage,
    resultObject,
    requestWeeklyObject,
    requestWeeklyDailyObject,
} from "../../functions/helpers.js";
import dotenv from "dotenv";
dotenv.config();

let weatherApiKey = process.env.OPENWEATHERMAP_API_KEY;

const weatherApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

// @desc    Get weather by city
// @route   GET /weather/:city
// @access  Public
export const getWeatherbyCity = asyncHandler(async (req, res) => {
    const { city } = req.params;
    const { units, lang, api } = req.query;

    if(api !== null || api !== undefined) weatherApiKey = api;

    const { data } = await weatherApi.get(`weather?appid=${weatherApiKey}&q=${decodeURI(city)}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(weatherApiKey, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });

    if(parseInt(data.cod) === 401) return errorMessage(res, "API Key is invalid! See here: https://openweathermap.org/faq#error401", {"params":req.params,"query":req.query}, "API Key is invalid", 401);

    if (parseInt(data.cod) === 200) {
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
    let { units, lang, api } = req.query;
    lat = parseFloat(lat);
    long = parseFloat(long);

    if(api !== null || api !== undefined) weatherApiKey = api;

    if(!lat || !long) return errorMessage(res, "Lat and Long are required", {"params":req.params,"query":req.query}, "Lat and Long are required", 400);

    const { data } = await weatherApi.get(`weather?appid=${weatherApiKey}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(weatherApiKey, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });

    if(parseInt(data.cod) === 401) return errorMessage(res, "API Key is invalid! See here: https://openweathermap.org/faq#error401", {"params":req.params,"query":req.query}, "API Key is invalid", 401);

    if (parseInt(data.cod) === 200) {
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
    const { units, lang, api } = req.query;

    if(api !== null || api !== undefined) weatherApiKey = api;

    if (city) {
        const { data } = await weatherApi.get(`weather?appid=${weatherApiKey}&q=${decodeURI(city)}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
            err.config.url = (err.config.url) ? err.config.url.replace(weatherApiKey, "[secret]") : null;
            console.log(JSON.stringify(err));
            return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
        });

        if(parseInt(data.cod) === 401) return errorMessage(res, "API Key is invalid! See here: https://openweathermap.org/faq#error401", {"params":req.params,"query":req.query}, "API Key is invalid", 401);

        if (parseInt(data.cod) === 200) {
            return successMessage(res, resultObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
        } else {
            return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
        }
    } else if (lat && long) {
        const { data } = await weatherApi.get(`weather?appid=${weatherApiKey}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
            err.config.url = (err.config.url) ? err.config.url.replace(weatherApiKey, "[secret]") : null;
            console.log(JSON.stringify(err));
            return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
        });

        if(parseInt(data.cod) === 401) return errorMessage(res, "API Key is invalid! See here: https://openweathermap.org/faq#error401", {"params":req.params,"query":req.query}, "API Key is invalid", 401);

        if (parseInt(data.cod) === 200) {
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
    let { units, lang, count, api } = req.query;
    lat = parseFloat(lat);
    long = parseFloat(long);
    count = parseInt(count);

    if(api !== null || api !== undefined) weatherApiKey = api;

    if(!lat || !long) return errorMessage(res, "Lat and Long are required", {"params":req.params,"query":req.query}, "Lat and Long are required", 400);
    if(isNaN(count)) return errorMessage(res, "Count must be a number", {"params":req.params,"query":req.query}, "Count must be a number", 400);
    if(count < 1) return errorMessage(res, "Count must be greater than 1", {"params":req.params,"query":req.query}, "Count must be greater than 1", 400);
    if(count > 50) return errorMessage(res, "Count must be less than 50", {"params":req.params,"query":req.query}, "Count must be less than 50", 400);
    
    let { data } = await weatherApi.get(`find?appid=${weatherApiKey}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}&cnt=${(count)?count:10}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(weatherApiKey, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });

    if(parseInt(data.cod) === 401) return errorMessage(res, "API Key is invalid! See here: https://openweathermap.org/faq#error401", {"params":req.params,"query":req.query}, "API Key is invalid", 401);
    
    if (parseInt(data.cod) === 200) {
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
    let { units, lang, count, api } = req.query;
    count = parseInt(count);

    if(api !== null || api !== undefined) weatherApiKey = api;

    if(isNaN(count)) return errorMessage(res, "Count must be a number", {"params":req.params,"query":req.query}, "Count must be a number", 400);
    if(count < 1) return errorMessage(res, "Count must be greater than 1", {"params":req.params,"query":req.query}, "Count must be greater than 1", 400);
    if(count > 40) return errorMessage(res, "Count must be less than 40", {"params":req.params,"query":req.query}, "Count must be less than 40", 400);

    let { data } = await weatherApi.get(`forecast?appid=${weatherApiKey}&q=${decodeURI(city)}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}&cnt=${(count)?count:40}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(weatherApiKey, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });

    if(parseInt(data.cod) === 401) return errorMessage(res, "API Key is invalid! See here: https://openweathermap.org/faq#error401", {"params":req.params,"query":req.query}, "API Key is invalid", 401);
    
    if (parseInt(data.cod) === 200) {
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
    let { units, lang, count, api } = req.query;
    lat = parseFloat(lat);
    long = parseFloat(long);
    count = parseInt(count);

    if(api !== null || api !== undefined) weatherApiKey = api;

    if(!lat || !long) return errorMessage(res, "Lat and Long are required", {"params":req.params,"query":req.query}, "Lat and Long are required", 400);
    if(isNaN(count)) return errorMessage(res, "Count must be a number", {"params":req.params,"query":req.query}, "Count must be a number", 400);
    if(count < 1) return errorMessage(res, "Count must be greater than 1", {"params":req.params,"query":req.query}, "Count must be greater than 1", 400);
    if(count > 40) return errorMessage(res, "Count must be less than 40", {"params":req.params,"query":req.query}, "Count must be less than 40", 400);

    let { data } = await weatherApi.get(`forecast?appid=${weatherApiKey}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}&cnt=${(count)?count:40}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(weatherApiKey, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });

    if(parseInt(data.cod) === 401) return errorMessage(res, "API Key is invalid! See here: https://openweathermap.org/faq#error401", {"params":req.params,"query":req.query}, "API Key is invalid", 401);
    
    if (data.cod === "200") {
        return successMessage(res, requestWeeklyObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
    } else {
        return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
    }
});

// @desc    Get weekly daily weather list by city name
// @route   GET /weather/weekly/daily/:city
// @access  Public
// @note    This API is not available on free plan
export const getWeeklyDailyWeatherList = asyncHandler(async (req, res) => {
    const { city } = req.params;
    let { units, lang, count, api } = req.query;
    count = parseInt(count);

    if(api !== null || api !== undefined) weatherApiKey = api;

    if(isNaN(count)) return errorMessage(res, "Count must be a number", {"params":req.params,"query":req.query}, "Count must be a number", 400);
    if(count < 1) return errorMessage(res, "Count must be greater than 1", {"params":req.params,"query":req.query}, "Count must be greater than 1", 400);
    if(count > 16) return errorMessage(res, "Count must be less than 16", {"params":req.params,"query":req.query}, "Count must be less than 16", 400);

    let { data } = await weatherApi.get(`forecast/daily?appid=${weatherApiKey}&q=${city}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}&cnt=${(count)?count:16}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(weatherApiKey, "[secret]") : null;
        console.log(JSON.stringify(err));
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, "API Error", 400);
    });

    if(parseInt(data.cod) === 401) return errorMessage(res, "API Key is invalid! See here: https://openweathermap.org/faq#error401", {"params":req.params,"query":req.query}, "API Key is invalid", 401);
    
    if (parseInt(data.cod) === 200) {
        return successMessage(res, requestWeeklyDailyObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
    } else {
        return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
    }
});