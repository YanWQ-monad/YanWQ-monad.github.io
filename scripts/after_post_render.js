'use strict';

var cheerio;

hexo.extend.filter.register('after_post_render', function(data) {
  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, { decodeEntities: true });

  $('section.footnotes[role="doc-endnotes"] > hr:first-child').remove();

  // avoid adding <html><head><body>
  // https://github.com/cheeriojs/cheerio/issues/1031#issuecomment-340608465
  data.content = $('body').html();
  return data;
});
