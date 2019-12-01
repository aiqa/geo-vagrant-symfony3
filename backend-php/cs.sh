#!/bin/bash

# cs === coding standards

rm -rf .php_cs.cache
/app-var/vendor/bin/php-cs-fixer -vv fix
