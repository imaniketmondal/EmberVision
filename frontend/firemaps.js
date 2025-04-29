var map;
var latitudes = 0;
var longitudes = 0;
var lastZoomLevel = 0;
var fireDetected = false;

function initMap() {
    map = L.map('myMap').setView([20.5937, 78.9629], 5); // India center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Set initial view values
    const center = map.getCenter();
    latitudes = center.lat;
    longitudes = center.lng;
    lastZoomLevel = map.getZoom();

    map.on('moveend zoomend', () => {
        const center = map.getCenter();
        latitudes = center.lat;
        longitudes = center.lng;
        lastZoomLevel = map.getZoom();
        console.log("Updated View →", latitudes, longitudes, lastZoomLevel);
    });
}

async function getscanned() {
    console.log("Scanning with:", latitudes, longitudes, lastZoomLevel);

    try {
        const response = await axios.get(`https://firedet-production.up.railway.app/api/${latitudes}/${longitudes}/${lastZoomLevel}`);
        const fireProb = response.data.data["0"];

        fireDetected = fireProb > 0.5;

        const result = document.getElementById("result");
        if (fireDetected) {
            result.innerText = "Fire Detected";
            result.style.color = "red";
        } else {
            result.innerText = "No fire detected";
            result.style.color = "green";
        }
    } catch (err) {
        console.error("API call failed:", err);
        alert("Something went wrong. Try again.");
    }
}
