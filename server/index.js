import connectDB from "./lib/mongoose.js";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import productsRoute from "./routes/products.route.js";
import path from 'path'

import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json({ limit: "10mb" }));
const allowedOrigins = [
  "http://localhost:3000",
  "https://products-store-i7y8.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/", productsRoute);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, './../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './../client/build/index.html'))
  );
}


connectDB().then(() => {
  const PORT = 5185;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
  });
})
  .catch(() => {
    console.log("Failed to start the server");
  });
