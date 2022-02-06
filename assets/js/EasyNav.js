
// https://www.zhangxinxu.com/wordpress/2013/05/js-dom-basic-useful-method/
HTMLElement.prototype.appendHTML = function(html) {
    let divTemp = document.createElement("div"), nodes = null
        , fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (let i=0, length=nodes.length; i<length; i+=1) {
        fragment.appendChild(nodes[i].cloneNode(true));
    }
    this.appendChild(fragment);
    nodes = null;
    fragment = null;
};

async function showMdDoc(mdName) {
    let md_uri = mdName?"pages/"+mdName+".md":"README.md";
    let mdData = await fetch(md_uri).then((res) => {return res.text();}),
        mdRender = template.compile(await fetch("assets/temp/mdfile.art").then((res) => {return res.text();}));
    let md = window.markdownit({html:true});

    document.getElementById("layoutSidenav_content").innerHTML =
        mdRender({"mdName": mdName===undefined?"使用说明 - README":mdName, "mdData": md.render(mdData)});
}

async function makeEasyNav() {
    let area_id = "appArea",
        link_id = "navBar",
        conf_uri = "config.json",
        temp_list_uri = "assets/temp/list.art",
        temp_link_uri = "assets/temp/link.art",
        temp_brand_uri = "assets/temp/brand.art";
    let conf = await (await fetch(conf_uri)).json(),
        temp_list = await fetch(temp_list_uri).then((res) => {return res.text();}),
        temp_link = await fetch(temp_link_uri).then((res) => {return res.text();}),
        temp_brand = await fetch(temp_brand_uri).then((res) => {return res.text();});
    let list_render = template.compile(temp_list),
        link_render = template.compile(temp_link),
        brand_render = template.compile(temp_brand),
        list_area = document.getElementById(area_id),
        link_area = document.getElementById(link_id),
        brand_area = document.getElementsByClassName('nav-brand');
    document.getElementsByTagName('title')[0].innerHTML=conf.Title;
    // document.getElementById('userAvatar').src=conf.avatar;
    let brand_tag = brand_render(conf);
    list_area.innerHTML="";
    link_area.innerHTML="";
    for (let i=0, length=brand_area.length; i<length; i+=1) {brand_area[i].innerHTML = brand_tag;}
    conf.navLists.forEach(function (v) {list_area.appendHTML(list_render(v));});
    conf.navLinks.forEach(function (v) {link_area.appendHTML(link_render(v));});

}

makeEasyNav().then(r => console.log("欢迎使用EasyNav！"));
