Sure! Here's a complete, well-structured `README.md` for your **EmberVision** fire detection project:

---

# 🔥 EmberVision – Real-Time Satellite Fire Detection

**EmberVision** is a full-stack application that detects fire from satellite imagery using a deep learning model trained on fire datasets. The model is hosted on a Node.js backend and deployed via a RESTful API, while the frontend enables live map scanning with fire detection results.

---

## 📍 Live Demo

- 🔗 **Frontend:** [EmberVision Live Map](https://ganesh-dagadi.github.io/ecotech-frontend/)
- 🔗 **Backend API:** [Railway API Endpoint](https://firedet-production.up.railway.app/api/13.2989/14.4989/19)

> Note: The backend is hosted on [Railway](https://railway.app/)'s free tier. It might take a few seconds to respond when idle.

---

## 🧠 How It Works

1. User moves and zooms into an area on the map.
2. Coordinates and zoom level are extracted.
3. A satellite image is fetched from Bing Maps API.
4. The image is passed to a **TensorFlow.js** model deployed on a **Node.js/Express** server.
5. The model predicts if the area contains **fire** or **no fire**.
6. Result is displayed on the map with appropriate messages and markers.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript, [Leaflet.js](https://leafletjs.com/), Axios
- **Backend:** Node.js, Express.js, TensorFlow.js
- **Model:** InceptionV3 (Keras), converted to TensorFlow.js
- **Hosting:** Railway (backend), GitHub Pages (frontend)
- **APIs:** Bing Maps API for satellite imagery

---

## 🚀 Project Setup

### 📁 Clone the Repository

```bash
git clone https://github.com/PreethamSub/FireDet.git
cd FireDet
```

### 📦 Install Backend Dependencies

```bash
npm install
```

### 🔑 Set Your Bing Maps API Key

Create a `.env` file:

```
MapsAPI=YOUR_BING_MAPS_API_KEY
```

### ▶️ Run the Server

```bash
npm start
```

The API will be available at `http://localhost:5000/api/:lat/:lon/:zoom`

---

## 🌍 API Usage

### Endpoint

```http
GET /api/:latitude/:longitude/:zoom
```

### Example

```bash
curl http://localhost:5000/api/13.2989/14.4989/19
```

### Sample Response

```json
{
  "data": {
    "0": 0.834,   // fire
    "1": 0.166    // no fire
  }
}
```

---

## 🧪 Model Training

Model was trained using **InceptionV3** on two Kaggle datasets:

- 🔥 [Fire Detection Dataset](https://www.kaggle.com/datasets/christofel04/fire-detection-dataset)
- 🔥 [Fire Dataset by Phylake1337](https://www.kaggle.com/datasets/phylake1337/fire-dataset)

Training was done on Google Colab, and the Keras model was exported and converted to TensorFlow.js format:

```bash
tensorflowjs_converter --input_format=keras_saved_model \
  --output_format=tfjs_layers_model \
  BestModel.keras jsmodel.tfjs
```

---

## 💻 Frontend Map Scanner

- Built using [Leaflet.js](https://leafletjs.com/)
- Displays an interactive map
- Users can adjust the map and scan by clicking the **"Scan"** button
- Fires are marked visually and results shown in real-time

---

## 📁 Project Structure

```
FireDet/
│
├── jsmodel.tfjs/             # TensorFlow.js model files
├── server.js                 # Node.js backend server
├── public/                   # Static frontend (optional)
│
├── frontend/                 # Leaflet.js frontend (hosted separately)
│   └── index.html
│   └── firemaps.css
│
├── model_training.ipynb      # Google Colab Notebook for training
├── README.md                 # Project README
```

---

## ✅ To-Do / Future Improvements

- [ ] Add bounding box detection for fire regions
- [ ] Optimize image download and processing time
- [ ] Improve frontend UI/UX
- [ ] Add heatmap overlays
- [ ] Use real-time satellite feed (e.g. NASA FIRMS)

---

## 👨‍💻 Author

Developed by **Aniket** – 3rd Year BTech | EcoHackathon 2025  

---

Let me know if you'd like it in a downloadable format or added directly into your GitHub repo.
