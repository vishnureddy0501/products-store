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
app.use(
  cors({
      origin: "http://localhost:3000", // Your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
      credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(cookieParser());
app.use("/", productsRoute);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './../client/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './../client/build/index.html'))
);


connectDB().then(() => {
  const PORT = 5150;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
  });
})
.catch(() => {
  console.log("Failed to start the server");
});
