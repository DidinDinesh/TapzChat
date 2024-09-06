import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONG0_DB_URL);
        console.log("connected to mongoDB");
    } catch (error) {
        console.log("error connecting to mongoDB", error.message);
    }
};

export default connectMongoDB;