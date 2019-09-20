#!/bin/bash

# cs === coding standards

rm -rf .php_cs.cache
vendor/bin/php-cs-fixer -vv fix
