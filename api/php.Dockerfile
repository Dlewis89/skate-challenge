FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql

RUN docker-php-ext-install \
    zip \
    pdo \
    pdo_pgsql \
    pgsql

RUN pecl install --force redis\
&& rm -rf /tmp/pear \
&& docker-php-ext-enable redis pdo pdo_pgsql pgsql

COPY --from=composer /usr/bin/composer /usr/bin/composer
