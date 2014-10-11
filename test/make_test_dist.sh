#!/bin/sh

if [ ! -d test/dist ]; then 
    mkdir test/dist 
fi
    
cp  bower_components/jquery/dist/jquery.min.js \
    bower_components/jquery/dist/jquery.min.map \
    bower_components/underscore/underscore.js \
    bower_components/moment/moment.js \
    bower_components/qunit/qunit/qunit.js \
    bower_components/qunit/qunit/qunit.css \
    bower_components/blanket/dist/qunit/blanket.js \
    test/build/*.js \
    test/build/*.js.map \
    test/index.html \
    test/dist
