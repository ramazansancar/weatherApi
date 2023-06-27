import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import apiRouters from "./routers/index.js";

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config({
    path: '.env'
})

app.all('*', function(req, res, next) {
    res.contentType('application/json');
    res.header("X-Powered-By", "Express.js");
    next();
});

app.use("/", apiRouters)

app.listen(process.env.PORT || '5000', async () => {
    // db.sequelize.sync();
    // db.sequelize.sync({ force: true });
    console.log(`server started! Port: ${process.env.URL}`)
})