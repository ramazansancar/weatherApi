import {
    Router
} from "express";
import {
    errorMessage
} from "../functions/helpers.js";
const router = Router();

import * as weatherController from "../controllers/weather/index.js";
import * as mainController from "../controllers/main/index.js";

router.get("/", mainController.main);
router.get("/healthCheck", mainController.healthCheck);

router.get("/weather/weekly/:lat/:long", weatherController.getWeeklyWeatherListbyLatLong)
router.get("/weather/weekly/:city", weatherController.getWeeklyWeatherListbyCity)
router.get("/weather/find/:lat/:long", weatherController.getWeatherListbyLatLong)
router.get("/weather/:lat/:long", weatherController.getWeatherbyLatLong);
router.get("/weather/:city", weatherController.getWeatherbyCity);
router.get("/weather/", weatherController.getWeather);

router.get("*", (req, res) => {
    return errorMessage(res, "404 Not Found", req.params, "404 Not Found", 404)
});

export default router;
