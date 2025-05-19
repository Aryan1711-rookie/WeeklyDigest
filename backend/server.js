import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import env from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import blogs from './routes/blog.route.js'
env.config();
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials : true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogs);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ${PORT}`);
})