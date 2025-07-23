import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDb} from "./config/database.js"
import userRoutes from "./routes/user.route.js"

dotenv.config();

const app = express();
//middilewares
app.use(express.json());
app.use(cookieParser());

//PORT
const PORT = process.env.PORT || 4000;


//Api's
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server run on ${PORT}`)
});

