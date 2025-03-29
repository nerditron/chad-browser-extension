clean:
	rm -rf dist .cache

build: build_chad build_ts build_css

build_chad:
	npx webpack --config ../../webpack.config.js

build_ts: *.ts
	npx parcel build ./index.ts --dist-dir dist

build_css: *.css

watch: watch_ts

watch_ts:
	npx parcel watch index.ts --dist-dir dist
