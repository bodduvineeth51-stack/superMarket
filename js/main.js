(async function(){
const $ = id => document.getElementById(id);
const C = {blue:'#1D5FE0', deep:'#123E9C', red:'#E3262B', ink:'#14203A', peach:'#EBCBA8', wall:'#F7F4EF'};

/* ---------- catalogue (invented brands) ---------- */
const CATS = [
  {key:'dairy', n:'01', title:'Dairy & Breakfast', sub:'Milk · Yogurt · Cereal · Juice', items:[
    ['Full Cream Milk','Meadowfold','1 L',68,'carton','#FFFFFF','#2C7BE5'],
    ['Toned Milk','Meadowfold','1 L',56,'carton','#FFFFFF','#1FA36B'],
    ['Honey Oat Flakes','Sunrow','475 g',215,'cereal','#F4B321','#B5371E'],
    ['Choco Puffs','Sunrow','350 g',189,'cereal','#5E3420','#F2C14E'],
    ['Greek Yogurt','Kalo','400 g',95,'tub','#F3F6FA','#2B6CB0'],
    ['Salted Butter','Meadowfold','500 g',285,'brick','#FFE48A','#C8102E'],
    ['Orange Juice','Groveline','1 L',130,'carton','#FF9F1C','#2E7D32'],
    ['Rolled Oats','Hearthmill','1 kg',199,'cereal','#EADBB8','#5A7D2B'],
  ]},
  {key:'grocery', n:'02', title:'Grocery & Staples', sub:'Rice · Atta · Dal · Oil · Spices', items:[
    ['Basmati Rice','Pallav','5 kg',649,'sack','#F5EEDC','#8C1D40'],
    ['Whole Wheat Atta','Khetwala','5 kg',289,'sack','#F2D492','#A0521C'],
    ['Toor Dal','Khetwala','1 kg',172,'bag','#FFD23F','#1F6E43'],
    ['Sunflower Oil','Goldcrest','1 L',165,'bottle','#FFE066','#E07A10'],
    ['Penne Pasta','Trattino','500 g',120,'cereal','#1F4E9E','#F4C430'],
    ['Tomato Pasta Sauce','Trattino','400 g',175,'jar','#C0392B','#F4C430'],
    ['Turmeric Powder','Masalaghar','200 g',62,'brick','#F1A208','#7A1F1F'],
    ['Iodised Salt','Saagar','1 kg',28,'bag','#FFFFFF','#1D5FE0'],
  ]},
  {key:'snacks', n:'03', title:'Snacks & Drinks', sub:'Chips · Biscuits · Chocolate · Soda', items:[
    ['Sea Salt Chips','Krisko','90 g',40,'bag','#F7C548','#D7263D'],
    ['Masala Twists','Krisko','90 g',40,'bag','#E4572E','#FFE066'],
    ['Cream Biscuits','Bakewell','150 g',35,'brick','#2E86AB','#F6F5AE'],
    ['Dark Chocolate 70%','Cocoli','100 g',160,'brick','#3B1F14','#D4A373'],
    ['Lemon Fizz','Bublo','330 ml',40,'can','#C9E265','#127475'],
    ['Cola Classic','Bublo','330 ml',40,'can','#B5121B','#FFFFFF'],
    ['Butter Popcorn','Poppit','120 g',75,'bag','#FFF3B0','#E09F3E'],
    ['Roasted Almonds','Nutfield','200 g',299,'tub','#A0522D','#F5DEB3'],
  ]},
  {key:'home', n:'04', title:'Home Care', sub:'Laundry · Dishwash · Cleaners · Tissues', items:[
    ['Matic Liquid Detergent','Brightly','2 L',399,'bottle','#4F9DDE','#FFFFFF'],
    ['Lemon Dishwash Gel','Brightly','750 ml',129,'bottle','#E9F06B','#2F8F3E'],
    ['Floor Cleaner Pine','Shinewell','1 L',189,'bottle','#4CAF7D','#0E4D2F'],
    ['Glass Spray','Shinewell','500 ml',109,'spray','#5BC0EB','#1D3557'],
    ['Soft Tissues','Cloudly','3 x 100',199,'tissue','#F7F7FF','#9B5DE5'],
    ['Garbage Bags L','Tidyup','30 pcs',149,'brick','#2B2D42','#8ECAE6'],
    ['Detergent Powder','Brightly','1 kg',140,'bag','#1D5FE0','#FFD23F'],
  ]},
  {key:'care', n:'05', title:'Personal Care', sub:'Hair · Oral · Bath · Skin', items:[
    ['Herbal Shampoo','Verdana','340 ml',245,'pump','#3A9D5D','#F1FAEE'],
    ['Mint Toothpaste','Smilo','150 g',95,'tube','#FFFFFF','#E3262B'],
    ['Sandal Soap','Malhar','4 x 100 g',180,'brick','#F4E1C1','#9C6644'],
    ['Body Lotion','Dewmist','400 ml',299,'pump','#FCE4EC','#C2185B'],
    ['Face Wash Neem','Verdana','100 ml',139,'tube','#E8F5E9','#2E7D32'],
    ['Deo Spray Fresh','Aeris','150 ml',229,'spray','#14213D','#4CC9F0'],
    ['Coconut Hair Oil','Kerala Gold','300 ml',154,'bottle','#FFFFFF','#2A9D8F'],
  ]},
];
// shape: [type, w, h, d] in metres (already scaled for readability)
const SHAPES = {
  carton:['box',.15,.36,.15], cereal:['box',.3,.4,.11], tub:['cyl',.09,.18], brick:['box',.22,.12,.13],
  sack:['box',.4,.4,.16], bag:['box',.3,.38,.12], bottle:['cyl',.065,.38,.05], jar:['cyl',.075,.2],
  can:['cyl',.055,.2], spray:['cyl',.055,.38], tissue:['box',.36,.18,.18], pump:['cyl',.07,.34], tube:['box',.34,.08,.08]
};
const SKUS=[];
CATS.forEach((c,ci)=>c.items.forEach(a=>{
  SKUS.push({id:SKUS.length,cat:ci,name:a[0],brand:a[1],size:a[2],price:a[3],shape:a[4],c1:a[5],c2:a[6]});
}));
function c_skus(ci){return SKUS.filter(s=>s.cat===ci)}

/* ---------- fonts then textures ---------- */
try{ await Promise.race([Promise.all([
  document.fonts.load('800 40px "Barlow Condensed"'),document.fonts.load('700 40px "Barlow Condensed"'),document.fonts.load('700 20px "Figtree"')
]), new Promise(r=>setTimeout(r,2500))]); }catch(e){}

const lum = hex => {const n=parseInt(hex.slice(1),16);const r=(n>>16)&255,g=(n>>8)&255,b=n&255;return (0.299*r+0.587*g+0.114*b)/255};
const onColor = hex => lum(hex)>0.6 ? C.ink : '#FFFFFF';
function wrap(ctx,text,maxW){const words=text.split(' ');const lines=[];let cur='';
  for(const w of words){const t=cur?cur+' '+w:w; if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t}
  lines.push(cur);return lines}

// draws the pack's front design into a rectangle
function drawFront(ctx,x,y,W,H,s){
  ctx.save();ctx.translate(x,y);
  ctx.fillStyle=s.c1;ctx.fillRect(0,0,W,H);
  // soft emblem
  ctx.globalAlpha=.22;ctx.fillStyle=s.c2;ctx.beginPath();ctx.arc(W*.78,H*.62,Math.min(W,H)*.42,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  // brand band
  const bh=Math.max(H*.2,W*.2);
  ctx.fillStyle=s.c2;ctx.fillRect(0,0,W,bh);
  ctx.fillStyle=onColor(s.c2);ctx.textAlign='center';ctx.textBaseline='middle';
  let fs=bh*.62;ctx.font=`800 ${fs}px "Barlow Condensed", sans-serif`;
  while(ctx.measureText(s.brand.toUpperCase()).width>W*.88&&fs>8){fs-=1;ctx.font=`800 ${fs}px "Barlow Condensed", sans-serif`}
  ctx.fillText(s.brand.toUpperCase(),W/2,bh/2+1);
  // product name
  ctx.fillStyle=onColor(s.c1);
  let ns=Math.min(W*.2,H*.14);let lines;
  do{ctx.font=`700 ${ns}px "Figtree", sans-serif`;lines=wrap(ctx,s.name,W*.86);ns-=1}
  while((lines.length*ns*1.15>H*.5 || lines.some(l=>ctx.measureText(l).width>W*.9)) && ns>7);
  const lh=ns*1.15;const top=bh+(H-bh)*.42-(lines.length-1)*lh/2;
  lines.forEach((l,i)=>ctx.fillText(l,W/2,top+i*lh));
  // size pill
  ctx.font=`600 ${Math.max(8,ns*.7)}px "Figtree", sans-serif`;
  const sw=ctx.measureText(s.size).width+ns*.9, sh=ns*1.1, sy=H-sh-H*.06;
  ctx.fillStyle=s.c2;roundRect(ctx,W/2-sw/2,sy,sw,sh,sh/2);ctx.fill();
  ctx.fillStyle=onColor(s.c2);ctx.fillText(s.size,W/2,sy+sh/2+1);
  ctx.restore();
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}

function thumbFor(s){
  const sh=SHAPES[s.shape];let w,h;
  if(sh[0]==='box'){w=sh[1];h=sh[2]}else{w=sh[1]*2.2;h=sh[2]}
  const H=240,W=Math.round(Math.min(240,Math.max(110,H*w/h)));
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  drawFront(cv.getContext('2d'),0,0,W,H,s);
  return cv.toDataURL('image/png');
}

/* ---------- three.js scene ---------- */
const stage=$('stage');
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
renderer.setSize(innerWidth,innerHeight);
stage.appendChild(renderer.domElement);
const canvas=renderer.domElement;
const scene=new THREE.Scene();
scene.background=new THREE.Color('#F3F5F9');
scene.fog=new THREE.Fog('#F3F5F9',22,62);
const camera=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,.05,120);
const ANISO=Math.min(8,renderer.capabilities.getMaxAnisotropy());

scene.add(new THREE.HemisphereLight('#ffffff','#cdbba5',.58));
scene.add(new THREE.AmbientLight('#ffffff',.3));
const sun=new THREE.DirectionalLight('#ffffff',.42);sun.position.set(6,20,10);scene.add(sun);

const M = c => new THREE.MeshLambertMaterial({color:c});
const mats={blue:M(C.blue),red:M(C.red),shelf:M('#F1F3F7'),panel:M('#DCE3EE'),white:M('#FAFAFA'),peach:M(C.peach),wall:M(C.wall),dark:M('#2A3242'),steel:M('#B8C0CC')};
function box(w,h,d,mat,x,y,z,parent=scene){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);parent.add(m);return m}

// canvas texture helper
function canvasTex(w,h,draw){const cv=document.createElement('canvas');cv.width=w;cv.height=h;draw(cv.getContext('2d'),w,h);
  const t=new THREE.CanvasTexture(cv);t.anisotropy=ANISO;return t}

// floor
const floorTex=canvasTex(256,256,(x,w,h)=>{x.fillStyle='#ECEBE6';x.fillRect(0,0,w,h);x.strokeStyle='#D6D5CF';x.lineWidth=3;x.strokeRect(0,0,w,h);
  x.fillStyle='rgba(0,0,0,.025)';x.fillRect(0,0,w/2,h/2);x.fillRect(w/2,h/2,w/2,h/2)});
floorTex.wrapS=floorTex.wrapT=THREE.RepeatWrapping;floorTex.repeat.set(24,30);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(48,60),new THREE.MeshLambertMaterial({map:floorTex}));
floor.rotation.x=-Math.PI/2;floor.position.set(0,0,1);scene.add(floor);

// ceiling + light panels
const CEIL=5;
const ceil=new THREE.Mesh(new THREE.PlaneGeometry(48,60),M('#F7F8FA'));ceil.rotation.x=Math.PI/2;ceil.position.set(0,CEIL,1);scene.add(ceil);
{
  const g=new THREE.PlaneGeometry(.5,2.4);const mat=new THREE.MeshBasicMaterial({color:'#FFFFFF'});
  const pos=[];for(let x=-21;x<=21;x+=3)for(let z=-26;z<=28;z+=4.5)pos.push([x,z]);
  const im=new THREE.InstancedMesh(g,mat,pos.length);const d=new THREE.Object3D();
  pos.forEach((p,i)=>{d.position.set(p[0],CEIL-.01,p[1]);d.rotation.set(Math.PI/2,0,0);d.updateMatrix();im.setMatrixAt(i,d.matrix)});scene.add(im);
  // ceiling grid strips
  const sg=new THREE.BoxGeometry(48,.04,.06);const sm=M('#E3E7EE');
  for(let z=-28;z<=30;z+=3){const s=new THREE.Mesh(sg,sm);s.position.set(0,CEIL-.03,z);scene.add(s)}
  // red cable runs, like store power tracks
  const rg=new THREE.BoxGeometry(.04,.04,58);const rm=new THREE.MeshBasicMaterial({color:C.red});
  [-18,-3,3,18].forEach(x=>{const r=new THREE.Mesh(rg,rm);r.position.set(x,CEIL-.35,1);scene.add(r)});
}
// walls: peach lower, white upper, with a red trim
function wall(w,x,z,ry){
  const g=new THREE.Group();
  box(w,3,.2,mats.peach,0,1.5,0,g);box(w,2,.2,mats.wall,0,4,0,g);box(w,.12,.24,mats.red,0,3,0,g);box(w,.3,.24,M('#D9DDE4'),0,.15,0,g);
  g.position.set(x,0,z);g.rotation.y=ry;scene.add(g);
}
wall(48,0,-29,0);wall(60,-24,1,Math.PI/2);wall(60,24,1,Math.PI/2);
// front wall with glass doors
box(18,5,.2,mats.wall,-15,2.5,31);box(18,5,.2,mats.wall,15,2.5,31);box(12,1.2,.2,mats.wall,0,4.4,31);
{const gl=new THREE.Mesh(new THREE.PlaneGeometry(12,3.8),new THREE.MeshBasicMaterial({color:'#BFD6F2',transparent:true,opacity:.35}));gl.position.set(0,1.9,31);gl.rotation.y=Math.PI;scene.add(gl)}

/* signage textures */
function signTex(n,title,sub,w=1024,h=220){
  return canvasTex(w,h,(x,W,H)=>{
    x.fillStyle=C.blue;x.fillRect(0,0,W,H);x.fillStyle=C.red;x.fillRect(0,H-18,W,18);
    x.fillStyle='#fff';x.textBaseline='middle';x.textAlign='left';
    let pad=46;
    if(n){x.font='800 110px "Barlow Condensed", sans-serif';x.fillStyle='#FFFFFF';x.fillText(n,pad,H*.44);pad+=x.measureText(n).width+30;
      x.fillStyle='rgba(255,255,255,.35)';x.fillRect(pad-16,40,4,H-90)}
    x.fillStyle='#fff';x.font='800 92px "Barlow Condensed", sans-serif';x.fillText(title.toUpperCase(),pad+8,H*.38);
    if(sub){x.font='600 34px "Figtree", sans-serif';x.globalAlpha=.85;x.fillText(sub,pad+10,H*.74);x.globalAlpha=1}
  });
}
function hangSign(tex,w,h,x,y,z,ry=0){
  const g=new THREE.Group();
  const fm=new THREE.MeshLambertMaterial({map:tex});
  const mats6=[mats.blue,mats.blue,mats.blue,mats.blue,fm,fm];
  const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,.06),mats6);g.add(b);
  const rg=new THREE.CylinderGeometry(.012,.012,CEIL-y-h/2,6);
  [-w*.4,w*.4].forEach(dx=>{const r=new THREE.Mesh(rg,mats.steel);r.position.set(dx,(CEIL-y)/2+h/4,0);g.add(r)});
  g.position.set(x,y,z);g.rotation.y=ry;scene.add(g);return g;
}

/* ---------- gondolas & products ---------- */
const AISLES=[-12,-6,0,6,12];
const GONDOLAS=[-15,-9,-3,3,9,15];
const Z0=6, Z1=-18, ZC=(Z0+Z1)/2, LEN=Z0-Z1;
const LEVELS=[.14,.6,1.06,1.52,1.98];
const HALF=.62;

function gondola(gx){
  box(HALF*2,.12,LEN,mats.blue,gx,.06,ZC);
  box(.05,2.3,LEN,mats.panel,gx,1.27,ZC);
  LEVELS.forEach(y=>{box(HALF*2,.035,LEN,mats.shelf,gx,y,ZC);
    [-1,1].forEach(s=>box(.02,.06,LEN,mats.blue,gx+s*HALF,y-.005,ZC))});
  for(let z=Z1;z<=Z0+.01;z+=2.4)box(HALF*2,2.35,.04,mats.steel,gx,1.27,z);
  box(HALF*2+.04,.32,LEN,mats.blue,gx,2.58,ZC);box(HALF*2+.06,.07,LEN,mats.red,gx,2.4,ZC);
  // end caps
  [Z0+.05,Z1-.05].forEach(z=>{box(HALF*2+.1,2.75,.1,mats.blue,gx,1.37,z);box(HALF*2+.12,.18,.12,mats.red,gx,2.2,z)});
}
GONDOLAS.forEach(gondola);

// which category faces each gondola side
function sideCat(gx,side){const ax=gx+side*3;let i=AISLES.indexOf(ax);if(i<0)i=side<0?0:4;return i}
// seeded random
let seed=7;const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};

const placements=SKUS.map(()=>[]);
GONDOLAS.forEach(gx=>[-1,1].forEach(side=>{
  const list=c_skus(sideCat(gx,side));
  LEVELS.forEach((ly,li)=>{
    let z=Z1+.12;let k=Math.floor(rnd()*list.length);
    while(z<Z0-.15){
      // heavy sacks low, small items high
      let s=list[k%list.length];k++;
      if(s.shape==='sack'&&li>1){continue}
      const sh=SHAPES[s.shape];
      const w=sh[0]==='box'?sh[1]:sh[1]*2;const d=sh[0]==='box'?sh[3]:sh[1]*2;const h=sh[2];
      const n=3+Math.floor(rnd()*4);
      for(let i=0;i<n&&z+w<Z0-.1;i++){
        placements[s.id].push({x:gx+side*(HALF-d/2-.04),y:ly+.018+h/2,z:z+w/2,ry:side>0?Math.PI/2:-Math.PI/2});
        z+=w+.025;
      }
      z+=.06;
    }
  });
}));

const productMeshes=[];
const white=new THREE.Color(1,1,1), glow=new THREE.Color(1.45,1.45,1.45);
SKUS.forEach(s=>{
  const P=placements[s.id];if(!P.length)return;
  const sh=SHAPES[s.shape];let geo,mat;
  if(sh[0]==='box'){
    const [_,w,h,d]=sh;const TW=256,TH=Math.round(Math.min(512,Math.max(96,TW*h/w)));
    const tex=canvasTex(TW,TH,(x,W,H)=>drawFront(x,0,0,W,H,s));
    const side=new THREE.MeshLambertMaterial({color:s.c2}), top=new THREE.MeshLambertMaterial({color:s.c1});
    geo=new THREE.BoxGeometry(w,h,d);mat=[side,side,top,top,new THREE.MeshLambertMaterial({map:tex}),side];
  }else{
    const r=sh[1],h=sh[2];const top=s.shape==='bottle'?r*.62:(s.shape==='spray'||s.shape==='pump')?r*.85:r;
    const W=512,H=Math.round(Math.min(512,Math.max(128,W*h/(Math.PI*2*r))));
    const tex=canvasTex(W,H,(x,CW,CH)=>{x.fillStyle=s.c1;x.fillRect(0,0,CW,CH);
      x.fillStyle=s.c2;x.fillRect(0,0,CW,CH*.08);x.fillRect(0,CH*.92,CW,CH*.08);
      const fw=CW*.44;drawFront(x,(CW-fw)/2,CH*.08,fw,CH*.84,s)});
    geo=new THREE.CylinderGeometry(top,r,h,24,1,false,-Math.PI,Math.PI*2);
    const capM=new THREE.MeshLambertMaterial({color:s.c2});
    mat=[new THREE.MeshLambertMaterial({map:tex}),capM,capM];
  }
  const im=new THREE.InstancedMesh(geo,mat,P.length);
  const d=new THREE.Object3D();
  P.forEach((p,i)=>{d.position.set(p.x,p.y,p.z);d.rotation.set(0,s.shape.match(/box/)?0:p.ry,0);
    if(sh[0]==='cyl')d.rotation.y=p.ry; else d.rotation.y=p.ry;
    d.updateMatrix();im.setMatrixAt(i,d.matrix);im.setColorAt(i,white)});
  im.instanceColor.needsUpdate=true;
  im.userData.sku=s;scene.add(im);productMeshes.push(im);
  s.geo=geo;s.mat=mat;s.im=im;
  s.thumb=thumbFor(s);
});

/* aisle signs at both ends */
CATS.forEach((c,i)=>{
  const t=signTex(c.n,c.title,c.sub);
  hangSign(t,4.3,.92,AISLES[i],3.55,Z0+2.4,0);
  hangSign(t,4.3,.92,AISLES[i],3.55,Z1-2.4,Math.PI);
});
// end-cap labels facing the front cross aisle
// back wall banner
{
  const t=canvasTex(2048,300,(x,W,H)=>{x.fillStyle=C.blue;x.fillRect(0,0,W,H);x.fillStyle=C.red;x.fillRect(0,H-26,W,26);
    x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';x.font='800 170px "Barlow Condensed", sans-serif';x.fillText('EVERYDAY ESSENTIALS',W/2,H*.44)});
  const m=new THREE.Mesh(new THREE.PlaneGeometry(16,2.35),new THREE.MeshBasicMaterial({map:t}));m.position.set(0,3.55,-28.85);scene.add(m);
  const t2=canvasTex(1024,300,(x,W,H)=>{x.fillStyle='#fff';x.fillRect(0,0,W,H);x.fillStyle=C.deep;x.textAlign='center';x.textBaseline='middle';
    x.font='800 150px "Barlow Condensed", sans-serif';x.fillText('Basko',W/2,H*.42);x.fillStyle=C.red;x.font='700 40px "Figtree", sans-serif';x.fillText('FRESH FOOD · EVERYDAY ESSENTIALS',W/2,H*.8)});
  hangSign(t2,4.8,1.4,0,3.4,-22.6,0);
}
// promo sign near entrance
{
  const t=canvasTex(800,300,(x,W,H)=>{x.fillStyle=C.red;x.fillRect(0,0,W,H);x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';
    x.font='800 120px "Barlow Condensed", sans-serif';x.fillText('LOW PRICES',W/2,H*.38);x.font='700 64px "Barlow Condensed", sans-serif';x.fillText('EVERY DAY',W/2,H*.76)});
  const fm=new THREE.MeshLambertMaterial({map:t});
  [[7.5,12.4],[-7.5,12.4]].forEach(p=>{const b=new THREE.Mesh(new THREE.BoxGeometry(2.4,.9,.06),[mats.red,mats.red,mats.red,mats.red,fm,fm]);b.position.set(p[0],3.3,p[1]);b.rotation.y=Math.PI;scene.add(b)});
}
/* checkouts */
[-12,-6,6,12].forEach((x,i)=>{
  const g=new THREE.Group();
  box(.95,.9,3.4,mats.white,0,.45,0,g);box(1,.05,3.45,mats.blue,0,.92,0,g);box(.6,.03,2.2,mats.dark,-.1,.96,.5,g);
  box(.04,.36,.5,mats.dark,.32,1.12,-1.1,g);box(.5,.5,.5,mats.blue,0,.25,-1.9,g);
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,2.2,8),mats.steel);pole.position.set(.4,2,-1.5);g.add(pole);
  const lt=canvasTex(256,256,(c,W,H)=>{c.fillStyle=C.blue;c.fillRect(0,0,W,H);c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.font='800 170px "Barlow Condensed", sans-serif';c.fillText(String(i+1),W/2,H*.55)});
  const lm=new THREE.MeshLambertMaterial({map:lt});
  const cube=new THREE.Mesh(new THREE.BoxGeometry(.5,.5,.5),[lm,lm,mats.blue,mats.blue,lm,lm]);cube.position.set(.4,3.2,-1.5);g.add(cube);
  g.position.set(x,0,17);scene.add(g);
});
// trolleys near the door
for(let i=0;i<5;i++){const g=new THREE.Group();box(.55,.45,.85,new THREE.MeshLambertMaterial({color:C.blue,transparent:true,opacity:.8}),0,.75,0,g);
  box(.5,.04,.04,mats.red,0,1.05,.46,g);g.position.set(-19.2,0,25-i*.32);scene.add(g)}
// produce-style crates along the left wall
for(let z=-14;z<=6;z+=2.5){box(1.6,.8,2.2,mats.blue,-22.6,.4,z);
  const fruit=['#E63946','#F4A261','#8AC926','#FFCA3A','#6A994E'][Math.abs(Math.round(z))%5];
  box(1.4,.18,2,M(fruit),-22.6,.88,z)}

/* ---------- staff name boards, scattered at random each visit ---------- */
function nameTex(name,label){
  return canvasTex(768,300,(x,W,H)=>{
    x.fillStyle='#fff';x.fillRect(0,0,W,H);x.fillStyle=C.blue;x.fillRect(0,0,W,70);x.fillStyle=C.red;x.fillRect(0,H-14,W,14);
    x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff';x.font='700 36px "Figtree", sans-serif';x.fillText(label.toUpperCase(),W/2,37);
    let fs=128;x.font=`800 ${fs}px "Barlow Condensed", sans-serif`;
    while(x.measureText(name.toUpperCase()).width>W*.9&&fs>40){fs-=4;x.font=`800 ${fs}px "Barlow Condensed", sans-serif`}
    x.fillStyle=C.deep;x.fillText(name.toUpperCase(),W/2,H*.58);
  });
}
{
  const spots=[];
  GONDOLAS.forEach(gx=>{spots.push([gx,1.5,Z0+.115,0,1]);spots.push([gx,1.5,Z1-.115,Math.PI,1])});
  [-20,-2,14].forEach(z=>{spots.push([-23.88,4,z,Math.PI/2,2]);spots.push([23.88,4,z,-Math.PI/2,2])});
  [-12,-6,6,12].forEach(x=>spots.push([x+.48,.55,17,Math.PI/2,.75]));
  for(let i=spots.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[spots[i],spots[j]]=[spots[j],spots[i]]}
  const names=['Vineeth Boddu','Navdeep Reddy'];
  const labels=['Store crew','Aisle captain','Fresh picks by','Shift lead','Team Basko','Shopper of the week'];
  spots.slice(0,8).forEach((p,k)=>{
    const m=new THREE.Mesh(new THREE.PlaneGeometry(1.25*p[4],.49*p[4]),new THREE.MeshLambertMaterial({map:nameTex(names[k%2],labels[Math.floor(Math.random()*labels.length)])}));
    m.position.set(p[0],p[1],p[2]);m.rotation.y=p[3];scene.add(m);
  });
}

/* ---------- trolleys that hold real products ---------- */
const wireTex=canvasTex(128,128,(x,W,H)=>{x.clearRect(0,0,W,H);x.strokeStyle='#AEB8C6';x.lineWidth=7;
  for(let i=0;i<=W;i+=32){x.beginPath();x.moveTo(i,0);x.lineTo(i,H);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(W,i);x.stroke()}});
wireTex.wrapS=wireTex.wrapT=THREE.RepeatWrapping;wireTex.repeat.set(3,2);
const wireMat=new THREE.MeshLambertMaterial({map:wireTex,alphaTest:.5,side:THREE.DoubleSide});
function makeBasket(B,rim=mats.blue){
  const g=new THREE.Group();const {w,h,d}=B;
  const wall=(pw,ph,x,y,z,rx,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(pw,ph),wireMat);m.position.set(x,y,z);m.rotation.set(rx,ry,0);g.add(m)};
  wall(w,h,0,0,d/2,0,0);wall(w,h,0,0,-d/2,0,0);wall(d,h,w/2,0,0,0,Math.PI/2);wall(d,h,-w/2,0,0,0,Math.PI/2);wall(w,d,0,-h/2,0,-Math.PI/2,0);
  box(w+.03,.025,.025,rim,0,h/2,d/2,g);box(w+.03,.025,.025,rim,0,h/2,-d/2,g);
  box(.025,.025,d+.03,rim,w/2,h/2,0,g);box(.025,.025,d+.03,rim,-w/2,h/2,0,g);
  const items=new THREE.Group();items.position.y=-h/2;g.add(items);g.userData.items=items;
  return g;
}
const maxDim=s=>{const sh=SHAPES[s.shape];return sh[0]==='box'?Math.max(sh[1],sh[2],sh[3]):Math.max(sh[1]*2,sh[2])};
const fit=(s,B)=>Math.min(1,Math.min(B.w,B.d)/3*.95/maxDim(s));
// slot k inside a basket, in the basket's items-group space (origin at the basket floor)
function basketSlot(k,B,s,out){
  k=Math.max(0,k)%27;const h=SHAPES[s.shape][2]*fit(s,B);
  return out.set((k%3-1)*B.w/3,.012+Math.floor(k/9)*.1+h/2,(Math.floor(k/3)%3-1)*B.d/3);
}

// the visitor's own trolley rides along at the bottom of the view
scene.add(camera);
const PB={w:.56,h:.32,d:.6};
const myTrolley=new THREE.Group();camera.add(myTrolley);
const myRim=M(C.blue);
const myBasket=makeBasket(PB,myRim);myBasket.position.set(0,-.5,-1.2);myTrolley.add(myBasket);
// generous invisible target: anything dropped over the basket lands in it
const dropZone=new THREE.Mesh(new THREE.BoxGeometry(.8,.7,.9),new THREE.MeshBasicMaterial({visible:false}));
dropZone.position.set(0,-.45,-1.2);myTrolley.add(dropZone);
{const hb=new THREE.Mesh(new THREE.CylinderGeometry(.014,.014,.62,10),mats.red);hb.rotation.z=Math.PI/2;hb.position.set(0,-.36,-.8);myTrolley.add(hb);
  [-.28,.28].forEach(x=>box(.02,.02,.12,mats.steel,x,-.35,-.86,myTrolley))}

// products flying from a shelf into a basket
const flights=[];const fv=new THREE.Vector3();
// pass `mesh` to keep flying one that is already in the scene (a dropped product)
function fly(s,from,ry,to,endScale,onLand,mesh,dur=.8,arc=.45){
  const m=mesh||new THREE.Mesh(s.geo,s.mat);if(!mesh){m.position.copy(from);m.rotation.y=ry;scene.add(m)}
  flights.push({m,from:from.clone(),to,start:m.scale.x,end:endScale,t:0,dur:reduce?.25:dur,arc,spin:mesh?0:(Math.random()-.5)*5,onLand});
}
function updateFlights(dt){
  for(let i=flights.length-1;i>=0;i--){const f=flights[i];f.t=Math.min(1,f.t+dt/f.dur);const e=ss(f.t);
    fv.lerpVectors(f.from,f.to(),e);fv.y+=Math.sin(Math.PI*e)*f.arc;f.m.position.copy(fv);
    f.m.scale.setScalar(f.start+(f.end-f.start)*e);f.m.rotation.y+=f.spin*dt;
    if(f.t>=1){scene.remove(f.m);flights.splice(i,1);f.onLand&&f.onLand(f)}}
}

// taking an instance off the shelf hides it; putting it back restores it
const zeroM=new THREE.Matrix4().makeScale(0,0,0);const dI=new THREE.Object3D();
const takenAt=SKUS.map(()=>new Set());
function hideInst(s,i){takenAt[s.id].add(i);s.im.setMatrixAt(i,zeroM);s.im.instanceMatrix.needsUpdate=true;
  if(hovered&&hovered.mesh===s.im&&hovered.id===i){setGlow(hovered,false);hovered=null;$('tip').hidden=true}}
function showInst(s,i){takenAt[s.id].delete(i);const p=placements[s.id][i];
  dI.position.set(p.x,p.y,p.z);dI.rotation.set(0,p.ry,0);dI.updateMatrix();s.im.setMatrixAt(i,dI.matrix);s.im.instanceMatrix.needsUpdate=true}

/* ---------- shoppers pushing trolleys round the aisles ---------- */
function tagTex(name){
  return canvasTex(512,128,(x,W,H)=>{x.fillStyle=C.blue;roundRect(x,4,4,W-8,H-8,(H-8)/2);x.fill();
    x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';x.font='800 70px "Barlow Condensed", sans-serif';x.fillText(name.toUpperCase(),W/2,H/2+3)});
}
function makeShopper(o){
  const root=new THREE.Group(),body=new THREE.Group();root.add(body);
  const sk=M(o.skin),sh=M(o.shirt),pa=M(o.pants);
  const leg=x=>{const p=new THREE.Group();p.position.set(x,.86,0);box(.13,.8,.15,pa,0,-.42,0,p);box(.14,.07,.24,mats.dark,0,-.83,.04,p);body.add(p);return p};
  const arm=x=>{const p=new THREE.Group();p.position.set(x,1.4,0);box(.1,.52,.11,sh,0,-.24,0,p);box(.09,.09,.09,sk,0,-.53,0,p);body.add(p);return p};
  o.legs=[leg(-.09),leg(.09)];o.arms=[arm(-.25),arm(.25)];
  box(.4,.58,.24,sh,0,1.15,0,body);box(.08,.08,.08,sk,0,1.47,0,body);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.13,16,12),sk);head.position.y=1.6;body.add(head);
  const hair=new THREE.Mesh(new THREE.SphereGeometry(.137,16,8,0,Math.PI*2,0,Math.PI*.5),M(o.hair));hair.position.set(0,1.62,-.01);body.add(hair);
  const tag=new THREE.Sprite(new THREE.SpriteMaterial({map:tagTex(o.name)}));tag.scale.set(.9,.225,1);tag.position.y=2.02;body.add(tag);
  // trolley in front of them
  const tr=new THREE.Group();tr.position.z=.42;root.add(tr);
  o.B={w:.5,h:.36,d:.72};o.basket=makeBasket(o.B);o.basket.position.set(0,.82,.42);tr.add(o.basket);
  const hb=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.58,10),mats.red);hb.rotation.z=Math.PI/2;hb.position.set(0,1.02,0);tr.add(hb);
  [-.26,.26].forEach(x=>{box(.025,.98,.025,mats.steel,x,.53,.02,tr);box(.025,.62,.025,mats.steel,x*.85,.33,.76,tr)});
  box(.46,.02,.62,mats.steel,0,.2,.4,tr);
  const wg=new THREE.CylinderGeometry(.05,.05,.04,12);
  [[-.2,.06],[.2,.06],[-.2,.76],[.2,.76]].forEach(p=>{const w=new THREE.Mesh(wg,mats.dark);w.rotation.z=Math.PI/2;w.position.set(p[0],.05,p[1]);tr.add(w)});
  o.root=root;o.body=body;scene.add(root);return o;
}
const ZMIN=Z1+1.5,ZMAX=Z0-1.5;
const shoppers=[
  {name:'Vineeth Boddu',aisle:1,side:1,z:2,dir:-1,shirt:'#E3262B',pants:'#2B3A55',skin:'#B98563',hair:'#1E1A17'},
  {name:'Navdeep Reddy',aisle:3,side:-1,z:-14,dir:1,shirt:'#1FA36B',pants:'#3A3F4A',skin:'#A8754F',hair:'#14110F'},
].map(o=>{makeShopper(o);o.x=AISLES[o.aisle]+o.side*1.3;o.heading=o.dir<0?Math.PI:0;o.state='walk';o.t=0;o.phase=0;o.items=0;
  o.next=o.z+o.dir*(1.5+Math.random()*2.5);return o});
const angle=a=>Math.atan2(Math.sin(a),Math.cos(a));
const sv=new THREE.Vector3();
function shopperPick(o){
  const ax=AISLES[o.aisle],c=[];
  c_skus(o.aisle).forEach(s=>placements[s.id].forEach((p,i)=>{
    if(!takenAt[s.id].has(i)&&Math.sign(p.x-ax)===o.side&&Math.abs(p.z-o.z)<1&&p.y<1.8)c.push([s,i,p])}));
  if(!c.length)return;
  const [s,i,p]=c[Math.floor(Math.random()*c.length)];
  hideInst(s,i);setTimeout(()=>showInst(s,i),30000);
  const k=o.items++,items=o.basket.userData.items;
  fly(s,sv.set(p.x,p.y,p.z),p.ry,()=>items.localToWorld(basketSlot(k,o.B,s,new THREE.Vector3())),fit(s,o.B),f=>{
    items.add(f.m);basketSlot(k,o.B,s,f.m.position);f.m.rotation.set(0,Math.random()-.5,0);f.m.scale.setScalar(fit(s,o.B))});
}
function updateShoppers(dt){
  shoppers.forEach(o=>{
    const [la,ra]=o.arms,shelfArm=o.side>0?(o.heading===0?ra:la):(o.heading===0?la:ra);
    if(o.state==='walk'){
      o.z+=o.dir*.85*dt;o.phase+=dt*7;
      o.legs[0].rotation.x=Math.sin(o.phase)*.45;o.legs[1].rotation.x=-Math.sin(o.phase)*.45;
      la.rotation.x=ra.rotation.x=-.83;o.body.rotation.y*=.85;
      if(o.z<ZMIN||o.z>ZMAX){o.z=Math.max(ZMIN,Math.min(ZMAX,o.z));o.state='turn';o.t=0;o.from=o.heading}
      else if(o.dir*(o.z-o.next)>=0){o.state='pick';o.t=0;o.picked=false}
    }else if(o.state==='turn'){
      o.t=Math.min(1,o.t+dt/1.1);o.heading=o.from+Math.PI*ss(o.t);o.legs.forEach(l=>l.rotation.x*=.85);
      if(o.t>=1){o.dir=-o.dir;o.heading=o.dir<0?Math.PI:0;
        if(o.items>=9){const it=o.basket.userData.items;while(it.children.length)it.remove(it.children[0]);o.items=0}
        o.next=o.z+o.dir*(1.5+Math.random()*2.5);o.state='walk'}
    }else{
      o.t+=dt;o.legs.forEach(l=>l.rotation.x*=.85);
      const face=o.t<1.25?angle(o.side*Math.PI/2-o.heading):0;
      o.body.rotation.y+=(face-o.body.rotation.y)*Math.min(1,dt*8);
      const reach=o.t>.35&&o.t<1.05;
      shelfArm.rotation.x+=((reach?-1.55:-.83)-shelfArm.rotation.x)*Math.min(1,dt*10);
      if(o.t>.6&&!o.picked){o.picked=true;shopperPick(o)}
      if(o.t>1.7){o.state='walk';o.next=o.z+o.dir*(1.5+Math.random()*2.5)}
    }
    o.root.position.set(o.x,0,o.z);o.root.rotation.y=o.heading;o.root.updateMatrixWorld(true);
  });
}

/* ---------- camera route ---------- */
const Y=1.62;const K=[];const STOPS=[];
function key(p,l,stop){if(stop)STOPS.push({i:K.length,...stop});K.push({p:new THREE.Vector3(...p),l:new THREE.Vector3(...l)})}
key([0,2.1,27.5],[0,1.5,4],{n:'',t:'Entrance'});
key([0,1.8,20.5],[-6,1.4,8]);
AISLES.forEach((x,i)=>{
  const fwd=i%2===0;const d=fwd?-1:1;const zs=fwd?10:-22;const ze=fwd?-22:10;
  const leftX=x+(fwd?-1:1)*2.3, rightX=x-(fwd?-1:1)*2.3;
  key([x,Y,zs],[x,1.45,zs+d*16],{n:CATS[i].n,t:CATS[i].title.split(' &')[0]});
  key([x,Y,zs+d*7],[leftX,1.1,zs+d*12]);
  key([x,Y,zs+d*15],[rightX,1.1,zs+d*20]);
  key([x,Y,zs+d*24],[leftX,1.3,zs+d*29]);
  key([x,Y,ze],[x+6,1.5,ze]);
});
key([18,Y,-22],[18,1.5,10]);
key([18,Y,9],[6,1.4,15]);
key([3,1.85,10.5],[-2,1.0,17],{n:'',t:'Checkout'});
const LAST=K.length-1;

let prog=0,target=0,yaw=0,pitch=0,tYaw=0,tPitch=0;
const ss=t=>t*t*(3-2*t);
const tmpP=new THREE.Vector3(),tmpL=new THREE.Vector3();
function placeCamera(){
  const i=Math.min(Math.floor(prog),LAST-1),f=ss(Math.min(1,prog-i));
  tmpP.lerpVectors(K[i].p,K[i+1].p,f);tmpL.lerpVectors(K[i].l,K[i+1].l,f);
  camera.position.copy(tmpP);camera.lookAt(tmpL);camera.rotateY(yaw);camera.rotateX(pitch);
}
function goTo(v){target=Math.max(0,Math.min(LAST,v));tYaw=0;tPitch=0}

/* ---------- dock ---------- */
const chips=$('chips');
STOPS.forEach((s,k)=>{const b=document.createElement('button');b.className='chip';b.type='button';
  b.innerHTML=(s.n?`<span class="n">${s.n}</span>`:'')+`<span class="t">${s.t}</span>`;
  b.onclick=()=>goTo(s.i);s.el=b;chips.appendChild(b)});
let activeStop=-1;
function updateStop(){let a=0;STOPS.forEach((s,k)=>{if(prog>=s.i-.5)a=k});
  if(a!==activeStop){activeStop=a;STOPS.forEach((s,k)=>s.el.classList.toggle('on',k===a));
    STOPS[a].el.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});
    const s=STOPS[a];$('where').textContent=s.n?`Aisle ${s.n} · ${s.t}`:s.t}}
function nextKey(dir){
  const cur=Math.round(target);
  if(dir>0){const n=STOPS.find(s=>s.i>cur+.01);goTo(n?n.i:LAST)}
  else{const p=[...STOPS].reverse().find(s=>s.i<cur-.01);goTo(p?p.i:0)}
}
$('nextBtn').onclick=()=>nextKey(1);$('prevBtn').onclick=()=>nextKey(-1);

/* ---------- input ---------- */
const overlayOpen=()=>!$('drawer').hidden||!$('intro').hidden;
addEventListener('wheel',e=>{if(overlayOpen())return;if(e.target.closest('.chips,.dock,.pcard'))return;e.preventDefault();
  const dy=(e.deltaMode===1?e.deltaY*16:e.deltaY);target=Math.max(0,Math.min(LAST,target+dy*.0022));tYaw*=.9;tPitch*=.9},{passive:false});
addEventListener('keydown',e=>{if(overlayOpen()){if(e.key==='Escape')closeDrawer();return}
  if(e.key==='ArrowUp'||e.key==='w')target=Math.min(LAST,Math.round(target)+1);
  else if(e.key==='ArrowDown'||e.key==='s')target=Math.max(0,Math.round(target)-1);
  else if(e.key==='ArrowLeft'||e.key==='a')tYaw=Math.min(1.3,tYaw+.25);
  else if(e.key==='ArrowRight'||e.key==='d')tYaw=Math.max(-1.3,tYaw-.25);
  else if(e.key==='Escape')closeCard();});

let drag=null,carry=null;
canvas.addEventListener('pointerdown',e=>{
  canvas.setPointerCapture(e.pointerId);canvas.classList.add('grabbing');
  const h=hit(e);if(h){startCarry(h,e);return}
  drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,touch:e.pointerType!=='mouse',moved:0}});
canvas.addEventListener('pointermove',e=>{
  if(carry){carry.moved+=Math.abs(e.clientX-carry.x)+Math.abs(e.clientY-carry.y);carry.x=e.clientX;carry.y=e.clientY;
    const tip=$('tip');tip.innerHTML=carry.over?'Let go to drop it in':`${carry.s.name}<span>drag to your trolley</span>`;
    tip.style.left=e.clientX+'px';tip.style.top=e.clientY+'px';tip.hidden=carry.moved<8;return}
  if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;drag.moved+=Math.abs(dx)+Math.abs(dy);
    tYaw=Math.max(-1.3,Math.min(1.3,tYaw+dx*.004));
    if(drag.touch){target=Math.max(0,Math.min(LAST,target-dy*.011))}
    else tPitch=Math.max(-.55,Math.min(.5,tPitch+dy*.003));
    $('tip').hidden=true;return}
  if(e.pointerType==='mouse')hover(e);
});
const endDrag=e=>{canvas.classList.remove('grabbing');if(carry){endCarry(false);return}
  if(!drag)return;const click=drag.moved<8;drag=null;if(click)pick(e)};
canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',()=>{drag=null;if(carry)endCarry(true);canvas.classList.remove('grabbing')});

/* ---------- carrying a product from the shelf to the trolley ---------- */
const cv=new THREE.Vector3();
function startCarry(h,e){
  const s=h.mesh.userData.sku,i=h.id,p=placements[s.id][i];
  setGlow(h,false);hovered=null;hideInst(s,i);closeCard();
  const m=new THREE.Mesh(s.geo,s.mat);m.position.set(p.x,p.y,p.z);m.rotation.y=p.ry;scene.add(m);
  carry={s,i,m,p,d0:camera.position.distanceTo(m.position),t:0,moved:0,x:e.clientX,y:e.clientY,over:false};
}
function updateCarry(dt){
  if(!carry)return;const c=carry;
  ndc.set(c.x/innerWidth*2-1,-(c.y/innerHeight)*2+1);ray.setFromCamera(ndc,camera);
  c.over=c.moved>=8&&ray.intersectObject(dropZone,false).length>0;
  myRim.color.set(c.over?'#1FA36B':C.blue);
  if(c.moved<8)return;
  // the product follows the pointer, coming closer and shrinking toward trolley size
  c.t=Math.min(1,c.t+dt*3);const e=ss(c.t);
  ray.ray.at(c.d0+(1.15-c.d0)*e,cv);c.m.position.lerp(cv,Math.min(1,dt*18));
  c.m.scale.setScalar(1+(fit(c.s,PB)*1.25-1)*e);
  c.m.quaternion.slerp(camera.quaternion,Math.min(1,dt*6));
}
function endCarry(cancel){
  const c=carry;carry=null;$('tip').hidden=true;myRim.color.set(C.blue);
  if(!cancel&&c.moved<8){scene.remove(c.m);showInst(c.s,c.i);openCard(c.s);return}
  if(!cancel&&c.over){addToCart(c.s.id,1,c);toast(`${c.s.name} is in your trolley`);return}
  // missed the trolley: it goes back where it came from
  const home=new THREE.Vector3(c.p.x,c.p.y,c.p.z);
  fly(c.s,c.m.position,0,()=>home,1,()=>showInst(c.s,c.i),c.m,.5,.15);
}

const ray=new THREE.Raycaster();ray.far=8;const ndc=new THREE.Vector2();
let hovered=null;
function hit(e){ndc.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);ray.setFromCamera(ndc,camera);
  const h=ray.intersectObjects(productMeshes,false)[0];return h?{mesh:h.object,id:h.instanceId}:null}
function setGlow(h,on){if(!h)return;h.mesh.setColorAt(h.id,on?glow:white);h.mesh.instanceColor.needsUpdate=true}
function hover(e){
  const h=hit(e);
  if(hovered&&(!h||h.mesh!==hovered.mesh||h.id!==hovered.id)){setGlow(hovered,false);hovered=null}
  const tip=$('tip');
  if(h){if(!hovered){hovered=h;setGlow(h,true)}const s=h.mesh.userData.sku;
    tip.innerHTML=`${s.name}<span>₹${s.price}</span>`;tip.style.left=e.clientX+'px';tip.style.top=e.clientY+'px';tip.hidden=false;canvas.classList.add('pointing')}
  else{tip.hidden=true;canvas.classList.remove('pointing')}
}
let cardSku=null;
function pick(e){if(!hit(e))closeCard()}
function openCard(s){cardSku=s;$('cardImg').src=s.thumb;$('cardImg').alt=s.name;
  $('cardCat').textContent=`Aisle ${CATS[s.cat].n} · ${CATS[s.cat].title}`;$('cardName').textContent=s.name;
  $('cardMeta').textContent=`${s.brand} · ${s.size}`;$('cardPrice').innerHTML=`₹${s.price}<small>incl. taxes</small>`;
  const c=$('card');c.hidden=true;void c.offsetWidth;c.hidden=false}
function closeCard(){$('card').hidden=true;cardSku=null}
$('cardClose').onclick=closeCard;

/* ---------- cart ---------- */
let cart={};
try{cart=JSON.parse(localStorage.getItem('basko-cart')||'{}')||{}}catch(e){cart={}}
const save=()=>{try{localStorage.setItem('basko-cart',JSON.stringify(cart))}catch(e){}};
const fmt=n=>'₹'+n.toLocaleString('en-IN');
// one entry per unit in the trolley, in the order they went in
let units=[];Object.keys(cart).forEach(id=>{if(SKUS[id])for(let n=0;n<cart[id];n++)units.push({id:+id,flying:false})});
const playerTaken=SKUS.map(()=>[]);
function renderTrolley(){
  const g=myBasket.userData.items;while(g.children.length)g.remove(g.children[0]);
  units.slice(0,27).forEach((u,k)=>{if(u.flying)return;const s=SKUS[u.id];
    const m=new THREE.Mesh(s.geo,s.mat);basketSlot(k,PB,s,m.position);m.scale.setScalar(fit(s,PB));m.rotation.y=((k*.37)%.6)-.3;g.add(m)});
}
// `drop` is a product carried off the shelf: it settles into its slot in the basket
function addToCart(id,q,drop){id=+id;cart[id]=(cart[id]||0)+q;if(cart[id]<=0)delete cart[id];save();
  if(q>0){const u={id,flying:!!drop};units.push(u);
    if(drop){const s=SKUS[id],items=myBasket.userData.items;playerTaken[id].push(drop.i);
      fly(s,drop.m.position,0,()=>items.localToWorld(basketSlot(units.indexOf(u),PB,s,new THREE.Vector3())),fit(s,PB),()=>{u.flying=false;renderTrolley()},drop.m,.35,.08)}}
  else{for(let j=units.length-1;j>=0;j--)if(units[j].id===id){units.splice(j,1);break}
    const i=playerTaken[id].pop();if(i!=null)showInst(SKUS[id],i)}
  renderCart();renderTrolley();
  const b=$('cartBtn');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}
function renderCart(){
  const ids=Object.keys(cart).filter(id=>SKUS[id]);let count=0,total=0;
  ids.forEach(id=>{count+=cart[id];total+=cart[id]*SKUS[id].price});
  $('cartCount').textContent=count;$('cartSum').textContent=count?fmt(total):'Empty';$('drTotal').textContent=fmt(total);
  $('checkoutBtn').disabled=!count;
  $('drNote').textContent=total>=499||!count?(count?'You get free delivery':'Free delivery on orders over ₹499'):`Add ${fmt(499-total)} more for free delivery`;
  const list=$('drList');list.innerHTML='';
  if(!count){list.innerHTML='<p class="empty">Your cart is empty.<br>Walk the aisles and tap any product to add it.</p>';return}
  ids.forEach(id=>{const s=SKUS[id];const row=document.createElement('div');row.className='line';
    row.innerHTML=`<img src="${s.thumb}" alt=""><div><div class="line-name">${s.name}</div><div class="line-meta">${s.brand} · ${s.size} · ${fmt(s.price*cart[id])}</div></div>
    <div class="qty"><button type="button" aria-label="Remove one">−</button><span>${cart[id]}</span><button type="button" aria-label="Add one">+</button></div>`;
    const [m,p]=row.querySelectorAll('button');m.onclick=()=>addToCart(id,-1);p.onclick=()=>addToCart(id,1);list.appendChild(row)});
}
function openDrawer(){$('drawer').hidden=false;$('scrim').hidden=false;closeCard()}
function closeDrawer(){$('drawer').hidden=true;$('scrim').hidden=true}
$('cartBtn').onclick=openDrawer;$('drawerClose').onclick=closeDrawer;$('scrim').onclick=closeDrawer;
$('checkoutBtn').onclick=()=>{cart={};save();units=[];
  playerTaken.forEach((list,id)=>{while(list.length)showInst(SKUS[id],list.pop())});
  renderCart();renderTrolley();$('drNote').textContent='Order placed. This is a demo store, so nothing will be charged or delivered.'};
renderCart();renderTrolley();

let toastT;function toast(m){const t=$('toast');t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,1800)}

/* intro */
let seen=false;try{seen=localStorage.getItem('basko-intro')==='1'}catch(e){}
$('intro').hidden=seen;
$('introGo').onclick=()=>{$('intro').hidden=true;try{localStorage.setItem('basko-intro','1')}catch(e){};if(target<1)goTo(STOPS[1].i)};
$('helpBtn').onclick=()=>{$('intro').hidden=false};

/* ---------- loop ---------- */
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.fov=innerWidth<innerHeight?74:62;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
dispatchEvent(new Event('resize'));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clock=new THREE.Clock();
function frame(){
  const k=reduce?.25:.055,dt=Math.min(.05,clock.getDelta());
  prog+=(target-prog)*k;if(Math.abs(target-prog)<1e-4)prog=target;
  yaw+=(tYaw-yaw)*.12;pitch+=(tPitch-pitch)*.12;
  placeCamera();camera.updateMatrixWorld(true);updateShoppers(dt);updateCarry(dt);updateFlights(dt);
  updateStop();renderer.render(scene,camera);requestAnimationFrame(frame);
}
$('loading').hidden=true;
frame();
})();
