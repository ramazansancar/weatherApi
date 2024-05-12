import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouters from "./routers/index.js";

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config({
    path: ".env"
})

app.all("*", function(req, res, next) {
    res.contentType("application/json");
    res.header("X-Powered-By", "Express.js");
    next();
});

app.use("/", apiRouters)

const port = process.env.PORT || "5000";
const url = process.env.URL || "http://localhost";

app.listen(port, async () => {
    // db.sequelize.sync();
    // db.sequelize.sync({ force: true });
    console.log(`server started! Port: ${url}:${port}`)
})
