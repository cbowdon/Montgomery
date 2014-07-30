.PHONY:

# s/tsc11/tsc/g when tsc 1.1 compiler finally released

all: montgomery.ts *.ts
	tsc11 $^ --noImplicitAny --out dist/montgomery.js

test: all test/*.ts
	tsc11 test/*.ts --noImplicitAny --out test/dist/montgomery.js

clean:
	rm -rf dist/*.js
	rm -rf test/dist/*.js
