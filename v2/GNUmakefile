.PHONY:

all: src/main.ts src/*.ts
	tsc $^ --noImplicitAny --sourceMap --module commonjs
	browserify src/main.js -o bin/montgomery.js
	cp src/index.html bin

deps:
	npm install -g typescript
	npm install -g tsd
	npm install
	tsd reinstall --save
