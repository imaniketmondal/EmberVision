const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const twilio = require("twilio");

const app = express();
app.use(cors());

// 🔐 Replace with your actual Twilio credentials
const accountSid = "AC1f99fe71a8cd7532611f89b64ef327a5";
const authToken = "3a97696dee625907e0cdfa6f51ffacc8";
const client = twilio(accountSid, authToken);

// 🔁 Replace with your Twilio phone number and verified recipient number
const fromNumber = "+19203521150"; // Twilio number
const toNumber = "+917021362932"; // Your phone number

const fireProneCoords = [
  { lat: 21.9435, lon: 86.3300 }, // Simlipal, Odisha
  { lat: 11.6555, lon: 76.6295 }, // Bandipur, Karnataka
  { lat: 12.0600, lon: 76.0900 }, // Nagarhole, Karnataka
  { lat: 27.3286, lon: 76.4370 }, // Sariska, Rajasthan
  { lat: 11.6854, lon: 76.1310 }, // Wayanad, Kerala
  { lat: 22.4912, lon: 78.3761 }, // Satpura, Madhya Pradesh
  { lat: 23.9125, lon: 84.1092 }, // Palamau, Jharkhand
  { lat: 28.2213, lon: 95.9326 }, // Dibang Valley, Arunachal Pradesh
  { lat: 15.5017, lon: 74.6185 }, // Dandeli, Karnataka
  { lat: 10.4224, lon: 76.9651 }, // Anamalai, Tamil Nadu
  { lat: 22.3345, lon: 80.6115 }, // Kanha, Madhya Pradesh
  { lat: 21.7077, lon: 79.2936 }, // Pench, MP/Maharashtra
  { lat: 21.5700, lon: 77.3500 }, // Melghat, Maharashtra
  { lat: 26.5775, lon: 93.1711 }, // Kaziranga, Assam
];

function isFireProne(lat, lon) {
  return fireProneCoords.some(
    (coord) => Math.abs(coord.lat - lat) < 0.5 && Math.abs(coord.lon - lon) < 0.5
  );
}

app.get("/api/:lat/:lon/:zoom", async (req, res) => {
  const { lat, lon, zoom } = req.params;

  // Convert lat/lon/zoom to tile X,Y
  const long2tile = (lon, zoom) => Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  const lat2tile = (lat, zoom) =>
    Math.floor(
      ((1 -
        Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
          Math.PI) /
        2) *
        Math.pow(2, zoom)
    );

  const x = long2tile(parseFloat(lon), zoom);
  const y = lat2tile(parseFloat(lat), zoom);
  const tileUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${y}/${x}`;
  const imagePath = "./tile.jpg";

  try {
    // Download the tile (optional, still included for frontend visuals)
    const file = fs.createWriteStream(imagePath);
    await new Promise((resolve, reject) => {
      https.get(tileUrl, (response) => {
        if (response.statusCode !== 200) {
          reject("Image fetch failed with status: " + response.statusCode);
          return;
        }
        response.pipe(file);
        file.on("finish", () => file.close(resolve));
      }).on("error", (err) => {
        reject("Image fetch error: " + err.message);
      });
    });

    const highRisk = isFireProne(parseFloat(lat), parseFloat(lon));

    // 🚨 Send SMS if fire-prone area is detected
    if (highRisk) {
      const locationLink = `https://www.google.com/maps?q=${lat},${lon}`;
      const messageBody = `🔥 Forest fire detected at coordinates (${lat}, ${lon}).\nLocation: ${locationLink}`;

      await client.messages.create({
        body: messageBody,
        from: fromNumber,
        to: toNumber,
      });

      console.log("📨 Twilio SMS sent:", messageBody);
    }

    res.json({
      message: "✅ Tile downloaded successfully",
      tileUrl,
      fireDetection: highRisk ? "🔥 Forest fire detected" : "✅ No forest fire",
      highRiskLocation: highRisk,
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "🔥 Failed to fetch tile" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
