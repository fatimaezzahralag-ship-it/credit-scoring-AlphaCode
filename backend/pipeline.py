
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import  OrdinalEncoder
class LabelEncoderTransformer(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.encoders = {}

    def fit(self, X, y=None):
        X = X.copy()
        for col in X.columns:
            oe = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
            oe.fit(X[[col]])
            self.encoders[col] = oe
        return self
    def transform(self, X):
        X = X.copy()
        for col, oe in self.encoders.items():
            X[col] = oe.transform(X[[col]]).flatten()
        return X
def build_pipeline(model):
    pipeline = Pipeline(steps=[
        ("label_encoding", LabelEncoderTransformer()),
        ("model", model)
    ])
    return pipeline