# EasyNav <!-- omit in toc -->

[中文文档](https://github.com/dolaCmeo/EasyNav/blob/master/README.md) | 
[English document](https://github.com/dolaCmeo/EasyNav/blob/master/README-en.md)

> Single Nav Page, Only One File Need To Config

> **only for noobs~**

<p align="center">
<img src="pages/img/preview.png" width="80%" alt="preview">
</p>

- Design for simple home network nav
- Less files, MIT Licenses, Mod FREE
- For different levels
  - Noobs
    - modify `config.json` , maybe add some icons.
    - need basic HTTP service, or just python `python -m http.server 8000`
  - Geeks
    - replace entire framework，and js template engine.

-----

__Document__

- [HowToUse](#HowToUse)
  - [ModifyConfig](#ModifyConfig)
  - [Static](#Static)
  - [Deploy](#Deploy)
- [Advanced](#Advanced)
  - [FileStructure](#FileStructure)
  - [DIY](#DIY)
- [Copyright](#Copyright)
- [Remark(why)](#why)

-----

## HowToUse

**git clone**
```bash
git clone https://github.com/dolaCmeo/EasyNav.git
```

**Download & Unzip**
```bash
https://github.com/dolaCmeo/EasyNav/archive/refs/heads/main.zip
```

### ModifyConfig

**Modify [`config.json`](https://github.com/dolaCmeo/EasyNav/blob/master/config.json)**
- `Title`: page title
- `brandTitle`: Inner page title
- `brandLogo`: Inner page Logo
- `avatar`: User Avatar(DEMO NOT USE)
- `navLinks`: Shortcut links
  - `linkLabel`: Links label 
  - `items`: Links items (Max Lv3)
    - `icon`: Icon class name (DEMO USED fontawesome)
    - `linkName`: Link display name
    - `linkUri`: Link url (when is`null`，enable `items` for subs)
- `navLists`: Nav Zone
  - `navName`: Nav group name
  - `apps`: Nav apps
    - `name`: app name(first line)
    - `ps`: app remark(second line)
    - `icon`: static app icon `assets/icon`+<名>+`.png`
    - `addr`: app link addr (NOW only first in USED)



### Static

**Any else icon in need, add to the path by yourself**
[`/assets/icon`](https://github.com/dolaCmeo/EasyNav/tree/master/assets/icon)


### Deploy

**If there is any HTTP service in some folder, Copy & Paste.**

If no where could deploy, use `Python3`，In windows just execute `py3_server.bat`.

-----

## Advanced

### FileStructure

```text
  ─┬─
   ├──── index.html                         Main Page
   ├──── config.json                        Config file
   ├──── py3_server.bat                     py3-http win batch 
   ├────┐/assets                            Static
   │    ├───/js                             JavaScript
   │    │      /template-web.min.js         js template
   │    │      /EasyNav.js                  js main code
   │    ├───/css                            css styles
   │    │      /styles.css                  css main code
   │    ├───/icon                           icon images
   │    │      /*.png                       png images
   │    └───/temp                           template for js code
   │           /list.art                    Nav apps template
   │           /link.art                    Shortcut link template
   │           /brand.art                   Inner Title & Logo
   │           /mdfile.art                  Markdown template
   ├─────/pages                             Markdown files
   │        /remark.md                      remark demo md file
   │        /*.md                           md files
   └────┐/vendors                           library
        ├───/jquery-*                       Jquery
        ├───/bootstrap-*                    Bootstrap
        ├───/fontawesome-*                  Fontawesome
        └───/markdown-it-*                  Markdown-it
```


### DIY


> For reference only
1. Coding page, have `Left Nav` `Top Nav` `Right Bottom Content` inside.
3. Analyze different parts for template
4. Nav template `assets/temp/list.art`
5. Link template `assets/temp/link.art`
6. Brand template `assets/temp/brand.art`
7. Markdown template `assets/temp/mdfile.art`
8. Modify `assets/js/EasyNav.js`:`makeEasyNav()` , if you change `id` `uri`.
9. Could use`<a href="#!" onclick="showMdDoc()">Show Markdown</a>` to get`markdwon`file display in `ContentZone`


-----

## Copyright

- Bootstrap (MIT)

  https://github.com/twbs/bootstrap

- jQuery (MIT)

  https://github.com/jquery/jquery

- Font Awesome ([GPL](https://fontawesome.com/license/free))

  https://github.com/FortAwesome/Font-Awesome

- art-template (MIT)

  https://github.com/aui/art-template

- markdown-it (MIT)

  https://github.com/markdown-it/markdown-it

- Start Bootstrap - SB Admin (MIT)

  https://startbootstrap.com/template/sb-admin

- Icons (Free)

  [ALL Images Get From Google For FREE](https://www.google.com/imghp)

- EasyNav (MIT)

  https://github.com/dolaCmeo/EasyNav

  **For FREE，Star PLZ 👍**
-----

## why

- Make your Config, DONE! No need Backends.
- Open source，libraries are **MIT**.
- I could Add, Modify, Anything U want.
- Maybe I well add some features, But not for sure.
- **If U get some help, Star PLZ ⭐**
- **`issues` is open, welcome to `fork`**


