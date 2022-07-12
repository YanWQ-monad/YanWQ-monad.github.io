#!/bin/bash

set -e

# fix hexo-katexify render error on code block
sed -i "5a'hexoPostRenderCodeBlock'," node_modules/hexo-katexify/dist/lib/filter.js
sed -i "31aif (line.startsWith('<!-- katex: off -->')) return;" node_modules/hexo-katexify/dist/lib/filter.js

# set last modified date from git
git ls-files -z | while read -d '' path; do touch -d $(git log -1 --format="@%ct" "$path") "$path"; done

npx hexo generate
