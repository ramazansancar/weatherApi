# weatherApi

This is a simple weather api. It uses the [OpenWeather API](https://openweathermap.org/api)

## Example Requests

- Health Check
  - https://weatherapi.cyclic.app/healthcheck

- Weather Now by Lat/Long
  - https://weatherapi.cyclic.app/weather/30.1667/39.8333?units=metric&lang=tr

- Weather Now by City Name
  - https://weatherapi.cyclic.app/weather/Ankara?units=metric&lang=tr

- Weather Find by Lat/Long
  - https://weatherapi.cyclic.app/weather/find/30.1667/39.8333?units=metric&lang=tr&count=2 (Count max: 50)

- Weather Weekly by Lat/Long
  - https://weatherapi.cyclic.app/weather/weekly/30.1667/39.8333?units=metric&lang=tr&count=40 (Count max: 40)

- Weather Weekly by City Name
  - https://weatherapi.cyclic.app/weather/weekly/Ankara?units=metric&lang=tr&count=40 (Count max: 40)

- Weather Weekly Daily by City Name (This API is not available on free plan)
  - https://weatherapi.cyclic.app/weather/weekly/daily/Ankara?units=metric&lang=tr&count=5&api= [OpenWeatherApiKey] (Count max: 16)

## Parameters

| Parameter | Description |
| -- | -- |
| units | standart, metric, imperial |
| api | OpenWeather API Key (optional) |
| lang | Language Code |
| count | Count of days |

## Metrics

| Types |
| -- |
| standart |
| metric |
| imperial |

## Languages

| Lang Code | Language Name |
| -- | -- |
| af | Afrikaans |
| al | Albanian |
| ar | Arabic |
| az | Azerbaijani |
| bg | Bulgarian |
| ca | Catalan |
| cz | Czech |
| da | Danish |
| de | German |
| el | Greek |
| en | English |
| eu | Basque |
| fa | Persian | (Farsi) |
| fi | Finnish |
| fr | French |
| gl | Galician |
| he | Hebrew |
| hi | Hindi |
| hr | Croatian |
| hu | Hungarian |
| id | Indonesian |
| it | Italian |
| ja | Japanese |
| kr | Korean |
| la | Latvian |
| lt | Lithuanian |
| mk | Macedonian |
| no | Norwegian |
| nl | Dutch |
| pl | Polish |
| pt | Portuguese |
| pt_br | Português | Brasil |
| ro | Romanian |
| ru | Russian |
| sv, se | Swedish |
| sk | Slovak |
| sl | Slovenian |
| sp, es | Spanish |
| sr | Serbian |
| th | Thai |
| tr | Turkish |
| ua, uk | Ukrainian |
| vi | Vietnamese |
| zh_cn | Chinese | Simplified |
| zh_tw | Chinese | Traditional |
| zu | Zulu |

## Temperature Colors

```
css
.temp-0 { /* -17.8 */
  color: #9c2fae;
}

.temp-1-10 { /* -17.2 - -12.2 */
  color: #663fb4;
}

.temp-11-20 { /* -11.7 - -6.7 */
  color: #4055b2;
}

.temp-21-30 { /* -6.1 - -1.1 */
  color: #587cf7;
}

.temp-31-40 { /* -0.6 - 4.4 */
  color: #1daaf1;
}

.temp-41-50 { /* 4.9 - 10 */
  color: #1ebdd0;
}

.temp-51-60 { /* 10.6 - 15.6 */
  color: #159588;
}

.temp-61-70 { /* 16.1 - 21.1 */
  color: #2d9a2d;
}

.temp-71-80 { /* 21.7 - 26.7 */
  color: #8cc051;
}

.temp-81-90 { /* 27.2 - 32.2 */
  color: #fdc12f;
}

.temp-91-100 { /* 32.8 - 37.8 */
  color: #fd9728;
}

.temp-101 { /* 38.3 */
  color: #fb582f;
}
```
