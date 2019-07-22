workflow "Build and deploy on push" {
  on = "push"
  resolves = ["hexo deploy"]
}

action "npm install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "hexo generate" {
  uses = "./.github/generate"
  needs = ["npm install"]
}

action "filter branch blog" {
  uses = "actions/bin/filter@0dbb077f64d0ec1068a644d25c71b1db66148a24"
  needs = ["hexo generate"]
  args = "branch blog"
}

action "hexo deploy" {
  uses = "./.github/deploy"
  needs = ["filter branch blog"]
  secrets = ["GITHUB_TOKEN"]
}
