#!/bin/sh

if [ ! -d dist ]; then 
    mkdir dist 
fi

cp -R  bower_components \
    build/montgomery.js \
    build/montgomery.js.map \
    montgomery.css \
    index.html \
    manifest.appcache \
    dist
