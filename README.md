# Credit Scoring AlphaCode (Financial Intelligence Unit)

A full-stack AI-powered credit scoring application that leverages Random Forest machine learning to predict credit risk based on the German Credit Data dataset. This production-grade system features real-time risk assessment, model explainability, and comprehensive governance tracking.


- **GitHub Repository:** https://github.com/fatimaezzahralag-ship-it/credit-scoring-AlphaCode

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - High-performance async web framework
- **Scikit-Learn** - Machine learning library
- **Pandas** - Data manipulation
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Machine Learning
- **Random Forest Classifier** - Credit risk prediction
- **OrdinalEncoder** - Robust categorical encoding
- **Pipeline Architecture** - Production-ready ML workflow

### DevOps
- **Docker** - Containerization
- **GitHub** - Version control

## 📋 Features

- **Real-time Credit Scoring** - Instant risk assessment
- **Model Explainability** - Risk factor analysis
- **Model Governance** - Performance metrics and bias monitoring
- **Request Tracing** - UUID-based audit trail
- **Responsive Design** - Mobile-first interface
- **Production Logging** - Comprehensive error tracking

## 🏗 Project Structure


## 🚀 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/fatimaezzahralag-ship-it/credit-scoring-AlphaCode.git
cd credit-scoring-AlphaCode
```

2. **Backend Setup**
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

3. **Frontend Setup**
```bash
cd frontend/credit-scoring-frontend
npm install
npm start
```

4. **Docker Development**
```bash
docker-compose up --build
```

## 📡 API Endpoints

### Predict Credit Risk
```http
POST /predict
Content-Type: application/json

{
  "checking_status": "0_to_200_dm",
  "duration": 24,
  "credit_history": "existing_paid_back",
  "purpose": "radio_tv",
  "credit_amount": 5000.0,
  "savings": "100_to_500_dm",
  "employment": "4_to_7_years",
  "installment_rate": 3,
  "personal_status": "male_single",
  "other_debtors": "none",
  "residence_since": 3,
  "property": "car_or_other",
  "age": 35,
  "other_installment": "none",
  "housing": "own",
  "existing_credits": 1,
  "job": "skilled_employee",
  "people_liable": 1,
  "telephone": "none",
  "foreign_worker": "no"
}
```

**Response:**
```json
{
  "request_id": "uuid-string",
  "timestamp": "2024-01-27T10:30:00",
  "prediction": 0,
  "probability_bad": 0.32,
  "score": 724,
  "risk_level": "Good"
}
```

### Explain Risk Factors
```http
POST /explain
Content-Type: application/json

{
  // Same request body as /predict
}
```

**Response:**
```json
{
  "request_id": "uuid-string",
  "top_risk_factors": ["High credit amount", "Long repayment duration"],
  "risk_score": 0.68,
  "explanation_method": "Rule-based risk factor analysis"
}
```

### Model Information
```http
GET /model-info
```

**Response:**
```json
{
  "model_type": "RandomForestClassifier",
  "training_dataset": "German Credit Data",
  "validation_strategy": "5-fold cross-validation",
  "recall_bad": 0.82,
  "score_method": "850 - (probability_bad * 550)",
  "bias_awareness": "Monitored for protected attributes",
  "governance": "Model versioning and audit trail enabled"
}
```

## 🎯 Model Performance

- **Accuracy:** 78%
- **Recall (Bad Credit):** 82%
- **Precision (Bad Credit):** 65%
- **F1-Score:** 72%
- **AUC-ROC:** 0.81

## 🔒 Security & Compliance

- **Input Validation** - Pydantic models ensure data integrity
- **Request Tracing** - Every request logged with UUID
- **Bias Monitoring** - Regular audits for fairness
- **Data Encryption** - HTTPS enforced in production
- **Error Handling** - Comprehensive error responses

## 📈 Monitoring & Logging

- **Request UUID Tracking** - Full audit trail
- **Performance Metrics** - Response time monitoring
- **Error Logging** - Detailed error reports
- **Model Governance** - Performance dashboards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**fatimaezzahralag-ship-it**
- GitHub: [@fatimaezzahralag-ship-it](https://github.com/fatimaezzahralag-ship-it)
- LinkedIn: [Lagdem Fatima_E](https://linkedin.com/in/lagdem-fatima-e)

## 🙏 Acknowledgments

- German Credit Data (UCI Machine Learning Repository)
- Scikit-Learn documentation
- FastAPI community
- React and Tailwind CSS teams
