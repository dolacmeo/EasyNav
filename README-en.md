# EasyNav <!-- omit in toc -->
> 单页导航，仅需简单配置。

__[Live demo](https://markdown-it.github.io)__

- 为满足内网简单导航的需求而设计
- 结构简单，MIT授权，提供基本思路，可随意修改
- 满足不同需求
  - 初级用户
    - 仅需修改 `config.json` 并添加图片资源即可使用
    - 仅需最基本的HTTP服务，或python的一行服务器 `python -m http.server 8000`
  - 进阶用户
    - 可修改整套前端框架，及对应的js动态模板


__文档目录__

- [使用方法](#使用方法)
  - [修改配置](#修改配置)
  - [静态资源](#静态资源)
  - [部署页面](#部署页面)
- [进阶玩法](#进阶玩法)
  - [文件结构](#文件结构)
  - [修改指北](#修改指北)
- [版权声明](#版权声明)
- [备注](#备注)


- [Install](#install)
- [Usage examples](#usage-examples)
  - [Simple](#simple)
  - [Init with presets and options](#init-with-presets-and-options)
  - [Plugins load](#plugins-load)
  - [Syntax highlighting](#syntax-highlighting)
  - [Linkify](#linkify)
- [API](#api)
- [Syntax extensions](#syntax-extensions)
  - [Manage rules](#manage-rules)
- [Benchmark](#benchmark)
- [markdown-it for enterprise](#markdown-it-for-enterprise)
- [Authors](#authors)
- [References / Thanks](#references--thanks)

## 使用方法

**node.js**:

```bash
npm install markdown-it --save
```

**browser (CDN):**

- [jsDeliver CDN](http://www.jsdelivr.com/#!markdown-it "jsDelivr CDN")
- [cdnjs.com CDN](https://cdnjs.com/libraries/markdown-it "cdnjs.com")


## Usage examples

See also:

- __[API documentation](https://markdown-it.github.io/markdown-it/)__ - for more
  info and examples.
- [Development info](https://github.com/markdown-it/markdown-it/tree/master/docs) -
  for plugins writers.


### Simple

```js
// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');

// node.js, the same, but with sugar:
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');

// browser without AMD, added to "window" on script load
// Note, there is no dash in "markdownit".
var md = window.markdownit();
var result = md.render('# markdown-it rulezz!');
```

Single line rendering, without paragraph wrap:

```js
var md = require('markdown-it')();
var result = md.renderInline('__markdown-it__ rulezz!');
```


### Init with presets and options

(*) presets define combinations of active rules and options. Can be
`"commonmark"`, `"zero"` or `"default"` (if skipped). See
[API docs](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) for more details.

```js
// commonmark mode
var md = require('markdown-it')('commonmark');

// default mode
var md = require('markdown-it')();

// enable everything
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

// full options list (defaults)
var md = require('markdown-it')({
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      false,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});
```

### Plugins load

```js
var md = require('markdown-it')()
            .use(plugin1)
            .use(plugin2, opts, ...)
            .use(plugin3);
```


### Syntax highlighting

Apply syntax highlighting to fenced code blocks with the `highlight` option:

```js
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
```

Or with full wrapper override (if you need assign class to `<pre>`):

```js
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
```

### Linkify

`linkify: true` uses [linkify-it](https://github.com/markdown-it/linkify-it). To
configure linkify-it, access the linkify instance through `md.linkify`:

```js
md.linkify.set({ fuzzyEmail: false });  // disables converting email to link
```


## API

__[API documentation](https://markdown-it.github.io/markdown-it/)__

If you are going to write plugins - take a look at
[Development info](https://github.com/markdown-it/markdown-it/tree/master/docs).


## Syntax extensions

Embedded (enabled by default):

- [Tables](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [Strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

Via plugins:

- [subscript](https://github.com/markdown-it/markdown-it-sub)
- [superscript](https://github.com/markdown-it/markdown-it-sup)
- [footnote](https://github.com/markdown-it/markdown-it-footnote)
- [definition list](https://github.com/markdown-it/markdown-it-deflist)
- [abbreviation](https://github.com/markdown-it/markdown-it-abbr)
- [emoji](https://github.com/markdown-it/markdown-it-emoji)
- [custom container](https://github.com/markdown-it/markdown-it-container)
- [insert](https://github.com/markdown-it/markdown-it-ins)
- [mark](https://github.com/markdown-it/markdown-it-mark)
- ... and [others](https://www.npmjs.org/browse/keyword/markdown-it-plugin)


### Manage rules

By default all rules are enabled, but can be restricted by options. On plugin
load all its rules are enabled automatically.

```js
// Activate/deactivate rules, with curring
var md = require('markdown-it')()
            .disable([ 'link', 'image' ])
            .enable([ 'link' ])
            .enable('image');

// Enable everything
md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
});
```

You can find all rules in sources:
[parser_core.js](lib/parser_core.js), [parser_block](lib/parser_block.js),
[parser_inline](lib/parser_inline.js).


## Benchmark

Here is the result of readme parse at MB Pro Retina 2013 (2.4 GHz):

```bash
make benchmark-deps
benchmark/benchmark.js readme

Selected samples: (1 of 28)
 > README

Sample: README.md (7774 bytes)
 > commonmark-reference x 1,222 ops/sec ±0.96% (97 runs sampled)
 > current x 743 ops/sec ±0.84% (97 runs sampled)
 > current-commonmark x 1,568 ops/sec ±0.84% (98 runs sampled)
 > marked x 1,587 ops/sec ±4.31% (93 runs sampled)
```

__Note.__ CommonMark version runs with [simplified link normalizers](https://github.com/markdown-it/markdown-it/blob/master/benchmark/implementations/current-commonmark/index.js)
for more "honest" compare. Difference is ~ 1.5x.

As you can see, `markdown-it` doesn't pay with speed for it's flexibility.
Slowdown of "full" version caused by additional features not available in
other implementations.


## markdown-it for enterprise

Available as part of the Tidelift Subscription.

The maintainers of `markdown-it` and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-markdown-it?utm_source=npm-markdown-it&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)


## Authors

- Alex Kocharin [github/rlidwka](https://github.com/rlidwka)
- Vitaly Puzrin [github/puzrin](https://github.com/puzrin)

_markdown-it_ is the result of the decision of the authors who contributed to
99% of the _Remarkable_ code to move to a project with the same authorship but
new leadership (Vitaly and Alex). It's not a fork.

## References / Thanks

Big thanks to [John MacFarlane](https://github.com/jgm) for his work on the
CommonMark spec and reference implementations. His work saved us a lot of time
during this project's development.

**Related Links:**

- https://github.com/jgm/CommonMark - reference CommonMark implementations in C & JS,
  also contains latest spec & online demo.
- http://talk.commonmark.org - CommonMark forum, good place to collaborate
  developers' efforts.

**Ports**

- [motion-markdown-it](https://github.com/digitalmoksha/motion-markdown-it) - Ruby/RubyMotion
- [markdown-it-py](https://github.com/ExecutableBookProject/markdown-it-py)- Python
