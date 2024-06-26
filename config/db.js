import mongoose from "mongoose";
import colors from "colors";

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`Connected to DB database ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error in DB ${error}`.bgRed.white)
    }
}

export default connectDB;