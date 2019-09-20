#!/bin/bash

speccy lint api.yml
npx redoc-cli bundle --title="AIQA GEO API" --output=aiqa-geo-rest-api.html api.yml
