import express from "express";
import dotenv from "dotenv";
import path from "path";
import urlRouter from "./routes/url.routes.js";
import webRouter from "./routes/web.routes.js";

// Dotenv Config
dotenv.config();
const app = express();

// __dirname alternatifi
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// EJS Setup
app.set("view engine", "ejs");

// Routes
app.use("/", webRouter);
app.use("/web/api/v1/url", urlRouter);

// Sunucu
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));   
