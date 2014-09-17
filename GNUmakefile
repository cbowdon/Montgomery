.PHONY:

all: src/montgomery.ts src/*.ts
	tsc $^ --noImplicitAny --out build/montgomery.js --sourceMap
	rm -f *.js

deps:
	tsd reinstall

test: all test/*.ts
	tsc src/montgomery.ts --outDir test/build --sourceMap
	tsc test/*.ts --noImplicitAny --out test/build/montgomery-test.js --sourceMap
	rm -f test/*.js

dist: all test
	./make_dist.sh
	test/make_test_dist.sh

clean:
	rm -rf build/*.js
	rm -rf test/build/*.js
	rm -rf dist/*
	rm -rf test/dist/*
