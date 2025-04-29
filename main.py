from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:8000"] for strict CORS
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class ScanRequest(BaseModel):
    lat: float
    lon: float
    zoom: int

@app.post("/predict")
async def predict_fire(data: ScanRequest):
    print(f"Received scan request: {data}")

    # Dummy response, replace with real ML logic later
    return {
        "location": {"lat": data.lat, "lon": data.lon},
        "zoom": data.zoom,
        "fire_detected": True,
        "confidence": 0.91
    }
