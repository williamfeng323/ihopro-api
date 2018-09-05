env?=qa
pod?=''
application=ihopro-api
# ifeq ($(env), production)
# else
# endif
image_name=ihopro-api
APP_DIR=/webapp/current

build:
	BUILD_ENV=$(env) \
	IMAGE_NAME=$(image_name) \
	sh ./scripts/build.sh

start:
	BUILD_ENV=$(env) \
	docker run \
		-p 80:8080 \
		-p 5858:5859 \
		-it $(image_name)
	# application=$(application) \
	# sh ./scripts/start.sh

.PHONY: build
