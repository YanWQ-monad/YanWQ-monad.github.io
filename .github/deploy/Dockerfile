FROM node

LABEL "com.github.actions.name"="Hexo deploy"
LABEL "com.github.actions.description"="Deploy hexo to GitHub with access token"
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="green"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
