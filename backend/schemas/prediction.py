from pydantic import BaseModel, Field
from typing import Union

class LoanPredictionRequest(BaseModel):
    loan_amnt: float = Field(..., description="Loan Amount in USD", example=10000.0)
    term: Union[str, int] = Field(..., description="Loan term e.g. '36 months' or 36", example="36 months")
    int_rate: float = Field(..., description="Interest Rate percentage", example=10.99)
    installment: float = Field(..., description="Monthly installment", example=327.34)
    grade: str = Field(..., description="Loan grade (A-G)", example="B")
    sub_grade: str = Field(..., description="Loan sub-grade (A1-G5)", example="B3")
    emp_length: Union[str, int] = Field(..., description="Employment length e.g. '5 years' or 5", example="5 years")
    home_ownership: str = Field(..., description="Home ownership e.g. RENT, OWN, MORTGAGE", example="RENT")
    annual_inc: float = Field(..., description="Annual Income", example=60000.0)
    verification_status: str = Field(..., description="Verification status e.g. Verified, Source Verified, Not Verified", example="Verified")
    purpose: str = Field(..., description="Loan purpose e.g. credit_card, debt_consolidation", example="credit_card")
    dti: float = Field(..., description="Debt-to-Income Ratio %", example=15.2)
    delinq_2yrs: int = Field(0, description="Delinquencies in last 2 years", example=0)
    fico_range_low: int = Field(..., description="FICO score range lower bound", example=720)
    fico_range_high: int = Field(..., description="FICO score range upper bound", example=724)
    inq_last_6mths: int = Field(0, description="Inquiries in last 6 months", example=1)
    open_acc: int = Field(..., description="Open credit lines", example=10)
    pub_rec: int = Field(0, description="Public derogatory records", example=0)
    revol_bal: float = Field(..., description="Revolving credit balance", example=10000.0)
    revol_util: float = Field(..., description="Revolving line utilization %", example=50.0)
    total_acc: int = Field(..., description="Total credit lines", example=20)

class LoanPredictionResponse(BaseModel):
    success: bool = True
    probability: float = Field(..., description="Calibrated default probability (0.0 - 1.0)")
    probability_percent: float = Field(..., description="Probability as percentage (0 - 100)")
    prediction: int = Field(..., description="0 = Fully Paid, 1 = Charged Off")
    result: str = Field(..., description="'Fully Paid' or 'Charged Off'")
    risk_level: str = Field(..., description="'Lower' or 'High'")
    threshold: float = Field(0.50, description="Decision threshold (0.50)")
