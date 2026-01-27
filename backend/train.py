
import joblib
import numpy as np
import os
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from pipeline import build_pipeline

def train_model(X_train, y_train, model_type):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
    except NameError:
        # __file__ is not defined when running in notebook
        current_dir = os.getcwd()
        # If running from notebooks directory, go up one level
        if current_dir.endswith('notebooks'):
            current_dir = os.path.dirname(current_dir)

    artifacts_dir = os.path.join(current_dir, "artifacts")
    
    # Ensure artifacts directory exists
    os.makedirs(artifacts_dir, exist_ok=True)
    if model_type == "RandomForest":
        model = RandomForestClassifier(
            n_estimators=100,
            random_state=42
        )
        filename = os.path.join(artifacts_dir, "RandomForest_model.pkl")
    elif model_type == "xgb":
        ratio = float((y_train == 0).sum()) / (y_train == 1).sum()
        model = XGBClassifier(
            n_estimators=100,
            learning_rate=0.1,
            scale_pos_weight=ratio,
            random_state=42,
            eval_metric="logloss"
        )
        filename = os.path.join(artifacts_dir, "xgb_model.pkl")
    else:
        raise ValueError("Model type not supported")
    pipeline = build_pipeline(model)
    pipeline.fit(X_train, y_train)
    joblib.dump(pipeline, filename)
    return pipeline


