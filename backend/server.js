import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import env from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import blogs from './routes/blog.route.js'
import path from 'path';
import { fileURLToPath } from 'url';

env.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.static(path.join(__dirname, "../weeklyDigest/dist")));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "weeklyDigest","dist","index.html"));
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ${PORT}`);
})