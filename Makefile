all: yarn build logo

yarn:
	yarn install

archive: all
	npx web-ext build --source-dir src --overwrite-dest

build: chad_options chad_content_script

logo: logo_48 logo_96 logo_128

logo_48: src/chad_logo.svg
	npx svgexport src/chad_logo.svg src/chad_logo_48.png pad 48:48

logo_96: src/chad_logo.svg
	npx svgexport src/chad_logo.svg src/chad_logo_96.png pad 96:96

logo_128: src/chad_logo.svg
	npx svgexport src/chad_logo.svg src/chad_logo_128.png pad 128:128

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

clean_logo:
	rm src/chad_logo.png

clean_settings:
	$(MAKE) -C src/chad_options/ clean

clean_content_script:
	$(MAKE) -C src/chad_content_script/ clean
