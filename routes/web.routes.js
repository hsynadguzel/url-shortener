import express from "express";
import UrlController from "../controllers/url.controller.js";

// Instantiate the router
const router = express.Router();


// Routes for the web interface
router.get("/", (req, res) => res.render("index", { title: "URL Shortener" }));
router.get("/dashboard", UrlController.getAllUrls);
router.get("/:shortId", UrlController.redirect);


export default router;