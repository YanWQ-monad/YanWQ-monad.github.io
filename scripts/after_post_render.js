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
    let src = $(e).attr('src');
    if (!src.startsWith('http')) {
      src = `/images/${name}/${src}`;
    }

    const $a = $('<a></a>');
    const $img = $(e).clone();
    $a.attr('href', src);
    $a.addClass('glightbox');

    $img.attr('src', src);
    $img.attr('loading', 'lazy');

    $(e).replaceWith($a);
    $a.append($img);
  });
}

hexo.extend.filter.register('after_post_render', (data) => {
  if (!cheerio) cheerio = require('cheerio');

  // avoid adding <html><head><body>
  // https://github.com/cheeriojs/cheerio/issues/1031#issuecomment-748677236
  const $ = cheerio.load(data.content, null, false);

  remove_footnotes_hr($, data);
  translate_image_uri($, data);

  data.content = $.html();
  return data;
});
