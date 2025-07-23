import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connect Successfully");
    } catch (error) {
        console.error("Database Error!!", error);
        process.exit(1);
    }
}

// export default connectDb;