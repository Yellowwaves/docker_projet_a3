#!/usr/bin/python3.11

import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
import json
import cgi
import cgitb
import joblib


def predire_clusters(accidents):
    # Chargement du modèle KMeans à partir du fichier
    kmeans = joblib.load('/var/www/html/cgi/kmeans_model.pkl')

    # Prédiction des clusters pour chaque accident
    resultats = []
    for accident in accidents:
        # ...
        acc_id = accident['acc_id']
        latitude_accident = accident['latitude']
        longitude_accident = accident['longitude']
        # Recherche du cluster correspondant à l'accident donné
        cluster_label = kmeans.predict([[latitude_accident, longitude_accident]])

        # Construction du résultat pour l'accident donné
        resultat = {
            'acc_id': int(acc_id),
            'latitude': float(latitude_accident),
            'longitude': float(longitude_accident),
            'cluster': int(cluster_label[0])
        }
        resultats.append(resultat)

    return resultats

# Lecture des paramètres de la requête CGI
cgitb.enable()
form = cgi.FieldStorage()

accidents= form["accidents"].value

# Récupération des accidents sélectionnés depuis la requête POST
accidents_data = json.loads(accidents)

# Appel de la fonction de prédiction des clusters
final = predire_clusters(accidents_data)

# Envoi de la réponse JSON
print(json.dumps(final))