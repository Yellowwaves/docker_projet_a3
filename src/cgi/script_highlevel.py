#!/usr/bin/python3.11

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import svm
import warnings
warnings.filterwarnings("ignore")
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
import json
import cgi
import cgitb
import joblib
def classification_accident(informations_accident, methode, modeles):
    # Utilisation de la méthode de classification spécifiée avec les modèles entraînés
    if methode == "svm":
        clf = modeles["svm"]
        gravite_accident = clf.predict(informations_accident)
    elif methode == "rf":
        rf = modeles["random_forest"]
        gravite_accident = rf.predict(informations_accident)
    elif methode == "mlp":
        mlp = modeles["mlp"]
        gravite_accident = mlp.predict(informations_accident)
    else:
        return {"error": "Méthode de classification non valide."}
    
    # Construction du résultat au format JSON
    resultat = {
        "gravite": gravite_accident.item()
    }
    
    return resultat

modeles = joblib.load('/var/www/html/cgi/modeles.pkl')

# Activation du débogage CGI
cgitb.enable()

# Lecture des paramètres de la requête CGI
form = cgi.FieldStorage()

# Récupération des paramètres de l'accident
descr_lum = int(form.getvalue('descr_lum'))
descr_type_col = int(form.getvalue('descr_type_col'))
descr_cat_veh = int(form.getvalue('descr_cat_veh'))
latitude_accident = float(form.getvalue('latitude'))
longitude_accident = float(form.getvalue('longitude'))
descr_athmo = int(form.getvalue('descr_athmo'))
descr_etat_surf = int(form.getvalue('descr_etat_surf'))
descr_dispo_secu = int(form.getvalue('descr_dispo_secu'))
age = int(form.getvalue('age'))
methode = form.getvalue('methode')

# Informations sur l'accident
informations_accident = [[descr_lum, descr_type_col, longitude_accident, latitude_accident, age, descr_athmo, descr_etat_surf, descr_dispo_secu]]

# Méthode de classification à utiliser (à remplacer par la vraie méthode)
# Exemple de valeur : "svm", "rf", "mlp"

# Classification de l'accident
resultat = classification_accident(informations_accident, methode, modeles)

# Conversion du résultat en JSON
resultat_json = json.dumps(resultat)

# Envoi de la réponse JSON
print(resultat_json)
