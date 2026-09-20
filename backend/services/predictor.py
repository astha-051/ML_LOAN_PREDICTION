import os
import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from backend.schemas.prediction import LoanPredictionRequest, LoanPredictionResponse

class ModelPredictor:
    def __init__(self, model_path: str = None):
        if model_path is None:
            # Default to loan_default_model.pkl in the same folder as app/backend
            base_dir = Path(__file__).resolve().parent.parent
            model_path = os.path.join(base_dir, "loan_default_model.pkl")

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")

        # Load real trained model dict
        data = joblib.load(model_path)
        
        self.model = data["model"]
        self.scaler = data["scaler"]
        self.columns = data["columns"]
        self.threshold = float(data.get("threshold", 0.50))
        
        # 14 numerical features expected by scaler
        self.num_cols = list(self.scaler.feature_names_in_)

    def parse_term(self, term_input) -> float:
        """Parse term to binary 0.0 (36 months) or 1.0 (60 months)."""
        term_str = str(term_input).lower()
        if "60" in term_str:
            return 1.0
        return 0.0

    def parse_grade(self, grade_input: str) -> float:
        """Map grade A-G to ordinal integer 1-7."""
        g = str(grade_input).strip().upper()
        grades = {"A": 1.0, "B": 2.0, "C": 3.0, "D": 4.0, "E": 5.0, "F": 6.0, "G": 7.0}
        return grades.get(g, 2.0)

    def parse_sub_grade(self, sub_grade_input: str) -> float:
        """Map sub_grade A1-G5 to ordinal integer 1-35."""
        sg = str(sub_grade_input).strip().upper()
        if len(sg) >= 2 and sg[0] in "ABCDEFG" and sg[1:].isdigit():
            letter_idx = ord(sg[0]) - ord("A")
            num_val = int(sg[1:])
            return float(letter_idx * 5 + num_val)
        return 8.0  # default B3

    def parse_emp_length(self, emp_input) -> float:
        """Map employment length string to float number of years (0-10)."""
        s = str(emp_input).strip().lower()
        if "10+" in s:
            return 10.0
        if "< 1" in s or "n/a" in s or "none" in s:
            return 0.0
        # Extract digits
        digits = [c for c in s if c.isdigit()]
        if digits:
            return float("".join(digits))
        return 5.0

    def predict(self, req: LoanPredictionRequest) -> LoanPredictionResponse:
        req_dict = req.model_dump()

        # 1. Extract 14 numerical features for scaling
        raw_num_df = pd.DataFrame([req_dict])[self.num_cols]
        scaled_num_array = self.scaler.transform(raw_num_df)
        scaled_num_df = pd.DataFrame(scaled_num_array, columns=self.num_cols)

        # 2. Build 35-column feature row initialized to 0.0
        row = {col: 0.0 for col in self.columns}

        # Populate scaled numerical features
        for c in self.num_cols:
            row[c] = scaled_num_df[c].iloc[0]

        # Populate unscaled ordinal features
        row["term"] = self.parse_term(req_dict["term"])
        row["grade"] = self.parse_grade(req_dict["grade"])
        row["sub_grade"] = self.parse_sub_grade(req_dict["sub_grade"])
        row["emp_length"] = self.parse_emp_length(req_dict["emp_length"])

        # Populate one-hot dummy variables if matching column exists
        home_col = f"home_ownership_{str(req_dict['home_ownership']).strip()}"
        if home_col in row:
            row[home_col] = 1.0

        verif_col = f"verification_status_{str(req_dict['verification_status']).strip()}"
        if verif_col in row:
            row[verif_col] = 1.0

        purpose_col = f"purpose_{str(req_dict['purpose']).strip()}"
        if purpose_col in row:
            row[purpose_col] = 1.0

        # 3. Create DataFrame in exact trained column order
        df_final = pd.DataFrame([row])[self.columns]

        # 4. Predict probability using real model
        prob_array = self.model.predict_proba(df_final)[0]
        # Class 1 = Charged Off probability
        prob = float(prob_array[1])
        prob_percent = round(prob * 100.0, 2)

        # 5. Evaluate threshold (0.50)
        is_charged_off = prob >= self.threshold
        pred_class = 1 if is_charged_off else 0
        result_text = "Charged Off" if is_charged_off else "Fully Paid"
        risk_level_text = "High" if is_charged_off else "Lower"

        return LoanPredictionResponse(
            success=True,
            probability=round(prob, 4),
            probability_percent=prob_percent,
            prediction=pred_class,
            result=result_text,
            risk_level=risk_level_text,
            threshold=self.threshold
        )
