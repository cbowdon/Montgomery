.PHONY:

all: montgomery.ts *.ts
	tsc $^
	mv *.js dist/

test: all test/*.ts
	tsc test/*.ts
	mv *.js dist
	mv test/*.js test/dist/
