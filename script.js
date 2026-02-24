// CURSOR
const cur=document.getElementById('cur'),curt=document.getElementById('curt');
let mx=0,my=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function l(){tx+=(mx-tx)*.12;ty+=(my-ty)*.12;curt.style.left=tx+'px';curt.style.top=ty+'px';requestAnimationFrame(l)})();
document.querySelectorAll('a,button,.acard,.rm-card,.faq-item,.tmcard,.soc-btn,.dgcard').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='22px';cur.style.height='22px';curt.style.width='58px';curt.style.height='58px';curt.style.borderColor='rgba(255,172,0,.95)'});
  el.addEventListener('mouseleave',()=>{cur.style.width='16px';cur.style.height='16px';curt.style.width='42px';curt.style.height='42px';curt.style.borderColor='rgba(255,172,0,.55)'});
});

// ANIMATED SAND CANVAS
const canvas=document.getElementById('bgc'),ctx=canvas.getContext('2d');
let W,H;
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();window.addEventListener('resize',resize);

// Floating sand particles and sparkles
const pts=Array.from({length:55},()=>({
  x:Math.random()*1920,y:Math.random()*1080,
  vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.15,
  sz:Math.random()*3+1,
  op:Math.random()*.25+.04,
  sparkle:Math.random()>.75,
  hue:Math.random()>0.5?'rgba(255,172,0,':'rgba(255,220,100,'
}));

let f=0;
function draw(){
  ctx.clearRect(0,0,W,H);f++;
  const t=f*.002;

  // Soft warm sky glow at top
  const gTop=ctx.createLinearGradient(0,0,0,H*.4);
  gTop.addColorStop(0,'rgba(126,207,237,.04)');
  gTop.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=gTop;ctx.fillRect(0,0,W,H);

  // Warm sand ground glow at bottom
  const gBot=ctx.createLinearGradient(0,H*.7,0,H);
  gBot.addColorStop(0,'rgba(0,0,0,0)');
  gBot.addColorStop(1,'rgba(200,160,60,.06)');
  ctx.fillStyle=gBot;ctx.fillRect(0,0,W,H);

  // Moving warm radial
  const g1=ctx.createRadialGradient(W*(.5+.08*Math.sin(t)),H*(.5+.06*Math.cos(t*.9)),0,W*.5,H*.5,W*.7);
  g1.addColorStop(0,'rgba(255,210,80,.03)');
  g1.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);

  // Particles (sand grains + sparkles)
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    if(p.sparkle){
      const pulse=Math.sin(f*.05+p.x)*.5+.5;
      ctx.shadowBlur=8;ctx.shadowColor='rgba(255,200,50,.8)';
      ctx.fillStyle=`${p.hue}${(p.op+pulse*.15)})`;
    }else{
      ctx.shadowBlur=0;
      ctx.fillStyle=`rgba(200,160,60,${p.op})`;
    }
    ctx.beginPath();ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);ctx.fill();
  });
  ctx.shadowBlur=0;
  requestAnimationFrame(draw);
}
draw();

// NAV SCROLL
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));

// REVEAL
const revs=document.querySelectorAll('.rev');
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:.08});
revs.forEach(r=>obs.observe(r));

// ROADMAP BARS
const bars=document.querySelectorAll('.rm-bar');
const bobs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('animated');bobs.unobserve(e.target)}})},{threshold:.3});
bars.forEach(b=>bobs.observe(b));

// FAQ
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement;
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen)item.classList.add('open');
  });
});