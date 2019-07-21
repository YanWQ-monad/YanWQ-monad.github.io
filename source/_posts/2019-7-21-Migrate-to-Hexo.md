---
title: 迁移到 Hexo
date: 2019/7/21
categories:
- 日常
---

其实很早就入坑 GitHub Pages 写博客了，之前一直在用 [HuxBlog](https://github.com/Huxpro/huxblog-boilerplate) 模板。其实它还是挺不错的，只是有些细节我不太满意。另观 Hexo 也挺不错的，特别是发现了这个简洁又美观的主题之后，就决定迁过来。

<!-- more -->

一开始用的时候感觉还是挺好的，只是由于 jekyll 的可定制性低（GitHub 不允许运行 jekyll 插件），各种修改都只能交给前端 JavaScript 来完成（比如[这一段](https://github.com/YanWQ-monad/YanWQ-monad.github.io-archive/blob/blog/_includes/footer.html#L144-L291)）。每次都是随便地加一点，改一点，久而久之就会变得难以维护。虽然说后来也换成了 Travis CI 来构建，但是也懒得写 jekyll 插件了（懒得学 Ruby）。

其次就是~~我感觉~~ HuxBlog 还是挺重的，依赖 jQuery，Bootstrap 等库。特别点名 jQuery，只用了它 1% 的功能却要消耗几十 KB 的流量。这点流量平时可能不算什么，可是当它放到 GitHub Pages 上加载，速度就会变得其慢无比，这是我无法忍受的。还有就是主页上那张 203 KB 的图，加载要 8s。各种因素综合起来导致旧博客的 DOMContentLoaded 需要 5s，Load 需要 12s（本地测试结果），无论是谁都受不了这个速度。（~~其实说白了就是我懒得优化~~）

第三个原因就是它的样式我不太喜欢。一开始用的时候没有什么感觉，但是当用久了，感觉 HuxBlog 的冷色调有点偏重。期间也逛了一下 [Menci](https://oi.men.ci) 等人的博客，发现令人赏心悦目的博客都是基于暖色调的，~~充满了 OI 的人情味~~。

如果说还有一点，就是 jekyll 的本地构建太麻烦了，这对一个框架的体验有很大关系。每次都要装一个~~硕大的~~ Ruby，然后又要装一堆 jekyll 的依赖，而且 jekyll 构建的速度又非常感人（指在 Windows 上），如果开 Incremental Regeneration 又不一定能正确渲染，体验不是很佳。（~~好像说得 Hexo 和 npm 就没有一大堆依赖一样~~，逃）

由于这三个原因，我就把旧的博客扔在一边没有去管，~~这就是我不更新博客的理由吗？~~

后来不知道从哪发现的 [Phoenix's blog](https://blog.phoenixlzx.com)，这个主题（[apollo](https://github.com/pinggod/hexo-theme-apollo)）让我眼前一亮，看上去非常简洁、清新，而且它只有一个 4KB 的 CSS，不依赖任何第三方库。于是就临时起意，大手一挥（大误），把博客迁移到 Hexo 来。
