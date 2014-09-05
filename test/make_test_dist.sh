#!/bin/sh

cp  bin/montgomery.js \
    bower_components/jquery/dist/jquery.min.js \
    bower_components/underscore/underscore.js \
    bower_components/moment/moment.js \
    bower_components/qunit/qunit/qunit.js \
    bower_components/qunit/qunit/qunit.css \
    test/bin/montgomery-test.js \
    test/index.html \
    test/dist
