FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN pecl install --force redis\
&& rm -rf /tmp/pear \
&& docker-php-ext-enable redis pdo_mysql

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN groupadd --gid 1000 demetrius \
 && useradd --uid 1000 -g demetrius \
 -G www-data,root --shell /bin/bash \
 --create-home demetrius

USER demetrius
