from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS for frontend running at localhost:8000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model
class ScanRequest(BaseModel):
    lat: float
    lon: float
    zoom: int

@app.post("/predict")
async def predict_fire(data: ScanRequest):
    # Simulate prediction logic
    lat = data.lat
    lon = data.lon
    zoom = data.zoom

    # Here you can connect your model or API logic
    print(f"Scanning for fire at lat: {lat}, lon: {lon}, zoom: {zoom}")

    # Dummy response
    result = {
        "location": {"lat": lat, "lon": lon},
        "zoom": zoom,
        "fire_detected": True,  # This can be based on your model
        "confidence": 0.87
    }

    return result
