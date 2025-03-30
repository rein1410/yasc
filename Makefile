APP ?= gateway

build:
	docker build -t yasc-${APP} --build-arg APP=${APP} . 

deploy:
	docker stack deploy -c docker-compose.production.yml yasc