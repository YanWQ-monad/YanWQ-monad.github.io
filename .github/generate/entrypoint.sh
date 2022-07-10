#!/bin/bash

set -e

# set last modified date from git
git ls-files -z | while read -d '' path; do touch -d $(git log -1 --format="@%ct" "$path") "$path"; done

npx hexo generate
