const progress=document.querySelector('.scroll-progress');
const updateProgress=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%';};
window.addEventListener('scroll',updateProgress,{passive:true}); updateProgress();

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});
},{threshold:.14});
document.querySelectorAll('.reveal,.reveal-item').forEach(el=>revealObserver.observe(el));

const phrases=['clean code.','smart solutions.','modern web apps.','.NET experiences.'];
const typing=document.getElementById('typing'); let pi=0,ci=0,deleting=false;
function typeLoop(){
  const word=phrases[pi];
  typing.textContent=word.slice(0,ci);
  if(!deleting){ci++; if(ci>word.length){deleting=true;setTimeout(typeLoop,1500);return}}
  else{ci--; if(ci===0){deleting=false;pi=(pi+1)%phrases.length}}
  setTimeout(typeLoop,deleting?55:85);
}
if(typing) typeLoop();

const menuBtn=document.querySelector('.menu-toggle'), menu=document.querySelector('.site-menu');
menuBtn?.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',open);
});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target, target=Number(el.dataset.count); let n=0;
    const step=Math.max(1,Math.ceil(target/20));
    const tick=()=>{n=Math.min(target,n+step);el.textContent=n+'+';if(n<target)requestAnimationFrame(tick)};
    tick(); counterObserver.unobserve(el);
  });
},{threshold:.7});
counters.forEach(el=>counterObserver.observe(el));

const modal=document.querySelector('.project-modal');
const modalTitle=document.getElementById('modal-title');
const modalDescription=document.getElementById('modal-description');
const modalTech=document.getElementById('modal-tech');
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
document.querySelectorAll('.project').forEach(card=>{
  card.addEventListener('click',()=>{
    const title=card.querySelector('h3')?.textContent||'Project';
    const desc=card.querySelector('p')?.textContent||'';
    const tech=card.querySelector('.tech')?.textContent||'';
    modalTitle.textContent=title; modalDescription.textContent=desc; modalTech.textContent=tech;
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  });
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click()}});
});
modal?.querySelector('.modal-backdrop')?.addEventListener('click',closeModal);
modal?.querySelector('.modal-close')?.addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
