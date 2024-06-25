#!/usr/bin/python3.11

import warnings
warnings.filterwarnings("ignore")
import cgi
import cgitb
import json
import joblib

def predire_classe_accident(informations_accident):
    # Chargement du modèle à partir du fichier
    knn = joblib.load('/var/www/html/cgi/knn_model.pkl')

    # Prédiction de la classe de l'accident donné
    classe_predite = knn.predict(informations_accident)

    # Construction du résultat
    resultat = {
        'classe_accident': str(classe_predite[0])
    }

    # Conversion du résultat en JSON
    resultat_json = json.dumps(resultat)
    return resultat_json

# Activation du débogage CGI
cgitb.enable()

# Lecture des paramètres de la requête CGI
form = cgi.FieldStorage()

# Récupération des paramètres de l'accident
descr_lum = int(form.getvalue('descr_lum'))
descr_cat_veh = int(form.getvalue('descr_cat_veh'))
latitude_accident = float(form.getvalue('latitude'))
longitude_accident = float(form.getvalue('longitude'))
descr_athmo = int(form.getvalue('descr_athmo'))
descr_etat_surf = int(form.getvalue('descr_etat_surf'))
descr_dispo_secu = int(form.getvalue('descr_dispo_secu'))
age = int(form.getvalue('age'))

# Informations sur l'accident
informations_accident = [[descr_lum, descr_cat_veh, longitude_accident, latitude_accident, age, descr_athmo, descr_etat_surf, descr_dispo_secu]]
# Appel de la fonction KNN
resultat = predire_classe_accident(informations_accident)
# Envoi des en-têtes HTTP

# Envoi de la réponse JSON
print(resultat)
