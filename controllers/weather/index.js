import axios from "axios";
import asyncHandler from "express-async-handler";

import {
    errorMessage,
    successMessage,
    resultObject
} from "../../functions/helpers.js";

// @desc    Get weather by city
// @route   GET /weather/:city
// @access  Public
export const getWeatherbyCity = asyncHandler(async (req, res) => {
    const { city } = req.params;
    const { units, lang } = req.query;

    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&q=${city}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, err, 400);
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
    const { lat, long } = req.params;
    const { units, lang } = req.query;

    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, err, 400);
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
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&q=${city}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
            err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
            return errorMessage(res, err.message, {"params":req.params,"query":req.query}, err, 400);
        });

        if (data.cod === 200) {
            return successMessage(res, resultObject(data), "Weather API up!", {"params":req.params,"query":req.query}, 200);
        } else {
            return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
        }
    } else if (lat && long) {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}`).catch((err) => {
            err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
            return errorMessage(res, err.message, {"params":req.params,"query":req.query}, err, 400);
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
    const { lat, long } = req.params;
    const { units, lang, count } = req.query;

    if(count > 50) return errorMessage(res, "Count must be less than 50", {"params":req.params,"query":req.query}, "Count must be less than 50", 400);

    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/find?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${long}&lang=${(lang)?lang:"en"}&units=${(units)?units:"metrics"}&cnt=${(count)?count:10}`).catch((err) => {
        err.config.url = (err.config.url) ? err.config.url.replace(process.env.OPENWEATHERMAP_API_KEY, "[secret]") : null;
        return errorMessage(res, err.message, {"params":req.params,"query":req.query}, err, 400);
    });
    
    if (data.cod === "200") {
        let result = data.list.map((item) => resultObject(item));
        return successMessage(res, result, "Weather API up!", {"params":req.params,"query":req.query}, 200);
    } else {
        return errorMessage(res, "404 Not Found", {"params":req.params,"query":req.query}, "404 Not Found", 404);
    }
});
