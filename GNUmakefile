.PHONY:

all: montgomery.ts *.ts
	tsc $^ --noImplicitAny
	mv *.js dist/

test: all test/*.ts
	tsc test/*.ts --noImplicitAny
	mv *.js dist
	mv test/*.js test/dist/

clean:
	rm *.js
	rm test/*.js
