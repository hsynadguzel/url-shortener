import express from "express";
import UrlController from "../controllers/url.controller.js";

// Instantiate the router
const router = express.Router();


// URL Kısaltma
router.get("/shorten", UrlController.getAllUrls);
router.get("/shorten/:shortId", UrlController.redirect);
router.post("/shorten", UrlController.shortenUrl);
router.put("/shorten/:shortId", UrlController.updateUrl);
router.delete("/shorten/:shortId", UrlController.deleteUrl);

export default router;