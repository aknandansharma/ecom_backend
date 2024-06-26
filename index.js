import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import connectDB from './config/db.js';

// dotenv
dotenv.configDotenv();

//express config.
const app = express();

// middleware config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
connectDB();

// All Routes importing
import userRoute from "./routes/userRoutes.js"
import productRoute from "./routes/productRoute.js"

// All route configure.
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);





// Port and listening
const PORT = 8080;
app.listen(PORT, () => {
    try {
        console.log(`PORT running on the ${PORT}`.bgYellow.white);
    } catch (error) {
        console.log(`PORT is NOT running ${error}`);
    }
})

