# Utiliser l'image de base Debian
FROM debian:latest

# Installer PHP, Apache et les modules nécessaires
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    php-mysql \
    php-cli \
    php-cgi \
    php-dev \
    php-pear \
    php-mbstring \
    php-xml \
    php-json \
    php-curl \
    php-gd \
    python3 \
    python3-pip \
    libapache2-mod-fcgid \
    libapache2-mod-wsgi-py3 \
    python3-pandas \
    python3-sklearn \
    python3-joblib \
    python3-numpy \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Activer les modules Apache nécessaires
RUN a2enmod rewrite cgi fcgid wsgi

# Configurer Apache pour exécuter des scripts CGI
RUN echo "ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/" >> /etc/apache2/conf-enabled/serve-cgi-bin.conf
RUN echo "<Directory \"/usr/lib/cgi-bin\">" >> /etc/apache2/conf-enabled/serve-cgi-bin.conf
RUN echo "    AllowOverride None" >> /etc/apache2/conf-enabled/serve-cgi-bin.conf
RUN echo "    Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch" >> /etc/apache2/conf-enabled/serve-cgi-bin.conf
RUN echo "    Require all granted" >> /etc/apache2/conf-enabled/serve-cgi-bin.conf
RUN echo "</Directory>" >> /etc/apache2/conf-enabled/serve-cgi-bin.conf

# Configurer Apache pour accepter des posts plus grands
RUN echo "LimitRequestBody 104857600" >> /etc/apache2/apache2.conf

# Créer le répertoire de configuration PHP et configurer PHP pour accepter des uploads plus grands
RUN mkdir -p /usr/local/etc/php/conf.d
RUN echo "upload_max_filesize = 100M" > /usr/local/etc/php/conf.d/uploads.ini
RUN echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/uploads.ini
RUN echo "output_buffering = 4096" > /usr/local/etc/php/conf.d/output_buffering.ini

# Copier le contenu de src dans le dossier de l'application web de l'image Docker
COPY src/ /var/www/html/
COPY apache-config/000-default.conf /etc/apache2/sites-available/000-default.conf

# Définir les permissions pour les scripts CGI
RUN chmod +x /var/www/html/cgi/*.py

# Exposer le port 80 pour Apache
EXPOSE 80

# Commande pour lancer Apache en mode premier plan
CMD ["apache2ctl", "-D", "FOREGROUND"]
