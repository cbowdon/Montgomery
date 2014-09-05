#!/bin/sh

cp  bin/montgomery.js \
    bower_components/jquery/dist/jquery.min.js \
    bower_components/underscore/underscore.js \
    bower_components/moment/moment.js \
    bower_components/qunit/qunit/qunit.js \
    bower_components/qunit/qunit/qunit.css \
    bower_components/blanket/dist/qunit/blanket.js \
    test/bin/montgomery-test.js \
    test/index.html \
    test/dist
