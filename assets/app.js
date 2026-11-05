(function(){
var d=document,h=d.querySelector('header'),reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
function sc(){h.classList.toggle('sc',window.scrollY>10)}sc();window.addEventListener('scroll',sc,{passive:true});
var bg=d.getElementById('bg'),mn=d.getElementById('mn');
if(bg)bg.onclick=function(){var o=mn.classList.toggle('o');bg.setAttribute('aria-expanded',o)};
// tag content blocks for scroll reveal, staggered by position among siblings
['section .eb','section h2','section .sub','section .fq details','.pr .s','.st .sg>div','.cta .w','.ci .c','#f','.pls .pl','.ph1 .w>*','.sx .toc','footer .fg>div','.rw .rt','.rw .art','.tile','.pn'].forEach(function(q){d.querySelectorAll(q).forEach(function(el){el.classList.add('rv')})});
d.querySelectorAll('.rv').forEach(function(el){var n=0,p=el.previousElementSibling;while(p){n++;p=p.previousElementSibling}el.style.setProperty('--d',(Math.min(n,5)*.12)+'s')});
// reveal on scroll (IntersectionObserver)
var els=[].slice.call(d.querySelectorAll('.rv,.pr,[data-cnt]'));
function cnt(el){var to=parseFloat(el.getAttribute('data-cnt')),t0=null;if(reduce){el.textContent=to;return}function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1),e=1-Math.pow(1-p,4);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.hasAttribute('data-cnt'))cnt(e.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add('in');if(el.hasAttribute('data-cnt'))cnt(el)})}
// typed headline
var tp=d.querySelector('.tp');
if(tp){var full=tp.getAttribute('data-t')||tp.textContent;tp.setAttribute('aria-label',full);if(reduce){tp.classList.add('on')}else{tp.textContent='';tp.classList.add('on');var cu=d.createElement('span');cu.className='cu';var tx=d.createTextNode('');tp.appendChild(tx);tp.appendChild(cu);var i=0;setTimeout(function(){(function s(){tx.nodeValue=full.slice(0,++i);if(i<full.length)setTimeout(s,38)})()},200)}}
// sticky index highlight
var tc=[].slice.call(d.querySelectorAll('.toc a'));
if(tc.length&&'IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){tc.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-35% 0px -55% 0px'});d.querySelectorAll('.rw[id]').forEach(function(r){so.observe(r)})}
// form delivery through Web3Forms (public access key), mailto only as a fallback
var KEY='c7608842-7e01-4c55-b050-4f165b8169f6',VI=d.documentElement.lang==='vi';
var MSG={ok:VI?'Đã gửi. ITSS.asia sẽ phản hồi trong 1 ngày làm việc.':'Sent. ITSS.asia will reply within 1 business day.',err:VI?'Chưa gửi được. Vui lòng gửi trực tiếp tới hello@itss.asia.':'Could not send. Please email hello@itss.asia directly.',wait:VI?'Đang gửi...':'Sending...'};
function mail(a,b){location.href='mailto:hello@itss.asia?subject='+encodeURIComponent(a)+'&body='+encodeURIComponent(b)}
function send(fd,subject,body,form,out,done){
 if(fd.get('botcheck')){return}
 var btn=form.querySelector('button[type=submit]');if(btn)btn.disabled=true;out.className='fs';out.textContent=MSG.wait;
 var p={access_key:KEY,subject:'[ITSS.asia] '+subject,from_name:'ITSS.asia website',name:fd.get('n'),email:fd.get('e'),phone:fd.get('p')||'',company:fd.get('c')||'',message:body,language:d.documentElement.lang,page:location.pathname};
 fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(p)})
 .then(function(r){return r.json()}).then(function(j){if(!j.success)throw 0;out.className='fs ok';out.textContent=MSG.ok;form.reset();if(done)done()})
 .catch(function(){out.className='fs er';out.innerHTML=MSG.err.replace('hello@itss.asia','<a href="mailto:hello@itss.asia">hello@itss.asia</a>');})
 .then(function(){if(btn)btn.disabled=false});
}
function status(form){var o=d.createElement('div');o.setAttribute('role','status');o.setAttribute('aria-live','polite');o.className='fs';form.appendChild(o);var hp=d.createElement('input');hp.type='checkbox';hp.name='botcheck';hp.tabIndex=-1;hp.setAttribute('aria-hidden','true');hp.style.cssText='position:absolute;left:-9999px';form.appendChild(hp);return o}
var f=d.getElementById('f');
if(f){var fo=status(f);f.onsubmit=function(e){e.preventDefault();var x=new FormData(f);send(x,x.get('t')+' - '+x.get('n'),x.get('t')+'\n'+x.get('z')+'\n\n'+x.get('m'),f,fo)}}
// quote modal: step 1 choose service, step 2 service-specific form
var md=d.getElementById('md');
if(md){
function op(){md.classList.add('o');d.body.style.overflow='hidden'}function cl(){md.classList.remove('o');d.body.style.overflow=''}
d.querySelectorAll('[data-q]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();op()})});
md.querySelector('.x').onclick=cl;md.addEventListener('click',function(e){if(e.target===md)cl()});d.addEventListener('keydown',function(e){if(e.key==='Escape')cl()});
var st=md.querySelectorAll('.stp'),nx=md.querySelector('[data-next]'),ex=md.querySelector('[name=x]');
function go(i){st.forEach(function(s,j){s.classList.toggle('o',i===j)})}
md.querySelectorAll('input[name=s]').forEach(function(r){r.onchange=function(){nx.disabled=false;ex.placeholder=r.getAttribute('data-x')}});
nx.onclick=function(){go(1)};md.querySelector('[data-back]').onclick=function(){go(0)};
var q=md.querySelector('form'),qo=status(q);q.onsubmit=function(e){e.preventDefault();var x=new FormData(q);send(x,x.get('s')+' - '+x.get('n'),x.get('s')+'\n'+(x.get('x')||'')+'\n\n'+(x.get('m')||''),q,qo,function(){setTimeout(function(){cl();go(0);qo.textContent='';qo.className='fs'},2200)})}}
})();
