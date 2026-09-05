"use client";
import { useEffect, useRef, useState } from 'react';
export type SofaKind='modular'|'chaise'|'lounge'|'beanbag'|'sectional'|'ottoman';
type Props={color:string;kind:SofaKind;exploded?:boolean;wireframe?:boolean;resetKey?:number;fallback?:string;language?:string};
/** Procedural concept model, not a scan or manufacturing-accurate digital twin. */
export default function SofaScene({color,kind,exploded=false,wireframe=false,resetKey=0,fallback,language="en"}:Props){
 const mount=useRef<HTMLDivElement>(null);const actions=useRef<{zoom:(factor:number)=>void;rotate:(angle:number)=>void;reset:()=>void}|null>(null);const label=(en:string,zh:string,de:string,fr:string)=>({en,zh,de,fr}[language]||en);const [status,setStatus]=useState<'loading'|'ready'|'fallback'>('loading');
 useEffect(()=>{let cancelled=false;let cleanup=()=>{};setStatus('loading');
  async function initialize(){
   const THREE=await import('three');const {OrbitControls}=await import('three/addons/controls/OrbitControls.js');const {RoundedBoxGeometry}=await import('three/addons/geometries/RoundedBoxGeometry.js');
   if(cancelled||!mount.current)return;const host=mount.current;
   let renderer:InstanceType<typeof THREE.WebGLRenderer>;
   try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});}catch{setStatus('fallback');return;}
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Concept sofa model. Arrow keys rotate or zoom. Plus and minus zoom.');renderer.domElement.tabIndex=0;
   const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(33,1,.1,100);camera.position.set(4.3,3.5,5.7);
   const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,.48,0);controls.enablePan=false;controls.enableDamping=true;controls.minDistance=3.8;controls.maxDistance=10;controls.minPolarAngle=.35;controls.maxPolarAngle=Math.PI/2.12;controls.enableZoom=true;controls.update();
   scene.add(new THREE.HemisphereLight(0xffffff,0x7b8f9f,3));const key=new THREE.DirectionalLight(0xfff5e5,5);key.position.set(-3,7,4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.normalBias=.04;key.shadow.bias=-.0002;key.shadow.radius=5;scene.add(key);const fill=new THREE.DirectionalLight(0xe5efff,2);fill.position.set(5,3,-2);scene.add(fill);
   const tc=document.createElement('canvas');tc.width=128;tc.height=128;const ctx=tc.getContext('2d')!;ctx.fillStyle='#888';ctx.fillRect(0,0,128,128);for(let x=0;x<128;x+=4){ctx.fillStyle=x%8===0?'#a0a0a0':'#737373';ctx.fillRect(x,0,2,128);}const texture=new THREE.CanvasTexture(tc);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(5,5);
   const fabric=new THREE.MeshStandardMaterial({color,roughness:.96,bumpMap:texture,bumpScale:.018,wireframe});const seamMaterial=new THREE.MeshStandardMaterial({color:new THREE.Color(color).multiplyScalar(.82),roughness:1,wireframe});
   const sofa=new THREE.Group();sofa.rotation.y=-.12;scene.add(sofa);const spread=exploded?.3:0;
   const box=(w:number,h:number,d:number,x:number,y:number,z:number,r=.13,mat=fabric)=>{const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,5,r),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;sofa.add(mesh);return mesh;};
   const cushion=(w:number,d:number,x:number,z:number)=>{box(w,.26,d,x,.36+spread,z,.12);box(w-.07,.014,d-.07,x,.31+spread,z,.006,seamMaterial);};
   if(kind==='modular'||kind==='sectional'){
    for(let i=0;i<3;i++){const x=(i-1)*(.79+spread);box(.8,.28,.85,x,.18,0);cushion(.79,.82,x,0);box(.79,.48,.22,x,.68+spread*2,-.34-spread,.1);}
    box(.23,.49,.87,-1.2-spread,.42,0);box(.23,.49,.87,1.2+spread,.42,0);box(.34,.32,.16,-.91-spread,.64,-.13,.07).rotation.z=.14;box(.34,.32,.16,.91+spread,.64,-.13,.07).rotation.z=-.14;
    const ox=kind==='sectional'?-.8:.42,oz=kind==='sectional'?.79:1.14;box(.79,.28,.75,ox+spread,.18,oz+spread);cushion(.79,.74,ox+spread,oz+spread);
   }else if(kind==='chaise'){
    box(1.2,.28,1.65,0,.18,0);cushion(1.05,1.5,0,.05);box(1.18,.48,.25,0,.68+spread,-.7,.1);for(const x of [-.58,.58])box(.23,.42,1.5,x,.47,0);for(const x of [-.27,.27])box(.45,.35,.2,x,.65,-.44,.1).rotation.x=-.12;
   }else if(kind==='ottoman'){box(.94,.3,.74,0,.18,0);cushion(.94,.74,0,0);
   }else if(kind==='beanbag'){
    const base=new THREE.Mesh(new THREE.SphereGeometry(.56,48,32),fabric);base.scale.set(1,.58,1.02);base.position.y=.29;sofa.add(base);base.castShadow=true;
    box(.87,.62,.36,0,.59,-.30,.17).rotation.x=-.23;box(.67,.22,.67,0,.37,.09,.1);
    for(const x of [-.39,.39]){box(.26,.39,.71,x,.42,.05,.125).rotation.z=x<0?-.13:.13;}
    for(const x of [-.22,.22])box(.36,.26,.11,x,.66,-.095,.055).rotation.x=-.23;
   }else{
    box(.90,.29,1.02,0,.19,.02,.135);box(.77,.21,.73,0,.38,.12,.10).rotation.x=.06;
    box(.85,.52,.28,0,.55,-.33,.13).rotation.x=-.27;
    for(const x of [-.39,.39]){const side=box(.23,.33,.86,x,.40,.01,.11);side.rotation.z=x<0?-.17:.17;}
    box(.70,.32,.16,0,.59,-.12,.078).rotation.x=-.30;
    for(const x of [-.25,0,.25]){box(.012,.012,.49,x,.482,.17,.005,seamMaterial);}
   }
   const ground=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.16}));ground.rotation.x=-Math.PI/2;ground.position.y=.025;ground.receiveShadow=true;scene.add(ground);
   if(kind!=='modular'&&kind!=='sectional'){camera.position.multiplyScalar(.7);controls.minDistance=2.8;controls.update();}
   const initialPosition=camera.position.clone();actions.current={zoom:(factor)=>{const offset=camera.position.clone().sub(controls.target).multiplyScalar(factor).clampLength(controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(offset);controls.update();},rotate:(angle)=>{const offset=camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0,1,0),angle);camera.position.copy(controls.target).add(offset);controls.update();},reset:()=>{camera.position.copy(initialPosition);controls.target.set(0,.48,0);controls.update();}};
   const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};const ro=new ResizeObserver(resize);ro.observe(host);resize();
   let frame=0,visible=true;function tick(){if(cancelled)return;controls.update();renderer.render(scene,camera);frame=visible&&!document.hidden?requestAnimationFrame(tick):0;}const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!frame)tick();});observer.observe(host);const wake=()=>{if(!frame&&visible&&!document.hidden)tick();};document.addEventListener('visibilitychange',wake);
   const onKey=(e:KeyboardEvent)=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','='].includes(e.key))return;e.preventDefault();const offset=camera.position.clone().sub(controls.target);if(e.key==='ArrowLeft'||e.key==='ArrowRight')offset.applyAxisAngle(new THREE.Vector3(0,1,0),e.key==='ArrowLeft'?.12:-.12);else offset.multiplyScalar(e.key==='-'||e.key==='ArrowDown'?1.1:.9);offset.clampLength(controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(offset);controls.update();wake();};renderer.domElement.addEventListener('keydown',onKey);
   controls.enableDamping=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;tick();setStatus('ready');const lost=(e:Event)=>{e.preventDefault();setStatus('fallback');};renderer.domElement.addEventListener('webglcontextlost',lost);
   cleanup=()=>{actions.current=null;cancelAnimationFrame(frame);observer.disconnect();ro.disconnect();document.removeEventListener('visibilitychange',wake);renderer.domElement.removeEventListener('keydown',onKey);renderer.domElement.removeEventListener('webglcontextlost',lost);controls.dispose();scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});texture.dispose();renderer.dispose();renderer.domElement.remove();};
  }initialize().catch(()=>{if(!cancelled)setStatus('fallback');});return()=>{cancelled=true;cleanup();};
 },[color,kind,exploded,wireframe,resetKey]);
 return <div className="scene-wrap"><div className="scene" ref={mount}>{status==='loading'&&<div className="scene-loading" role="status">{label('Loading interactive preview…','正在加载互动预览…','Interaktive Vorschau wird geladen…','Chargement de la vue interactive…')}</div>}{status==='fallback'&&<div className="scene-fallback">{fallback&&<img src={fallback} alt={label('Catalog photo','目录原图','Katalogfoto','Photo du catalogue')}/>}<p role="status">{label('3D is unavailable on this device. Catalog photo shown.','本设备无法显示3D，已显示目录照片。','3D ist auf diesem Gerät nicht verfügbar. Katalogfoto angezeigt.','3D indisponible sur cet appareil. Photo du catalogue affichée.')}</p></div>}</div><div className="scene-controls"><button disabled={status!=='ready'} aria-label={label('Rotate left','向左旋转','Nach links drehen','Tourner à gauche')} onClick={()=>actions.current?.rotate(.3)}>↶</button><button disabled={status!=='ready'} aria-label={label('Rotate right','向右旋转','Nach rechts drehen','Tourner à droite')} onClick={()=>actions.current?.rotate(-.3)}>↷</button><button disabled={status!=='ready'} aria-label={label('Zoom in','放大','Vergrößern','Agrandir')} onClick={()=>actions.current?.zoom(.85)}>＋</button><button disabled={status!=='ready'} aria-label={label('Zoom out','缩小','Verkleinern','Réduire')} onClick={()=>actions.current?.zoom(1.15)}>−</button><button disabled={status!=='ready'} onClick={()=>actions.current?.reset()}>{label('Reset','重置','Zurücksetzen','Réinitialiser')}</button></div><p className="scene-hint">{label('Drag to rotate · Pinch or scroll to zoom','拖动旋转 · 双指或滚轮缩放','Ziehen zum Drehen · Pinch oder Scrollen zum Zoomen','Glissez pour tourner · Pincez ou faites défiler pour zoomer')}</p></div>;
}
