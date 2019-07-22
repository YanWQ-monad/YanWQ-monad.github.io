FROM node

ENV PANDOC_VERSION=2.7.3

RUN wget https://github.com/jgm/pandoc/releases/download/$PANDOC_VERSION/pandoc-$PANDOC_VERSION-1-amd64.deb -O /tmp/pandoc-$PANDOC_VERSION-1-amd64.deb -nv \
 && dpkg -i /tmp/pandoc-$PANDOC_VERSION-1-amd64.deb \
 && rm /tmp/pandoc-$PANDOC_VERSION-1-amd64.deb

LABEL "com.github.actions.name"="Hexo generate with KaTeX"
LABEL "com.github.actions.description"="Custom hexo generate (with pandoc)"
LABEL "com.github.actions.icon"="file"
LABEL "com.github.actions.color"="red"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
