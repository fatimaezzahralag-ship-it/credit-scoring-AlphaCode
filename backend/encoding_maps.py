# Mapping centralisé STRICTEMENT synchronisé avec german.data
ENCODING_MAPS = {
    "checking_status": {
        "less_than_0_dm": "A11",      # < 0 DM
        "0_to_200_dm": "A12",         # 0 <= ... < 200 DM
        "more_than_200_dm": "A13",    # >= 200 DM
        "no_account": "A14"           # Pas de compte
    },
    "credit_history": {
        "no_credits_taken": "A30",
        "all_paid_back": "A31",
        "existing_paid_back": "A32",
        "delay_in_payment": "A33",
        "critical_account": "A34"
    },
    "purpose": {
        "car_new": "A40",
        "car_used": "A41",
        "furniture_equipment": "A42",
        "radio_tv": "A43",
        "domestic_appliances": "A44",
        "repairs": "A45",
        "education": "A46",
        "retraining": "A48",
        "business": "A49",
        "other": "A410"
    },
    "savings": {
        "0": "A61",          # < 100 DM
        "1": "A62",          # 100 - 500 DM
        "2": "A63",          # 500 - 1000 DM
        "3": "A64",          # > 1000 DM
        "4": "A65",          # Unknown/No savings
        "unknown": "A65"     # Sécurité
    },
    "employment": {
        "0": "A71",          # Unemployed
        "1": "A72",          # < 1 year
        "2": "A73",          # 1 - 4 years
        "3": "A74",          # 4 - 7 years
        "4": "A75"           # >= 7 years
    },
    "personal_status": {
        "male_divorced_separated": "A91",
        "female_divorced_separated_married": "A92",
        "male_single": "A93",
        "male_married_widowed": "A94",
        "female_single": "A95"
    },
    "other_debtors": {
        "none": "A101",
        "co_applicant": "A102",
        "guarantor": "A103"
    },
    "property": {
        "real_estate": "A121",
        "building_society_savings": "A122",
        "car_or_other": "A123",
        "unknown_none": "A124"
    },
    "other_installment": {
        "bank": "A141",
        "stores": "A142",
        "none": "A143"
    },
    "housing": {
        "rent": "A151",
        "own": "A152",
        "for_free": "A153"
    },
    "job": {
        "unemployed_unskilled_non_resident": "A171",
        "unskilled_resident": "A172",
        "skilled_employee": "A173",
        "management_self_employed_highly_qualified": "A174"
    },
    "telephone": {
        "none": "A191",
        "yes_registered": "A192"
    },
    "foreign_worker": {
        "yes": "A201",
        "no": "A202"
    }
}
def encode_application(application_dict):
    encoded = {}
    for field, value in application_dict.items():
        if field in ENCODING_MAPS:
            # Conversion en string pour gérer les cas où React envoie le chiffre 0 (int)
            # et le dictionnaire attend "0" (str)
            val_str = str(value).lower()
            # On cherche dans le dictionnaire
            if val_str in ENCODING_MAPS[field]:
                encoded[field] = ENCODING_MAPS[field][val_str]
            else:
                print(f"WARNING: Valeur '{val_str}' inconnue pour '{field}'. Utilisation valeur par défaut.")
                encoded[field] = list(ENCODING_MAPS[field].values())[-1] 
        else:
            encoded[field] = value
    return encoded