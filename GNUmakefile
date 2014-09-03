.PHONY:

# s/tsc11/tsc/g when tsc 1.1 compiler finally released

all: montgomery.ts *.ts
	tsc11 $^ --noImplicitAny --out bin/montgomery.js
	rm -f *.js

deps:
	tsd reinstall

test: all test/*.ts
	tsc11 test/*.ts --noImplicitAny --out test/bin/montgomery-test.js
	rm -f test/*.js

dist: all test
	./make_dist.sh
	test/make_test_dist.sh

clean:
	rm -rf bin/*.js
	rm -rf test/bin/*.js
	rm -rf dist/*
	rm -rf test/dist/*
