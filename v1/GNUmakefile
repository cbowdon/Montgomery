.PHONY:

all: src/montgomery.ts src/*.ts
	ctags -R src/
	tsc $^ --noImplicitAny --out build/montgomery.js --sourceMap
	rm -f *.js

deps:
	npm install -g typescript
	npm install -g tsd
	npm install -g bower
	tsd reinstall --save
	bower install

test: all test/*.ts
	tsc src/montgomery.ts --outDir test/build --sourceMap
	tsc test/*.ts --noImplicitAny --out test/build/montgomery-test.js --sourceMap
	rm -f test/*.js

dist: all test
	./make_dist.sh
	test/make_test_dist.sh

clean:
	rm tags
	rm -rf build/*.js
	rm -rf test/build/*.js
	rm -rf dist/*
	rm -rf test/dist/*
