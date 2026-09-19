const APPS=[
  {id:"Reostatos_1_rama_1iny",name:"1 nodo · 1 inyección",code:"1INY",injections:1,description:"Una misma inyección de campo alimenta las dos ramas para calcular R11 y R12. La regulación conserva una fuente común.",accent:"orange"},
  {id:"Reostatos_1_rama_2iny",name:"1 nodo · 2 inyecciones",code:"2INY",injections:2,description:"La inyección A calcula R11 y la inyección B calcula R12. La regulación utiliza una sola fuente para ambas ramas.",accent:"cyan"}
];
const BASE="https://eluquetos.github.io/";
const $=id=>document.getElementById(id);
const menu=$("menu-view"),viewer=$("viewer"),frame=$("app-frame"),loading=$("loading");

function renderMenu(){
  $("app-grid").innerHTML=APPS.map((app,index)=>`
    <article class="app-card accent-${app.accent}">
      <div class="card-top"><span class="index">${String(index+1).padStart(2,"0")}</span><span class="code">${app.code}</span></div>
      <div><p class="card-label">REÓSTATOS</p><h3>${app.name}</h3><p class="description">${app.description}</p></div>
      <div class="specs"><span><b>1</b> nodo</span><span><b>2</b> ramas</span><span><b>${app.injections}</b> ${app.injections===1?"inyección":"inyecciones"} de campo</span></div>
      <button type="button" data-app="${app.id}">Abrir calculadora <span aria-hidden="true">→</span></button>
    </article>`).join("");
}

function getApp(id){return APPS.find(app=>app.id===id)}
function appUrl(app){return BASE+app.id+"/"}
function showMenu({historyMode="push"}={}){
  frame.removeAttribute("src");viewer.hidden=true;menu.hidden=false;document.body.classList.remove("viewing");document.title="REÓSTATOS · Menú de calculadoras";
  if(historyMode==="push")history.pushState({},"",location.pathname);
  window.scrollTo({top:0,behavior:"instant"});
}
function openApp(id,{historyMode="push"}={}){
  const app=getApp(id);if(!app)return showMenu({historyMode:"replace"});
  menu.hidden=true;viewer.hidden=false;document.body.classList.add("viewing");loading.hidden=false;
  $("viewer-name").textContent=app.name;$("open-full").href=appUrl(app);frame.title="REÓSTATOS · "+app.name;frame.src=appUrl(app);document.title=app.name+" · REÓSTATOS";
  const url=new URL(location.href);url.searchParams.set("app",app.id);history[historyMode+"State"]({app:app.id},"",url);
}

$("app-grid").addEventListener("click",event=>{const button=event.target.closest("[data-app]");if(button)openApp(button.dataset.app)});
$("back-menu").addEventListener("click",()=>showMenu());
$("reload-app").addEventListener("click",()=>{loading.hidden=false;frame.src=frame.src});
frame.addEventListener("load",()=>{loading.hidden=true});
window.addEventListener("popstate",()=>{const id=new URL(location.href).searchParams.get("app");id?openApp(id,{historyMode:"replace"}):showMenu({historyMode:"replace"})});
renderMenu();const initial=new URL(location.href).searchParams.get("app");if(initial)openApp(initial,{historyMode:"replace"});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
