#!/bin/bash

cd /app/backend-php

php bin/console fixture:load:city
php bin/console fixture:load:mountain
php bin/console fixture:load:river
