import UrlSchema from "../models/url.schema.js";
import { readData, writeData } from "../utils/json.file.helper.js";

class UrlController {
  // URL Shortening
  static async shortenUrl(req, res) {
    try {
      const { longUrl } = req.body;
      const shortId = Math.random().toString(36).substring(2, 8);
      const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

      // Yeni URL verisini oluştur
      const newUrl = new UrlSchema(shortId, longUrl, shortUrl, 0, new Date());

      // Veriyi JSON dosyasına ekle
      const data = readData();
      data.push(newUrl.toMap());
      writeData(data);

      return res.status(201).json({
        message: "URL shortened successfully.",
        data: newUrl,
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while shortening the URL." });
    }
  }

  // URL Redirect
  static async redirect(req, res) {
    try {
      const { shortId } = req.params;

      // URL'yi JSON dosyasından al
      const data = readData();
      const urlData = data.find((item) => item.shortId === shortId);

      if (!urlData) {
        return res.render("index", {
          title: "URL Shortener",
          message: "The URL you are looking for does not exist.",
        });
      }

      // URL tıklama sayısını artır
      urlData.clicks += 1;
      writeData(data);

      return res.redirect(urlData.longUrl);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while redirecting." });
    }
  }

  // URL Update
  static async updateUrl(req, res) {
    try {
      const { shortId } = req.params;
      const { newUrl } = req.body;

      // URL'yi JSON dosyasından al
      const data = readData();
      const urlData = data.find((item) => item.shortId === shortId);

      if (!urlData) {
        return res.status(404).json({ message: "URL not found." });
      }

      // URL'yi güncelle
      urlData.longUrl = newUrl;
      writeData(data);

      return res.status(200).json({ message: "URL updated successfully." });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while updating the URL." });
    }
  }

  // URL Delete
  static async deleteUrl(req, res) {
    try {
      const { shortId } = req.params;

      // URL'yi JSON dosyasından al
      const data = readData();
      const index = data.findIndex((item) => item.shortId === shortId);

      if (index === -1) {
        return res.status(404).json({ message: "URL not found." });
      }

      // URL'yi sil
      data.splice(index, 1);
      writeData(data);

      return res.status(200).json({ message: "URL deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while deleting the URL." });
    }
  }

  // URL List
  static async getAllUrls(req, res) {
    try {
      // URL'leri JSON dosyasından al
      const data = readData();

      return res.render("dashboard", {
        title: "Dashboard",
        urls: data
      });
    } catch (error) {
      return res.status(500).render("dashboard", {
        title: "Dashboard",
        message: "An error occurred while fetching the URLs."
      });
    }
  }
}

export default UrlController;