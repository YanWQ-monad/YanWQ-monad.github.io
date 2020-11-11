'use strict';

var cheerio;

hexo.extend.filter.register('after_post_render', function(data) {
  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, { decodeEntities: true });

  $('section.footnotes[role="doc-endnotes"] > hr:first-child').remove();

  data.content = $.html();
  return data;
});
