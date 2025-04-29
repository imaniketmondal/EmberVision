## 🔥 EmberVision – Fire Detection Backend

### 📌 What is it?

**EmberVision** is a backend API built using **Node.js**, **Express.js**, and **TensorFlow.js**. Its main purpose is to detect potential fire zones in satellite images based on geographic coordinates (latitude and longitude) and zoom level.

It uses a trained machine learning model to classify satellite images into two categories:
- **Fire**
- **No Fire**

---

### 🧠 How Does It Work?

1. **User Sends Request**  
   The user makes a GET request to the API endpoint with:
   - Latitude
   - Longitude
   - Zoom level

   Example:  
   `GET /api/13.2989/14.4989/19`

2. **Image Retrieval**  
   The backend uses **Leaflet-based satellite tile layers** to fetch the image for the specified location.

3. **Model Prediction**  
   The satellite image is passed into a **TensorFlow.js model** (hosted locally in the backend) which returns prediction probabilities for:
   - Class 0: Fire
   - Class 1: No Fire

4. **Response Sent**  
   The API sends back a JSON response showing the confidence scores for both fire and no-fire.

---

### 🧰 Tech Stack

| Component     | Tool / Library         |
|---------------|------------------------|
| Backend       | Node.js + Express.js   |
| ML Framework  | TensorFlow.js          |
| Image Tiles   | Leaflet                |
| Deployment    | Local (for now)        |

---

### 🚀 Why is it Useful?

- Helps in **early fire detection** using satellite data.
- Can be integrated into larger **forest monitoring** or **disaster management** systems.
- Simple REST API makes it easy to integrate with any frontend or mobile application.

---

# Fire Detection Backend  
**Using Tensorflow.js Model API with Node.js and Express.js**

This project is a Node.js/Express.js application that serves as an API for a Tensorflow.js model. It allows you to make predictions using the Tensorflow.js model via HTTP requests. This `README.md` file will guide you through setting up and using the API.

---

## Getting Started

Follow these steps to set up and run the project:

### Clone the Repository:

```bash
git clone https://github.com/imaniketmondal/EmberVision
cd EmberVision
```

### Install the Dependencies:

```bash
npm install
```

### Start the Server:

```bash
npm start
```

The server will start running at [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

The following endpoints are available for making predictions:

### `GET /api/:latitude/:longitude/:zoom`

Send a GET request with input data of a satellite `latitude`, `longitude`, and `zoom` factor to fetch the satellite image using **Leaflet-based tile layers** and get predictions from the Tensorflow.js model.

**Example Request:**

```bash
curl -X GET http://localhost:5000/api/13.2989/14.4989/19
```

**Example Response:**

```json
{
  "data": {
    "0": 0.395423823595047,
    "1": 0.704576206207275
  }
}
```

Where:
- `"0"` represents the class **fire**
- `"1"` represents the class **no fire**

---

## Model Loading

Make sure to place your Tensorflow.js model files in the `./jsmodel.tfjs` directory.

---

## CORS Headers

If you are hosting the frontend and backend on different servers, ensure that appropriate **CORS headers** are added to the backend for cross-origin requests.

---

## Live Demo

**Note:** This application **has not been deployed to any live server** yet. You can run it locally using the instructions above.

---

## Credits

Made in collaboration with:  
- [Prashant884-hub](https://github.com/Prashant884-hub)  
- PreethamSub  

We welcome contributions and suggestions! Feel free to open issues or submit pull requests.


