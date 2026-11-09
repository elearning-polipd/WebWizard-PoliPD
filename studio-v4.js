/* Web Wizard Studio v4: one-tool-at-a-time workspace. Loaded AFTER studio-fix.js. */
(function(){'use strict';
const studio=document.getElementById('studio');
const body=studio&&studio.querySelector('.studio-body');
const controls=body&&body.querySelector('.controls');
const preview=body&&body.querySelector('.preview-stage');
if(!studio||!body||!controls||!preview)return;
const groups=Array.from(controls.querySelectorAll(':scope > .control-group'));
if(groups.length<3){console.warn('WW4: existing controls structure not recognised');return;}
const config=[
 {id:'type',en:'Website Type',ms:'Jenis Laman',icon:'templates',groups:[0]},
 {id:'style',en:'Design Style',ms:'Gaya Reka',icon:'design_palette',groups:[1]},
 {id:'content',en:'Content',ms:'Kandungan',icon:'typography',groups:[2]},
 {id:'colors',en:'Colours',ms:'Warna',icon:'color_swatches',groups:[3]},
 {id:'advanced',en:'Advanced',ms:'Lanjutan',icon:'settings',groups:groups.map((_,i)=>i).filter(i=>i>3)}
];
const iconFiles={templates:'templates.webp',design_palette:'palette.webp',typography:'typography.webp',color_swatches:'color-swatches.webp',settings:'settings.webp'};
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n};
const root=el('section','ww4-workspace');root.setAttribute('aria-label','Website editing tools');
const heading=el('div','ww4-heading');const intro=el('div');intro.append(el('strong','','Create your website, step by step'),el('p','','Choose one tool. Your live preview stays visible.'));
const actions=el('div','ww4-actions');const collapse=el('button','','Close panel');collapse.type='button';collapse.hidden=true;actions.append(collapse);heading.append(intro,actions);
const toolbar=el('div','ww4-toolbar');toolbar.setAttribute('role','tablist');toolbar.setAttribute('aria-label','Website settings');
const panel=el('section','ww4-panel');panel.hidden=true;const ph=el('div','ww4-panelhead');const title=el('h3','','');ph.append(title);const fields=el('div','ww4-fields');const tip=el('p','ww4-tip','Adjust your choices here. The live canvas updates automatically.');panel.append(ph,fields,tip);
root.append(heading,toolbar,panel);body.insertBefore(root,preview);
let active=null;
const buttons={};
config.forEach(c=>{const b=el('button','ww4-tool');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected','false');b.setAttribute('aria-controls','ww4-panel');b.dataset.tool=c.id;const img=el('img');img.src='assets/icons/'+iconFiles[c.icon];img.alt='';img.loading='lazy';img.onerror=()=>{img.style.display='none';};const name=el('span','',c.en);b.append(img,name);b.addEventListener('click',()=>select(active===c.id?null:c.id));toolbar.append(b);buttons[c.id]=b;});
panel.id='ww4-panel';
function select(id){
 active=id;Object.values(buttons).forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tool===id)));
 panel.hidden=!id;collapse.hidden=!id;
 if(!id){groups.forEach(g=>controls.append(g));return;}
 const c=config.find(x=>x.id===id);title.textContent=c.en;
 groups.forEach(g=>controls.append(g));fields.replaceChildren();
 c.groups.forEach(i=>{if(groups[i])fields.append(groups[i]);});
}
collapse.addEventListener('click',()=>select(null));
// Move only one settings group at a time; no 'show all settings' flood.
select(null);
// The old gallery's mapping contains mismatched IDs; replace icons using actual card order.
const galleryIcons=['browser','typography','templates','home','analytics','launch','download','cloud-upload','html','palette','javascript','responsive'];
function repairGallery(){document.querySelectorAll('#model-gallery .model-card').forEach((card,i)=>{const art=card.querySelector('.thumb-shape');if(!art)return;const key=galleryIcons[i%galleryIcons.length];art.replaceChildren();const img=el('img','gallery-3d-icon');img.src='assets/icons/'+key+'.webp';img.alt='';img.loading='lazy';img.onerror=()=>{img.remove();art.textContent='✳'};art.append(img);});}
repairGallery();
// Non-invasive project persistence: store choices after the original handlers update state.
const STORE='web-wizard-studio-v4-project';
function save(){try{if(typeof state!=='undefined')localStorage.setItem(STORE,JSON.stringify({type:state.type,style:state.style,overrides:state.overrides,colors:state.colors,device:state.device,version:4}));}catch(e){}}
function restore(){try{const raw=localStorage.getItem(STORE);if(!raw||typeof state==='undefined')return;const s=JSON.parse(raw);if(!s||typeof s!=='object')return;const sel=document.getElementById('type-select');if(s.type&&sel&&Array.from(sel.options).some(o=>o.value===s.type))state.type=s.type;if(s.style)state.style=s.style;if(s.overrides&&typeof s.overrides==='object')state.overrides=s.overrides;if(s.colors&&typeof s.colors==='object')state.colors=s.colors;if(['desktop','tablet','mobile'].includes(s.device))state.device=s.device;if(typeof render==='function')render();repairGallery();}catch(e){console.warn('WW4 restore failed',e)}}
restore();
body.addEventListener('input',()=>setTimeout(save,0),true);
body.addEventListener('change',()=>setTimeout(save,0),true);
body.addEventListener('click',()=>setTimeout(save,0),true);
window.addEventListener('beforeunload',save);
// Keyboard-friendly tab toolbar.
toolbar.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;const all=Array.from(toolbar.querySelectorAll('button'));const i=all.indexOf(document.activeElement);if(i<0)return;e.preventDefault();all[(i+(e.key==='ArrowRight'?1:-1)+all.length)%all.length].focus()});
window.WebWizardV4={select,save,repairGallery};
})();
