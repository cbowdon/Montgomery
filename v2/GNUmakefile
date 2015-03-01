.PHONY:

all: src/main.ts src/*.ts
	tsc $^ --noImplicitAny --sourceMap --module commonjs --outDir bin
	browserify bin/main.js -o bin/montgomery.js
	cp src/index.html bin

tests: test/main.ts test/*.ts src/*.ts
	tsc $^ --noImplicitAny --sourceMap --module commonjs --outDir test/bin
	browserify test/bin/main.js -o test/bin/montgomery-tests.js
	cp test/index.html test/bin

ext: extensions/*.ts
	tsc $^ --noImplicitAny --sourceMap

deps:
	sudo npm install -g typescript
	sudo npm install -g tsd
	sudo npm install -g typescript-tools
	sudo npm install -g browserify
	npm install
	tsd reinstall --save

clean:
	rm -rf src/*.js
	rm -rf src/*.js.map
	rm -rf test/*.js
	rm -rf test/*.js.map
	rm -rf extensions/*.js
	rm -rf extensions/*.js.map
	rm -rf bin/*
	rm -rf test/bin/*
	rm -f npm-debug.log
