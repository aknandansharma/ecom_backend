import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// dotenv
dotenv.configDotenv();

// middleware config
app.use(express.json());

// MongoDB Connection
connectDB();

//express config.
const app = express();



// All Routes;


// Port and listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    try {
        console.log(`PORT running on the ${PORT}`);
    } catch (error) {
        console.log(`PORT is NOT running ${error}`);
    }
})

