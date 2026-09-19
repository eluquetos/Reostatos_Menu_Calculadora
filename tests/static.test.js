const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../docs"),html=fs.readFileSync(path.join(root,"index.html"),"utf8"),app=fs.readFileSync(path.join(root,"app.js"),"utf8"),css=fs.readFileSync(path.join(root,"styles.css"),"utf8");
for(const file of ["index.html","styles.css","theme.css","app.js","manifest.webmanifest","icon.svg","sw.js"])assert.ok(fs.existsSync(path.join(root,file)),file+" ausente");
for(const id of ["menu-view","app-grid","viewer","back-menu","open-full","app-frame"])assert.ok(html.includes(`id="${id}"`),id+" ausente");
for(const name of ["Reostatos_1_rama_1iny","Reostatos_1_rama_2iny"])assert.ok(app.includes(name),name+" ausente");
assert.ok(app.includes("history.pushState"));assert.ok(app.includes("popstate"));assert.ok(css.includes("100dvh"));
const manifest=JSON.parse(fs.readFileSync(path.join(root,"manifest.webmanifest"),"utf8"));assert.equal(manifest.display,"standalone");assert.equal(manifest.short_name,"REÓSTATOS Menú");
console.log("Pruebas del menú REÓSTATOS: correctas");
