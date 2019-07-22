#!/bin/sh

set -e

sed -i 's/decodeEntities: true/decodeEntities: false/g' node_modules/hexo-katex/index.js
sed -i 's/$(this).text()/cheerio.load($(this).html()).html({ decodeEntities: false })/g' node_modules/hexo-katex/index.js

npx hexo generate
