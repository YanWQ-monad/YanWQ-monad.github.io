#!/bin/sh

set -e

npm install --save hexo-deployer-git
sed -i "s/{GITHUB_TOKEN}/${GITHUB_TOKEN}/g" _config.yml
npx hexo deploy
