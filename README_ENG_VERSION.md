# Third Year Project - Road Accident Web Site
## Description
As part of our third-year project at ISEN Yncréa Ouest, we developed a website focusing on road accidents in France for the year 2009. This project integrates big data techniques and artificial intelligence to visualize accidents and predict the clusters to which they belong.

## Features
### Accident Addition
Allows adding new accidents to the database.

### Clustering and Prediction
Enables predicting the cluster and severity of an accident based on available data.

### Map Visualization
Facilitates filtering and visualizing accidents on an interactive map.

## Technologies Used
- Big Data: Utilization of advanced techniques for managing and analyzing massive accident data.
- Artificial Intelligence: Implementation of models for predicting accident clusters and severity.
- Web Technologies: Development of an interactive user interface for data visualization.
## Prerequisites and Installation
To run the project locally, ensure you have the following prerequisites installed:
- Docker environment for managing containers.
You can download Docker and Docker-compose from this link https://docs.docker.com/desktop/install/windows-install/
Clone the project from the Git repository and follow the instructions in the README.md file to start the environment.

## Usage
1. **Clone the Repository**
```bash
git clone https://github.com/Yellowwaves/docker_projet_a3.git
cd docker_projet_a3
```
2. **Build with Docker Compose and Initialize Database**
```bash
docker-compose up --build
docker exec -i mysql bash -c 'mysql -uroot -pexample < /docker-entrypoint-initdb.d/init.sql'
```
3. **Access Web Pages**
Once the containers are running, you can access the services via the following URLs:
- Web Application: http://localhost
- phpMyAdmin: http://localhost:8080
Use root as the username and the password specified in your `docker-compose.yml` to log in to MySQL via phpMyAdmin.
4. **Stop the Program**
To stop the services and remove the containers, networks, volumes, and images created by docker-compose up, use the following command:
```bash
docker-compose down
```
## Project Structure
- docker-compose.yml: Main configuration file for Docker Compose defining services (Apache, PHP, MySQL, phpMyAdmin).
- mysql-init/: Folder for MySQL initialization SQL scripts at startup.
- src/: Folder for your web application files, mounted in the Apache container.
## Additional Information
Make sure to customize configurations (MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, etc.) in docker-compose.yml according to your specific needs.
For any questions or issues, refer to Docker and Docker Compose documentation, or check container logs using docker-compose logs.
