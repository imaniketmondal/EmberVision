const express = require("express");
const fs = require("fs");
const https = require("https");
const tf = require("@tensorflow/tfjs-node");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to model
const model_url = "file://./jsmodel.tfjs/model.json";
const mapboxToken = "YOUR_MAPBOX_TOKEN_HERE"; // ← Put your actual token here

app.get("/api/:lat/:lon/:zoom", async (req, res) => {
  try {
    const { lat, lon, zoom } = req.params;
    console.log(`Received coords: lat=${lat}, lon=${lon}, zoom=${zoom}`);

    const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lon},${lat},${zoom}/224x224?access_token=${mapboxToken}`;
    console.log("Image URL:", imageUrl);

    const imagePath = "./tile.jpeg";
    const file = fs.createWriteStream(imagePath);

    // Download the satellite image
    await new Promise((resolve, reject) => {
      https.get(imageUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error("Image fetch failed: " + response.statusCode));
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      }).on("error", (err) => {
        reject(new Error("Image fetch error: " + err.message));
      });
    });

    // Load the model
    if (!fs.existsSync("jsmodel.tfjs/model.json")) {
      throw new Error("Model file not found");
    }

    const model = await tf.loadLayersModel(model_url);
    const buf = fs.readFileSync(imagePath);
    const imageTensor = tf.node.decodeImage(buf).resizeNearestNeighbor([224, 224]).expandDims(0);

    const prediction = await model.predict(imageTensor).data();
    const fire_detected = prediction[0] > 0.5;

    console.log("Prediction result:", prediction[0]);

    res.json({ fire_detected });
  } catch (err) {
    console.error("🔥 Backend Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
//new