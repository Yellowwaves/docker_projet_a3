# Projet de Troisième Année - Site Web sur l'Accidentologie

## Description
Dans le cadre de notre projet de troisième année à l'ISEN Yncréa Ouest, nous avons réalisé un site web sur l'accidentologie en France pour l'année 2009. Ce projet combine des techniques de big data et d'intelligence artificielle pour visualiser les accidents et prédire les clusters auxquels ils appartiennent.

## Fonctionnalités

### Ajout d'Accidents
Permet d'ajouter de nouveaux accidents à la base de données.

### Clustering et Prédiction
Permet de prédire le cluster et la gravité d'un accident à partir des données disponibles.

### Visualisation sur Carte
Permet de filtrer et visualiser les accidents sur une carte interactive.

## Technologies Utilisées
- Big Data : Utilisation de techniques avancées pour la gestion et l'analyse des données massives d'accidentologie.
- Intelligence Artificielle : Implémentation de modèles pour la prédiction de clusters et de la gravité des accidents.
- Technologies Web : Développement d'une interface utilisateur interactive pour la visualisation des données.

## Prérequis et Installation
Pour exécuter le projet localement, assurez-vous d'avoir les prérequis suivants installés :
- Environnement Docker pour la gestion des conteneurs.

Clonez le projet depuis le repository Git et suivez les instructions du fichier `README.md` pour démarrer l'environnement.

## Utilisation
1. **Clonage du Répertoire**
  ```bash
  git clone https://github.com/Yellowwaves/docker_projet_a3.git
  cd docker_projet_a3
  ```
2. **Build avec docker compose et initialisation BDD**
  ```bash
  docker-compose up --build
  ```
2. **Accéder au pages web**
Une fois que les conteneurs sont en cours d'exécution, vous pouvez accéder aux services via les URL suivantes :
- Application Web : http://localhost
- phpMyAdmin : http://localhost:8080
Utilisez `root` comme nom d'utilisateur et le mot de passe spécifié dans votre `docker-compose.yml` pour vous connecter à MySQL via phpMyAdmin.
3. **Arrêter le programme**
Pour arrêter les services et supprimer les conteneurs, réseaux, volumes et images créés par docker-compose up, utilisez la commande suivante :
```bash
docker-compose down
```

## Structure du Projet
- `docker-compose.yml` : Fichier de configuration principal pour Docker Compose définissant les services (Apache, PHP, MySQL, phpMyAdmin).
- `mysql-init/` : Dossier pour les scripts SQL d'initialisation de MySQL au démarrage.
- `src/` : Dossier pour les fichiers de votre application web, monté dans le conteneur Apache.
- `cgi-bin/` : Dossier pour les scripts CGI, monté dans le conteneur Apache.

## Infos supplémentaires
Assurez-vous de personnaliser les configurations (`MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, etc.) dans `docker-compose.yml` selon vos besoins spécifiques.
Pour toute question ou problème, référez-vous à la documentation de Docker et Docker Compose, ou consultez les logs des conteneurs avec `docker-compose logs`.
