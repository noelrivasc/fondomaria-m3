SHELL := /bin/bash
DRUSH := lando drush
SASS := sass
SASS_INPUT := sass
SASS_OUTPUT := assets/css
YARN := yarn
VENDOR_DIR := assets/vendor
NODE_MODULES := node_modules

PROJECT_DEPS := package.json

install: $(PROJECT_DEPS)
	$(YARN) install

include-yarn-deps:
	rm -rf $(VENDOR_DIR)
	mkdir -p $(VENDOR_DIR)
	mkdir -p $(VENDOR_DIR)/popper
	cp $(NODE_MODULES)/popper.js/dist/umd/popper.min.js $(VENDOR_DIR)/popper/
	mkdir -p $(VENDOR_DIR)/popper2
	cp $(NODE_MODULES)/@popperjs/core/dist/umd/popper.min.js $(VENDOR_DIR)/popper2/
	mkdir -p $(VENDOR_DIR)/bootstrap
	cp $(NODE_MODULES)/bootstrap/dist/js/bootstrap.min.js $(VENDOR_DIR)/bootstrap/
	mkdir -p $(VENDOR_DIR)/slick
	cp $(NODE_MODULES)/slick-carousel/slick/slick.min.js $(VENDOR_DIR)/slick/
	cp $(NODE_MODULES)/slick-carousel/slick/slick.css $(VENDOR_DIR)/slick/
	mkdir -p $(VENDOR_DIR)/fontawesome
	cp -r node_modules/@fortawesome/fontawesome-free/webfonts $(VENDOR_DIR)/fontawesome
	# cp -r node_modules/@fortawesome/fontawesome-pro/webfonts $(VENDOR_DIR)/fontawesome

prepare: install include-yarn-deps
	rm -rf $(SASS_OUTPUT)
	mkdir $(SASS_OUTPUT)

dev: prepare
	$(SASS) -I $(NODE_MODULES) --watch $(SASS_INPUT):$(SASS_OUTPUT)

build: prepare
	$(SASS) -I $(NODE_MODULES) --update $(SASS_INPUT):$(SASS_OUTPUT) --style compressed
