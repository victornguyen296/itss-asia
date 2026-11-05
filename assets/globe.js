(function(){
var LAND={"step":2,"top":88,"rows":74,"cols":180,"b64":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4AP/gAAAAAAAAAAAAAAAAAAAAAAAX/z///+AAAAAAAABAAAAAAAAAAAAAYd8P///wAA+AAAAAA8AAAAAAAAAAAwAnw////4AAIAAAAAAGAAAAAAAAAAADivwAf//wAAAAADAAf/wAHYAAAAAADoi3sAP//gAAAAAMAD///sAAAAgBgACfwz/AD/+gAAA4AEHf///+/8gBAP/7/nJdjwD/+AAAH/AA7f///////f4P//////h8H/gAAAf/6//f////////Mf/////9H4D8AeAA+ev///////////AP/////4A0B4AAAD5/////////////Af3////gHgA4AAAH5///////////LwAHgH///gHkAAAAAH4/////////+CIAABAB///4D+AAAAGCx/////////4A8AAIAAf///n/gAAAOCD/////////wA4AAAAAf///n/wAAAbP///////////AgAAAAAP/////wAAADf//////////9AAAAAAAF////0YAAAB///////////9AAAAAAAD////8EAAAB///////////5AAAAAAAD////2AAAAB/f5fP//////wAAAAAAAD////gAAAAfxnwPP//////jAAAAAAAD////AAAAAPCb3/n/////+CAAAAAAAD///8AAAAAfALf/n////+ECAAAAAAAB///8AAAAAGHQP/n/////mMAAAAAAAA///8AAAAAH+Ai///////E8AAAAAAAAf//wAAAAAP/AA///////BgAAAAAAAAP//gAAAAAf/73///////gAAAAAAAAAD/AQAAAAAf////f/////gAAAAAAAAAF+AQAAAAB///+/n/////AAAAAAAAAAC+AAAAAAB///+f0H////AAAAAAAAAAAeAwAAAAD////f/B///8gAAAAAAAAAAeGEAAAAH////v+B/z/AAAAAAAAAAAAPMAgAAAD////n+A/B+gAAAAAAAAAAAD8AAAAAD////n4AeB/AgAAAAAAAAAAAPAAAAAH////3gAcAfAgAAAAAAAAAAADAAAAAD////6AAcAfggAAAAAAAAAAABDwAAAD////8wAMATAIAAAAAAAAAAAAr/AAAB/////gAKASAAAAAAAAAAAAAAH/gAAA/////gACAAAIAAAAAAAAAAAAH/8AAAaH///AAAAsGAAAAAAAAAAAAAH/+AAAAB//+AAAAUOAAAAAAAAAAAAAP/+AAAAB//8AAAAYegAAAAAAAAAAAAP//gAAAD//4AAAAMeBgAAAAAAAAAAAP//8AAAB//wAAAAGdiuAAAAAAAAAAAf///AAAA//wAAAACAQHgAAAAAAAAAAP///gAAA//wAAAABwAHwgAAAAAAAAAH///AAAA//wAAAAACIDQIAAAAAAAAAH//+AAAAf/wAAAAAAAAAAAAAAAAAAAD//+AAAA//wgAAAAABxAAAAAAAAAAAD//+AAAA//wgAAAAAPxgBAAAAAAAAAA//8AAAA//jgAAAAAf5gAAAAAAAAAAAf/8AAAA//DgAAAAAf/gAAAAAAAAAAAf/8AAAAf/DAAAAAD//4CAAAAAAAAAAf/wAAAAf/DAAAAAH//4AAAAAAAAAAAf/AAAAAf+CAAAAAH//8AAAAAAAAAAAf/AAAAAP8AAAAAAH//+AAAAAAAAAAA/+AAAAAP8AAAAAAH//+AAAAAAAAAAA/+AAAAAH4AAAAAAD//+AAAAAAAAAAA/8AAAAAHwAAAAAADwf8AAAAAAAAAAA/gAAAAAAAAAAAAACAH4AIAAAAAAAAB/wAAAAAAAAAAAAAAAD4AEAAAAAAAAB+AAAAAAAAAAAAAAAAAAAGAAAAAAAAB6AAAAAAAAAAAAAAAAAwAMAAAAAAAAA8AAAAAAAAAAAAAAAAAQAYAAAAAAAAB4AAAAAAAAAAAAAAAAAAAwAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAACAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"};
var cv=document.getElementById('gl');if(!cv)return;
var ctx=cv.getContext('2d'),RAD=Math.PI/180,reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
// land dots from the packed bitmap
var bin=atob(LAND.b64),bits='';for(var i=0;i<bin.length;i++){bits+=('00000000'+bin.charCodeAt(i).toString(2)).slice(-8)}
var dots=[];for(var r=0;r<LAND.rows;r++){for(var c=0;c<LAND.cols;c++){if(bits.charAt(r*LAND.cols+c)==='1'){dots.push([(LAND.top-r*LAND.step-LAND.step/2)*RAD,(-180+c*LAND.step+LAND.step/2)*RAD])}}}
var CITIES=[{n:cv.getAttribute('data-hcm')||'Ho Chi Minh City',lat:10.8231,lon:106.6297,dx:14,dy:10},{n:cv.getAttribute('data-hn')||'Hanoi',lat:21.0285,lon:105.8542,dx:14,dy:-26}];
var lam0=-30*RAD,phi0=18*RAD,TL=106.3*RAD,TP=16*RAD,W=0,H=0,R=0,dpr=1,drag=null,vx=0,vy=0,anim=null,t0=performance.now(),last=0;
function size(){var b=cv.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);W=b.width;H=b.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);R=Math.min(W,H)*0.4;draw()}
function proj(lat,lon){var dl=lon-lam0,cl=Math.cos(lat),cc=Math.sin(phi0)*Math.sin(lat)+Math.cos(phi0)*cl*Math.cos(dl);return{x:W/2+R*cl*Math.sin(dl),y:H/2-R*(Math.cos(phi0)*Math.sin(lat)-Math.sin(phi0)*cl*Math.cos(dl)),c:cc}}
function draw(){
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
 var g=ctx.createRadialGradient(W/2-R*.3,H/2-R*.35,R*.1,W/2,H/2,R*1.02);g.addColorStop(0,'#16337a');g.addColorStop(1,'#071230');
 ctx.beginPath();ctx.arc(W/2,H/2,R,0,7);ctx.fillStyle=g;ctx.fill();
 ctx.lineWidth=1.2;ctx.strokeStyle='rgba(120,170,255,.45)';ctx.stroke();
 // atmosphere glow
 var a=ctx.createRadialGradient(W/2,H/2,R,W/2,H/2,R*1.2);a.addColorStop(0,'rgba(11,95,255,.35)');a.addColorStop(1,'rgba(11,95,255,0)');ctx.beginPath();ctx.arc(W/2,H/2,R*1.2,0,7);ctx.fillStyle=a;ctx.fill();
 // land dots
 var rs=Math.max(1,R/150);
 for(var i=0;i<dots.length;i++){var p=proj(dots[i][0],dots[i][1]);if(p.c<=0)continue;ctx.globalAlpha=.25+.75*p.c;ctx.fillStyle='#9cc0ff';ctx.fillRect(p.x-rs/2,p.y-rs/2,rs,rs)}
 ctx.globalAlpha=1;
 // route between the two cities
 var A=CITIES[0],B=CITIES[1];ctx.beginPath();var on=false;
 for(var s=0;s<=24;s++){var f=s/24,la=A.lat+(B.lat-A.lat)*f,lo=A.lon+(B.lon-A.lon)*f,p2=proj(la*RAD,lo*RAD);if(p2.c>0){if(!on){ctx.moveTo(p2.x,p2.y);on=true}else ctx.lineTo(p2.x,p2.y)}else on=false}
 ctx.setLineDash([4,4]);ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1.4;ctx.stroke();ctx.setLineDash([]);
 // markers + labels
 var tm=(performance.now()-t0)/1000;
 ctx.font='600 12px "IBM Plex Mono",ui-monospace,monospace';ctx.textBaseline='middle';
 CITIES.forEach(function(ci){var p=proj(ci.lat*RAD,ci.lon*RAD);if(p.c<=0.12)return;var al=Math.min(1,(p.c-.12)*4);ctx.globalAlpha=al;
  var ph=(tm%2)/2;ctx.beginPath();ctx.arc(p.x,p.y,4+ph*14,0,7);ctx.strokeStyle='rgba(255,255,255,'+(.7*(1-ph))+')';ctx.lineWidth=1.5;ctx.stroke();
  ctx.beginPath();ctx.arc(p.x,p.y,4.5,0,7);ctx.fillStyle='#fff';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#0b5fff';ctx.stroke();
  var txt=ci.n.toUpperCase(),w=ctx.measureText(txt).width+18,bx=p.x+ci.dx,by=p.y+ci.dy;
  ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(bx,by+(ci.dy<0?13:0));ctx.stroke();
  ctx.fillStyle='#0b5fff';ctx.fillRect(bx,by,w,26);ctx.fillStyle='#fff';ctx.fillText(txt,bx+9,by+13.5);ctx.globalAlpha=1});
}
function ease(t){return 1-Math.pow(1-t,3)}
function go(l,p,ms){if(reduce){lam0=l;phi0=p;draw();return}anim={a:lam0,b:p,l:l,p0:phi0,s:performance.now(),ms:ms}}
var loop=false;
function tick(now){
 var need=false;
 if(anim){var k=Math.min((now-anim.s)/anim.ms,1),e=ease(k);var dl=anim.l-anim.a;lam0=anim.a+dl*e;phi0=anim.p0+(anim.b-anim.p0)*e;if(k>=1)anim=null;need=true}
 else if(!drag&&(Math.abs(vx)>1e-5||Math.abs(vy)>1e-5)){lam0-=vx;phi0=Math.max(-1.3,Math.min(1.3,phi0+vy));vx*=.94;vy*=.94;need=true}
 if(visible&&(need||!reduce)){draw()}
 requestAnimationFrame(tick)}
var visible=true;if('IntersectionObserver' in window){new IntersectionObserver(function(es){visible=es[0].isIntersecting}).observe(cv)}
// pointer drag to rotate
cv.addEventListener('pointerdown',function(e){drag={x:e.clientX,y:e.clientY};anim=null;vx=vy=0;cv.setPointerCapture(e.pointerId);cv.classList.add('drg')});
cv.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;var k=1/R;vx=dx*k*1.1;vy=dy*k*1.1;lam0-=vx;phi0=Math.max(-1.3,Math.min(1.3,phi0+vy))});
function up(){drag=null;cv.classList.remove('drg')}
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('keydown',function(e){var m={ArrowLeft:[.12,0],ArrowRight:[-.12,0],ArrowUp:[0,.1],ArrowDown:[0,-.1]}[e.key];if(m){e.preventDefault();lam0+=m[0];phi0=Math.max(-1.3,Math.min(1.3,phi0+m[1]));anim=null;vx=vy=0}});
var rb=document.getElementById('glr');if(rb)rb.onclick=function(){go(TL,TP,1200)};
if('ResizeObserver' in window){new ResizeObserver(size).observe(cv)}else{window.addEventListener('resize',size)}
size();
if(reduce){lam0=TL;phi0=TP;draw()}else{go(TL,TP,2600)}
requestAnimationFrame(tick);
})();
