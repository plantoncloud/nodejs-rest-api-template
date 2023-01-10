.PHONY: build
build:
	npm install

.PHONY: build-image
build-image:
	docker build --platform linux/amd64 -t nodejs-todo-api .

.PHONY: run
run:
	npm start
