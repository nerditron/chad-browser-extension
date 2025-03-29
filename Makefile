all: yarn build

yarn:
	yarn install

archive: all
	npx web-ext build --source-dir src --overwrite-dest

build: chad_options chad_content_script

chad_options:
	$(MAKE) -C src/chad_options/ build

chad_content_script:
	$(MAKE) -C src/chad_content_script/ build

watch: watch_content_script watch_options

watch_content_script:
	$(MAKE) -C src/chad_content_script/ watch

watch_options:
	$(MAKE) -C src/chad_options/ watch

clean: clean_yarn clean_logo clean_settings clean_content_script

clean_yarn:
	rm -rf node_modules

clean_settings:
	$(MAKE) -C src/chad_options/ clean

clean_content_script:
	$(MAKE) -C src/chad_content_script/ clean
