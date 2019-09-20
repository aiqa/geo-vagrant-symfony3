#!/bin/bash

# cc === cache clear

if [ `whoami` == "vagrant" ]; then
    echo "VAGRANT: GUEST"
    sudo chmod -R 777 /app-var
    sudo rm -rf /app-var/cache/*
    sudo rm -rf /app-var/logs/*

    cd /app/backend-php
    /usr/bin/php bin/console cache:clear --env=prod
    /usr/bin/php bin/console cache:warmup --env=prod
else
    echo "VAGRANT: HOST --> GUEST"
    vagrant ssh -c '/app/backend-php/cc.sh'
fi
