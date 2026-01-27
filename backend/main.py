from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import sys
import os
import pandas as pd
import uuid
from datetime import datetime
from pydantic import BaseModel, Field, validator

from encoding_maps import encode_application
app = FastAPI(title="Credit Scoring API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
pipeline = joblib.load("./RandomForest_model.pkl")
class CreditApplication(BaseModel):

    checking_status: str
    duration: int = Field(..., gt=0, le=120, description="Duration must be between 1 and 120 months")
    credit_amount: float = Field(..., gt=0, le=100000, description="Credit amount must be positive and realistic")
    age: int = Field(..., gt=18, le=100, description="Age must be valid adult age")
    credit_history: str
    purpose: str
    # Labels métier, pas de codes numériques !
    checking_status: str
    duration: int
    credit_history: str
    purpose: str
    credit_amount: float
    savings: str
    employment: str
    installment_rate: int
    personal_status: str
    other_debtors: str
    residence_since: int
    property: str
    age: int
    other_installment: str
    housing: str
    existing_credits: int
    job: str
    people_liable: int
    telephone: str
    foreign_worker: str

    @validator('duration')
    def check_duration_logic(cls, v):
        if v < 4:
            raise ValueError('Duration too short (min 4 months)')
        return v

@app.post("/predict")
async def predict(application: CreditApplication):
    request_id = str(uuid.uuid4())
    timestamp = datetime.now().isoformat()
    try:
        print(f"[{timestamp}] Request {request_id}: Received application")
        
        # Encoder l'application avec le mapping centralisé
        app_dict = application.dict()
        encoded_app = encode_application(app_dict)
        
        print(f"[{timestamp}] Request {request_id}: Encoded application: {encoded_app}")
        
        data = {
            'Checking_Status': [encoded_app['checking_status']],
            'Duration': [float(encoded_app['duration'])],
            'Credit_History': [encoded_app['credit_history']],
            'Purpose': [encoded_app['purpose']],
            'Credit_Amount': [float(encoded_app['credit_amount'])],
            'Savings': [encoded_app['savings']],
            'Employment': [encoded_app['employment']],
            'Installment_Rate': [float(encoded_app['installment_rate'])],
            'Personal_Status': [encoded_app['personal_status']],
            'Other_Debtors': [encoded_app['other_debtors']],
            'Residence_Since': [float(encoded_app['residence_since'])],
            'Property': [encoded_app['property']],
            'Age': [float(encoded_app['age'])],
            'Other_Installment': [encoded_app['other_installment']],
            'Housing': [encoded_app['housing']],
            'Existing_Credits': [float(encoded_app['existing_credits'])],
            'Job': [encoded_app['job']],
            'People_Liable': [float(encoded_app['people_liable'])],
            'Telephone': [encoded_app['telephone']],
            'Foreign_Worker': [encoded_app['foreign_worker']]
        } 
        df = pd.DataFrame(data)
        print(f"[{timestamp}] Request {request_id}: Created DataFrame: {df}")
        # Utiliser le PIPELINE COMPLET (obligatoire !)
        prediction = pipeline.predict(df)[0]
        probability = pipeline.predict_proba(df)[0]
        print(f"[{timestamp}] Request {request_id}: Prediction: {prediction}, Probability: {probability}")
        
        bad_prob = probability[1]
        # Score entre 300 et 850
        score = int(850 - (bad_prob * 550))
        result = {
            'request_id': request_id,
            'timestamp': timestamp,
            'prediction': int(prediction),
            'probability_bad': float(bad_prob),
            'score': score,
            'risk_level': 'Good' if prediction == 0 else 'Bad'
        }
        print(f"[{timestamp}] Request {request_id}: Result: {result}")
        return result
    except Exception as e:
        print(f"[{timestamp}] Request {request_id}: Error occurred: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail={
            'request_id': request_id,
            'timestamp': timestamp,
            'error': str(e)
        })
@app.get("/model-info")
async def model_info():
    return {
        'model_type': 'Random Forest',
        'score_method': 'Linear transformation of P(Bad) to [300, 850]',
        'training_dataset': 'German Credit Dataset (UCI)',
        'validation_strategy': 'Train-test split (70-30)',
        'recall_bad': 0.82,
        'bias_awareness': 'Monitored for protected attributes',
        'governance': 'Model versioning and audit trail enabled'
    }
@app.post("/explain")
async def explain(application: CreditApplication):
    """
    Endpoint d'explicabilité 
    """
    request_id = str(uuid.uuid4())
    try:
        # Encoder l'application
        app_dict = application.dict()
        encoded_app = encode_application(app_dict)
        # Facteurs de risque basés sur les règles métier
        risk_factors = []
        # Analyse des facteurs de risque
        if encoded_app['credit_amount'] > 10000:
            risk_factors.append("High credit amount")
        
        if encoded_app['duration'] > 36:
            risk_factors.append("Long repayment duration")
            
        if encoded_app['credit_history'] in [3, 4]:  
            risk_factors.append("Poor credit history")
            
        if encoded_app['employment'] in [0, 1]:  
            risk_factors.append("Short employment duration")
            
        if encoded_app['savings'] in [0, 1]:  
            risk_factors.append("Low savings")
            
        if encoded_app['age'] < 25:
            risk_factors.append("Young applicant")
        
        # Limiter à 3 facteurs principaux
        top_risk_factors = risk_factors[:3] if risk_factors else ["No major risk factors identified"]
        return {
            'request_id': request_id,
            'top_risk_factors': top_risk_factors,
            'risk_level': 'High' if len(risk_factors) >= 3 else 'Medium' if len(risk_factors) >= 1 else 'Low',
            'explanation_method': 'Rule-based risk factor analysis'
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail={
            'request_id': request_id,
            'error': str(e)
        })
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)