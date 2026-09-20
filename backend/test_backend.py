from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["model_loaded"] is True
    print("[OK] GET /api/health passed:", data)

def test_prediction():
    payload = {
        "loan_amnt": 10000,
        "term": "36 months",
        "int_rate": 10.99,
        "installment": 327.34,
        "grade": "B",
        "sub_grade": "B3",
        "emp_length": "5 years",
        "home_ownership": "RENT",
        "annual_inc": 60000,
        "verification_status": "Verified",
        "purpose": "credit_card",
        "dti": 15.2,
        "delinq_2yrs": 0,
        "fico_range_low": 720,
        "fico_range_high": 724,
        "inq_last_6mths": 1,
        "open_acc": 10,
        "pub_rec": 0,
        "revol_bal": 10000,
        "revol_util": 50,
        "total_acc": 20
    }
    
    response = client.post("/api/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    assert data["success"] is True
    assert "probability" in data
    assert "probability_percent" in data
    assert data["prediction"] in [0, 1]
    assert data["result"] in ["Fully Paid", "Charged Off"]
    assert data["threshold"] == 0.50
    print("[OK] POST /api/predict passed:", data)

if __name__ == "__main__":
    test_health()
    test_prediction()
    print("[SUCCESS] ALL BACKEND TESTS PASSED SUCCESSFULLY!")
