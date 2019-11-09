#!/usr/bin/env bash

version=$(git describe)
box_name=geo_

export BUILDBOX=YES
echo "Building box ${box_name}${version}.box ..."
vagrant destroy -f
./up.sh
vagrant package --output "box/${box_name}${version}.box"
vagrant destroy -f
export BUILDBOX=
