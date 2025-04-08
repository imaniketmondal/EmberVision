Sure! Here's the final version of your `README.md` with the hyperlink removed from **PreethamSub**, while keeping everything else intact:

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

---
