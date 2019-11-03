#!/bin/bash

if [[ `whoami` != "vagrant" && `whoami` != "root" ]] ; then
    echo "YOU CANNOT RUN THIS COMMAND FROM HOST OS"
    echo "Run 'vagrant ssh' and then './reload.sh'"
    exit
fi

BASEDIR=/app/behat

COMPOSER_CACHE_DIR=/composer_cache

export COMPOSER_CACHE_DIR

cd "${BASEDIR}"
/usr/local/bin/composer install
