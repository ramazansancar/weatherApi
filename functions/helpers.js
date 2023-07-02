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

export const successMessage = (res, data, message = "request successful.", parameters = {}, status = 200) => {
    if(typeof status === "string" || status === null || status === ""){
        status = 200
    }

    return res
        .status(status)
        .json({
            success: true,
            message,
            parameters,
            data
        })
}

export const convertTimestamp = (date, languageCode, timeZoneString) => {
    const dateObject = new Date(date * 1000);
    return dateObject.toLocaleString(languageCode, { timeZone: timeZoneString })
}

export const resultObject = (data) => {
    const languageCode = "tr-TR";
    const timeZoneString = "Europe/Istanbul";

    if(!data){
        return {};
    }
    return {
        cod: (data.cod) ? data.cod : null,
        id: (data.id) ? data.id : null,
        name: (data.name) ? data.name : null,
        country: (data.sys.country) ? countryConverter(data.sys.country) : null,
        lat: (data.coord.lat) ? data.coord.lat : null,
        long: (data.coord.lon) ? data.coord.lon : null,
        weather: (data.weather[0].main) ? data.weather[0].main : null,
        weather_id: (data.weather[0].id) ? data.weather[0].id : null,
        weather_description: (data.weather[0].description) ? data.weather[0].description : null,
        weather_icon: (data.weather[0].icon) ? data.weather[0].icon : null,
        temp: (data.main.temp) ? data.main.temp : null,
        temp_min: (data.main.temp_min) ? data.main.temp_min : null,
        temp_max: (data.main.temp_max) ? data.main.temp_max : null,
        pressure: (data.main.pressure) ? data.main.pressure : null,
        humidity: (data.main.humidity) ? data.main.humidity : null,
        sea_level: (data.main.sea_level) ? data.main.sea_level : null,
        grnd_level: (data.main.grnd_level) ? data.main.grnd_level : null,
        wind_speed: (data.wind.speed) ? data.wind.speed : null,
        wind_deg: (data.wind.deg) ? data.wind.deg : null,
        wind_gust: (data.wind.gust) ? data.wind.gust : null,
        clouds: (data.clouds.all) ? data.clouds.all : null,
        rain_1h: (data.rain) ? data.rain["1h"] : null,
        rain_3h: (data.rain) ? data.rain["3h"] : null,
        snow_1h: (data.snow) ? data.snow["1h"] : null,
        snow_3h: (data.snow) ? data.snow["3h"] : null,
        sunrise: (data.sys.sunrise) ? convertTimestamp(data.sys.sunrise, languageCode, timeZoneString) : null,
        sunset: (data.sys.sunset) ? convertTimestamp(data.sys.sunset, languageCode, timeZoneString) : null,
        timezone: (data.timezone) ? data.timezone : null,
        datetime: (data.dt) ? convertTimestamp(data.dt, languageCode, timeZoneString) : null,
        base: (data.base) ? data.base : null,
        visibility: (data.visibility) ? data.visibility : null,
    }
}

export const requestWeeklyObject = (data) => {
    const languageCode = "tr-TR";
    const timeZoneString = "Europe/Istanbul";

    //let days = {};
    let days = [];

    if(!data.list){
        return days;
    }
    for (let i = 0; i < data.list.length; i++) {
        //let day = convertTimestamp(data.list[i].dt, languageCode, timeZoneString).split(" ")[0].replace(".", "-").replace(".", "-");
        //let time = convertTimestamp(data.list[i].dt, languageCode, timeZoneString).split(" ")[1].replace(/:/g, "_").split("_").slice(0, 2).join("_");
        /*if(!days[day]){
            days[day] = [];
        }*/
        //days[day].push({
        days.push({
            id: i+1,
            datetime: (data.list[i].dt) ? convertTimestamp(data.list[i].dt, languageCode, timeZoneString) : null,
            date: convertTimestamp(data.list[i].dt, languageCode, timeZoneString).split(" ")[0],
            time: convertTimestamp(data.list[i].dt, languageCode, timeZoneString).split(" ")[1],
            temp: (data.list[i].main.temp) ? data.list[i].main.temp : null,
            temp_feels_like: (data.list[i].main.feels_like) ? data.list[i].main.feels_like : null,
            temp_min: (data.list[i].main.temp_min) ? data.list[i].main.temp_min : null,
            temp_max: (data.list[i].main.temp_max) ? data.list[i].main.temp_max : null,
            temp_kf: (data.list[i].main.temp_kf) ? data.list[i].main.temp_kf : null,
            pressure: (data.list[i].main.pressure) ? data.list[i].main.pressure : null,
            humidity: (data.list[i].main.humidity) ? data.list[i].main.humidity : null,
            sea_level: (data.list[i].main.sea_level) ? data.list[i].main.sea_level : null,
            grnd_level: (data.list[i].main.grnd_level) ? data.list[i].main.grnd_level : null,
            weather: (data.list[i].weather[0].main) ? data.list[i].weather[0].main : null,
            weather_id: (data.list[i].weather[0].id) ? data.list[i].weather[0].id : null,
            weather_description: (data.list[i].weather[0].description) ? data.list[i].weather[0].description : null,
            weather_icon: (data.list[i].weather[0].icon) ? data.list[i].weather[0].icon : null,
            clouds: (data.list[i].clouds.all) ? data.list[i].clouds.all : null,
            wind_speed: (data.list[i].wind.speed) ? data.list[i].wind.speed : null,
            wind_deg: (data.list[i].wind.deg) ? data.list[i].wind.deg : null,
            wind_gust: (data.list[i].wind.gust) ? data.list[i].wind.gust : null,
            rain_pop: (data.list[i].pop) ? data.list[i].pop*100 : null,
            rain_3h: (data.list[i].rain) ? data.list[i].rain["3h"] : null,
            snow_3h: (data.list[i].snow) ? data.list[i].snow["3h"] : null,
            pod: (data.list[i].sys.pod) ? (data.list[i].sys.pod === "n" ? "night" : (data.list[i].sys.pod === "d" ? "day" : data.list[i].sys.pod)) : null,
        });
    }

    return {
        cod: (data.cod) ? data.cod : null,
        id: (data.city.id) ? data.city.id : null,
        name: (data.city.name) ? data.city.name : null,
        country: (data.city.country) ? countryConverter(data.city.country) : null,
        population: (data.city.population) ? data.city.population : null,
        lat: (data.city.coord.lat) ? data.city.coord.lat : null,
        long: (data.city.coord.lon) ? data.city.coord.lon : null,
        timezone: (data.city.timezone) ? data.city.timezone : null,
        sunrise: (data.city.sunrise) ? convertTimestamp(data.city.sunrise, languageCode, timeZoneString) : null,
        sunset: (data.city.sunset) ? convertTimestamp(data.city.sunset, languageCode, timeZoneString) : null,
        days
    }
}

export const countryConverter = (countryCode) => {
    const countryList = {
        "AF": "Afghanistan",
        "AX": "Åland Islands",
        "AL": "Albania",
        "DZ": "Algeria",
        "AS": "American Samoa",
        "AD": "Andorra",
        "AO": "Angola",
        "AI": "Anguilla",
        "AQ": "Antarctica",
        "AG": "Antigua and Barbuda",
        "AR": "Argentina",
        "AM": "Armenia",
        "AW": "Aruba",
        "AU": "Australia",
        "AT": "Austria",
        "AZ": "Azerbaijan",
        "BS": "Bahamas",
        "BH": "Bahrain",
        "BD": "Bangladesh",
        "BB": "Barbados",
        "BY": "Belarus",
        "BE": "Belgium",
        "BZ": "Belize",
        "BJ": "Benin",
        "BM": "Bermuda",
        "BT": "Bhutan",
        "BO": "Bolivia (Plurinational State of)",
        "BQ": "Bonaire, Sint Eustatius and Saba",
        "BA": "Bosnia and Herzegovina",
        "BW": "Botswana",
        "BV": "Bouvet Island",
        "BR": "Brazil",
        "IO": "British Indian Ocean Territory",
        "BN": "Brunei Darussalam",
        "BG": "Bulgaria",
        "BF": "Burkina Faso",
        "BI": "Burundi",
        "CV": "Cabo Verde",
        "KH": "Cambodia",
        "CM": "Cameroon",
        "CA": "Canada",
        "KY": "Cayman Islands",
        "CF": "Central African Republic",
        "TD": "Chad",
        "CL": "Chile",
        "CN": "China",
        "CX": "Christmas Island",
        "CC": "Cocos (Keeling) Islands",
        "CO": "Colombia",
        "KM": "Comoros",
        "CG": "Congo",
        "CD": "Congo, Democratic Republic of the",
        "CK": "Cook Islands",
        "CR": "Costa Rica",
        "CI": "Côte d'Ivoire",
        "HR": "Croatia",
        "CU": "Cuba",
        "CW": "Curaçao",
        "CY": "Cyprus",
        "CZ": "Czechia",
        "DK": "Denmark",
        "DJ": "Djibouti",
        "DM": "Dominica",
        "DO": "Dominican Republic",
        "EC": "Ecuador",
        "EG": "Egypt",
        "SV": "El Salvador",
        "GQ": "Equatorial Guinea",
        "ER": "Eritrea",
        "EE": "Estonia",
        "SZ": "Eswatini",
        "ET": "Ethiopia",
        "FK": "Falkland Islands (Malvinas)",
        "FO": "Faroe Islands",
        "FJ": "Fiji",
        "FI": "Finland",
        "FR": "France",
        "GF": "French Guiana",
        "PF": "French Polynesia",
        "TF": "French Southern Territories",
        "GA": "Gabon",
        "GM": "Gambia",
        "GE": "Georgia",
        "DE": "Germany",
        "GH": "Ghana",
        "GI": "Gibraltar",
        "GR": "Greece",
        "GL": "Greenland",
        "GD": "Grenada",
        "GP": "Guadeloupe",
        "GU": "Guam",
        "GT": "Guatemala",
        "GG": "Guernsey",
        "GN": "Guinea",
        "GW": "Guinea-Bissau",
        "GY": "Guyana",
        "HT": "Haiti",
        "HM": "Heard Island and McDonald Islands",
        "VA": "Holy See",
        "HN": "Honduras",
        "HK": "Hong Kong",
        "HU": "Hungary",
        "IS": "Iceland",
        "IN": "India",
        "ID": "Indonesia",
        "IR": "Iran (Islamic Republic of)",
        "IQ": "Iraq",
        "IE": "Ireland",
        "IM": "Isle of Man",
        "IL": "Israel",
        "IT": "Italy",
        "JM": "Jamaica",
        "JP": "Japan",
        "JE": "Jersey",
        "JO": "Jordan",
        "KZ": "Kazakhstan",
        "KE": "Kenya",
        "KI": "Kiribati",
        "KP": "Korea (Democratic People's Republic of)",
        "KR": "Korea, Republic of",
        "KW": "Kuwait",
        "KG": "Kyrgyzstan",
        "LA": "Lao People's Democratic Republic",
        "LV": "Latvia",
        "LB": "Lebanon",
        "LS": "Lesotho",
        "LR": "Liberia",
        "LY": "Libya",
        "LI": "Liechtenstein",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "MO": "Macao",
        "MG": "Madagascar",
        "MW": "Malawi",
        "MY": "Malaysia",
        "MV": "Maldives",
        "ML": "Mali",
        "MT": "Malta",
        "MH": "Marshall Islands",
        "MQ": "Martinique",
        "MR": "Mauritania",
        "MU": "Mauritius",
        "YT": "Mayotte",
        "MX": "Mexico",
        "FM": "Micronesia (Federated States of)",
        "MD": "Moldova, Republic of",
        "MC": "Monaco",
        "MN": "Mongolia",
        "ME": "Montenegro",
        "MS": "Montserrat",
        "MA": "Morocco",
        "MZ": "Mozambique",
        "MM": "Myanmar",
        "NA": "Namibia",
        "NR": "Nauru",
        "NP": "Nepal",
        "NL": "Netherlands",
        "NC": "New Caledonia",
        "NZ": "New Zealand",
        "NI": "Nicaragua",
        "NE": "Niger",
        "NG": "Nigeria",
        "NU": "Niue",
        "NF": "Norfolk Island",
        "MK": "North Macedonia",
        "MP": "Northern Mariana Islands",
        "NO": "Norway",
        "OM": "Oman",
        "PK": "Pakistan",
        "PW": "Palau",
        "PS": "Palestine, State of",
        "PA": "Panama",
        "PG": "Papua New Guinea",
        "PY": "Paraguay",
        "PE": "Peru",
        "PH": "Philippines",
        "PN": "Pitcairn",
        "PL": "Poland",
        "PT": "Portugal",
        "PR": "Puerto Rico",
        "QA": "Qatar",
        "RE": "Réunion",
        "RO": "Romania",
        "RU": "Russian Federation",
        "RW": "Rwanda",
        "BL": "Saint Barthélemy",
        "SH": "Saint Helena, Ascension and Tristan da Cunha",
        "KN": "Saint Kitts and Nevis",
        "LC": "Saint Lucia",
        "MF": "Saint Martin (French part)",
        "PM": "Saint Pierre and Miquelon",
        "VC": "Saint Vincent and the Grenadines",
        "WS": "Samoa",
        "SM": "San Marino",
        "ST": "Sao Tome and Principe",
        "SA": "Saudi Arabia",
        "SN": "Senegal",
        "RS": "Serbia",
        "SC": "Seychelles",
        "SL": "Sierra Leone",
        "SG": "Singapore",
        "SX": "Sint Maarten (Dutch part)",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SB": "Solomon Islands",
        "SO": "Somalia",
        "ZA": "South Africa",
        "GS": "South Georgia and the South Sandwich Islands",
        "SS": "South Sudan",
        "ES": "Spain",
        "LK": "Sri Lanka",
        "SD": "Sudan",
        "SR": "Suriname",
        "SJ": "Svalbard and Jan Mayen",
        "SE": "Sweden",
        "CH": "Switzerland",
        "SY": "Syrian Arab Republic",
        "TW": "Taiwan, Province of China",
        "TJ": "Tajikistan",
        "TZ": "Tanzania, United Republic of",
        "TH": "Thailand",
        "TL": "Timor-Leste",
        "TG": "Togo",
        "TK": "Tokelau",
        "TO": "Tonga",
        "TT": "Trinidad and Tobago",
        "TN": "Tunisia",
        "TR": "Turkey",
        "TM": "Turkmenistan",
        "TC": "Turks and Caicos Islands",
        "TV": "Tuvalu",
        "UG": "Uganda",
        "UA": "Ukraine",
        "AE": "United Arab Emirates",
        "GB": "United Kingdom of Great Britain and Northern Ireland",
        "US": "United States of America",
        "UM": "United States Minor Outlying Islands",
        "UY": "Uruguay",
        "UZ": "Uzbekistan",
        "VU": "Vanuatu",
        "VE": "Venezuela (Bolivarian Republic of)",
        "VN": "Viet Nam",
        "VG": "Virgin Islands (British)",
        "VI": "Virgin Islands (U.S.)",
        "WF": "Wallis and Futuna",
        "EH": "Western Sahara",
        "YE": "Yemen",
        "ZM": "Zambia",
        "ZW": "Zimbabwe"
    }
    return countryList[countryCode]
}