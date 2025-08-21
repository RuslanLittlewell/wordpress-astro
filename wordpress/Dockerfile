FROM wordpress:6.5-php8.3-apache
RUN a2enmod rewrite headers && \
    { echo 'ServerName localhost'; } > /etc/apache2/conf-available/servername.conf && \
    a2enconf servername
COPY .htaccess /var/www/html/.htaccess
