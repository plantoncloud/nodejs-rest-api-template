.PHONY: deps
deps:
	npm install

.PHONY: build
build: deps
	mkdir -p build
	cp -R node_modules build/
	cp -R src build/
	cp package.json build/

.PHONY: run
run:
	npm start

.PHONY: build-image
build-image:
	docker build --platform linux/amd64 -t nodejs-todo-api .
