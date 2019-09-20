#!/bin/bash

if [[ `whoami` != "vagrant" && `whoami` != "root" ]] ; then
    echo "YOU CANNOT RUN THIS COMMAND FROM HOST OS"
    echo "Run 'vagrant ssh' and then './reload.sh'"
    exit
fi

BASEDIR=/app/backend-php

COMPOSER_CACHE_DIR=/composer_cache

export COMPOSER_CACHE_DIR

cd "${BASEDIR}"
sudo chmod -R 0777 /app-var
sudo rm -rf /app-var/cache/*
sudo rm -rf /app-var/logs/*
/usr/local/bin/composer install
/usr/local/bin/composer install

php bin/console redis:flushdb -n

mysql -u root < /app/backend-php/db/create-empty-database.sql
php /app/backend-php/bin/console doctrine:schema:update --force

sudo chmod -R 777 /tmp

/usr/bin/php bin/console cache:warmup --env=prod

sudo chmod -R 777 /tmp
sudo chmod -R 0777 /app-var
