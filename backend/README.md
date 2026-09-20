# LoanGuard AI — FastAPI Backend

This Python FastAPI backend serves real Machine Learning loan default risk predictions using the trained Logistic Regression model stored in `loan_default_model.pkl`.

---

## Folder Structure

```
backend/
├── app.py                   # FastAPI main entry point & CORS configuration
├── loan_default_model.pkl   # Trained Logistic Regression model & StandardScaler
├── requirements.txt         # Python dependencies
├── test_backend.py          # Automated test script for health check and prediction
├── README.md                # Documentation & startup instructions
│
├── schemas/
│   └── prediction.py        # Pydantic request & response validation schemas
│
└── services/
    └── predictor.py         # Model loading, ordinal mapping, scaling & predict_proba
```

---

## Quick Start Instructions

### 1. Create Virtual Environment (Recommended)

```bash
cd backend
python -m venv venv
```

Activate virtual environment:
- **Windows (Command Prompt / PowerShell)**:
  ```powershell
  venv\Scripts\activate
  ```
- **macOS / Linux**:
  ```bash
  source venv/bin/activate
  ```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run FastAPI Server

```bash
uvicorn app:app --reload --port 8000
```

The API will be live at:
- **Health Check**: `http://localhost:8000/api/health`
- **Prediction Endpoint**: `http://localhost:8000/api/predict`
- **Swagger Interactive API Docs**: `http://localhost:8000/docs`

---

## Running Automated Tests

To test the backend endpoints directly:

```bash
python test_backend.py
```
