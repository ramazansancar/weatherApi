const errorMessage = (res, message, parameters = {}, result = {}, status = 400, errorCode = undefined) => {
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

const successMessage = (res, data, message = "request successful.", parameters = {}, status = 200, extras = {}) => {
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

const convertTimestamp = (date, languageCode, timeZoneString) => {
    const dateObject = new Date(date * 1000);
    return dateObject.toLocaleString(languageCode, { timeZone: timeZoneString })
}

export {
    errorMessage,
    successMessage,
    convertTimestamp
}