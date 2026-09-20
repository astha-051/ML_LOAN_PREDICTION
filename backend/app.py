from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from schemas.prediction import (
    LoanPredictionRequest,
    LoanPredictionResponse
)
from services.predictor import ModelPredictor

app = FastAPI(
    title="LoanGuard AI API",
    description="Backend API for real ML-based Loan Default Risk Prediction",
    version="1.0.0"
)

# Configure CORS for Vite React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Model Predictor
try:
    predictor = ModelPredictor()
    print("[OK] Model loaded successfully from loan_default_model.pkl")
except Exception as e:
    print(f"[ERROR] Error loading model: {e}")
    predictor = None

@app.get("/")
def root():
    return {"message": "LoanGuard AI API is running"}

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "model_loaded": predictor is not None
    }

@app.post("/api/predict", response_model=LoanPredictionResponse)
def predict_loan_default(request: LoanPredictionRequest):
    if predictor is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Machine learning model is not loaded."
        )
    
    try:
        response = predictor.predict(request)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction error: {str(e)}"
        )
