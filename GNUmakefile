.PHONY:

all: montgomery.ts *.ts
	tsc $^
	mv *.js dist/

test: .PHONY
	tsc test/*.ts
