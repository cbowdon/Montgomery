.PHONY:

# s/tsc11/tsc/g when tsc 1.1 compiler finally released

all: src/montgomery.ts src/*.ts
	tsc11 $^ --noImplicitAny --out build/montgomery.js
	rm -f *.js

deps:
	tsd reinstall

test: all test/*.ts
	tsc11 test/*.ts --noImplicitAny --out test/build/montgomery-test.js
	rm -f test/*.js

dist: all test
	./make_dist.sh
	test/make_test_dist.sh

clean:
	rm -rf build/*.js
	rm -rf test/build/*.js
	rm -rf dist/*
	rm -rf test/dist/*
