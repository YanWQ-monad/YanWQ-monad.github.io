'use strict';

let cheerio;

function remove_footnotes_hr($, data) {
  $('section.footnotes[role="doc-endnotes"] > hr:first-child').remove();
}

function translate_image_uri($, data) {
  const matches = data.source.match(/_posts\/(.*)\.md/);
  if (!matches) {
    return;
  }
  const name = matches[1];

  $('img').each((_, e) => {
    const src = $(e).attr('src');
    if (!src.startsWith('/')) {
      $(e).attr('src', `/images/${name}/${src}`);
    }
  });
}

hexo.extend.filter.register('after_post_render', (data) => {
  if (!cheerio) cheerio = require('cheerio');

  const $ = cheerio.load(data.content);

  remove_footnotes_hr($, data);
  translate_image_uri($, data);

  // avoid adding <html><head><body>
  // https://github.com/cheeriojs/cheerio/issues/1031#issuecomment-340608465
  data.content = $('body').html();
  return data;
});
