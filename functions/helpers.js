export const errorMessage = (res, message, parameters = {}, result = {}, status = 400, errorCode = null) => {
    if(typeof status === "string" || status === null || status === ""){
        status = 400
    }
    return res
        .status(status)
        .json({
            success: false,
            message,
            parameters,
            errorCode,
            result
        })
}

export const successMessage = (res, data, message = "request successful.", parameters = {}, status = 200, extras = {}) => {
    if(typeof status === "string" || status === null || status === ""){
        status = 200
    }

    return res
        .status(status)
        .json({
            success: true,
            message,
            parameters,
            data,
            extras
        })
}

export const convertTimestamp = (date, languageCode, timeZoneString) => {
    const dateObject = new Date(date * 1000);
    return dateObject.toLocaleString(languageCode, { timeZone: timeZoneString })
}

export const resultObject = (data) => {
    const languageCode = "tr-TR";
    const timeZoneString = "Europe/Istanbul";

    return {
        cod: (data.cod) ? data.cod : null,
        id: (data.id) ? data.id : null,
        name: (data.name) ? data.name : null,
        country: (data.sys.country) ? data.sys.country : null,
        lat: (data.coord.lat) ? data.coord.lat : null,
        long: (data.coord.lon) ? data.coord.lon : null,
        weather: (data.weather[0].main) ? data.weather[0].main : null,
        weather_description: (data.weather[0].description) ? data.weather[0].description : null,
        weather_icon: (data.weather[0].icon) ? data.weather[0].icon : null,
        temp: (data.main.temp) ? data.main.temp : null,
        temp_min: (data.main.temp_min) ? data.main.temp_min : null,
        temp_max: (data.main.temp_max) ? data.main.temp_max : null,
        pressure: (data.main.pressure) ? data.main.pressure : null,
        humidity: (data.main.humidity) ? data.main.humidity : null,
        wind_speed: (data.wind.speed) ? data.wind.speed : null,
        wind_deg: (data.wind.deg) ? data.wind.deg : null,
        wind_gust: (data.wind.gust) ? data.wind.gust : null,
        rain_1h: (data.rain) ? data.rain["1h"] : null,
        clouds: (data.clouds.all) ? data.clouds.all : null,
        sunrise: (data.sys.sunrise) ? convertTimestamp(data.sys.sunrise, languageCode, timeZoneString) : null,
        sunset: (data.sys.sunset) ? convertTimestamp(data.sys.sunset, languageCode, timeZoneString) : null,
        timezone: (data.timezone) ? data.timezone : null,
        datetime: (data.dt) ? convertTimestamp(data.dt, languageCode, timeZoneString) : null,
        base: (data.base) ? data.base : null,
        visibility: (data.visibility) ? data.visibility : null,
    }
}