.PHONY:

# s/tsc11/tsc/g when tsc 1.1 compiler finally released

all: montgomery.ts *.ts
	tsc11 $^ --noImplicitAny
	mv *.js dist/

test: all test/*.ts
	tsc11 test/*.ts --noImplicitAny
	mv *.js dist
	mv test/*.js test/dist/

clean:
	rm *.js
	rm test/*.js
