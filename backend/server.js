import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import blogs from "./routes/blog.route.js";


env.config();
const app = express();

const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://weeklydigest-blog.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogs);

// app.use(express.static(path.join(__dirname, "/weeklyDigest/dist")));

// app.get(/^\/(?!api).*/, (req, res) => {
//   if (req.accepts('html')) {
//     res.sendFile(path.join(__dirname, '../weeklyDigest/dist/index.html'));
//   } else {
//     res.status(404).json({ error: 'Not found' });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
