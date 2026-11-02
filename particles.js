// A folded particle ribbon: quiet continuous flow, with local pointer displacement.
function mountParticles(host) {
 if(!host)return()=>{};
 const c=document.createElement('canvas');c.className='particle-field';c.setAttribute('aria-hidden','true');host.prepend(c);
 const ctx=c.getContext('2d');if(!ctx)return()=>c.remove();
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let w=0,h=0,frame=0,last=0,t=0,mx=-1000,my=-1000,hover=0,targetHover=0;
 const colors=['#548eff','#79b9ff','#a6daff'];
 const ps=Array.from({length:6600},(_,i)=>({layer:Math.floor(i/2200),u:(i*.61803398875)%1,v:((i*.754877666)%1-.5)*2,r:.45+(i%7)*.08,color:i%3,dx:0,dy:0}));
 function draw(dt=0){
  ctx.clearRect(0,0,w,h);
  const mobile=host.clientWidth<700;
  const scale=mobile?Math.max(w*.58,h*.46):Math.max(w*.48,h*.52),cx=w*(mobile?.53:.54),cy=h*.5;
  hover+=(targetHover-hover)*.08;
  for(const p of ps){
   // Particles travel along an open, folded S-shaped sheet, never a rotating solid.
   const layer=p.layer,phase=layer*.72;
   const u=(p.u+t*(.020+layer*.005))%1, a=u*Math.PI*2;
   const edge=Math.sin(u*Math.PI);
   const bend=.10*Math.sin(t*.32+a*1.4+phase)+.055*Math.sin(a*3.1-t*.18+phase);
   const x=Math.sin(a+phase*.38)*(.75-layer*.06)+p.v*(.30+layer*.025)*Math.cos(a*.65+phase)+bend+(layer-1)*.18;
   const y=(u-.5)*(2.15-layer*.08)+p.v*.30*Math.sin(a*1.1+.6+phase)+.11*Math.sin(a*2-t*.3+phase)+(layer-1)*.06;
   const z=Math.cos(a+phase)*.45+p.v*.34*Math.cos(a*1.1+.6+phase)+(layer-1)*.16;
   const persp=3.5/(3.5+z);
   const px=cx+x*scale*persp,py=cy+y*scale*persp;
   const vx=px-mx,vy=py-my,dist=Math.hypot(vx,vy),radius=Math.min(110,w*.18);
   const influence=Math.exp(-dist*dist/(radius*radius)) * hover;
   const amount=18*influence;
   const tx=dist>1?vx/dist*amount:0,ty=dist>1?vy/dist*amount:0;
   const easing=dt?1-Math.exp(-dt*5):1;
   p.dx+=(tx-p.dx)*easing;p.dy+=(ty-p.dy)*easing;
   ctx.globalAlpha=(.26+.40*(z+1)/2)*Math.min(1,edge*5)*(layer===1?1:.82);
   ctx.fillStyle=colors[p.color];ctx.beginPath();ctx.arc(px+p.dx,py+p.dy,p.r*persp,0,Math.PI*2);ctx.fill();
  }ctx.globalAlpha=1;
 }
 function resize(){w=host.clientWidth;h=host.clientHeight;const d=Math.min(devicePixelRatio||1,2);c.width=Math.round(w*d);c.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);draw();}
 function tick(now){if(!document.hidden&&now-last>=30){const dt=Math.min((now-last)/1000,.05);last=now;t+=dt;draw(dt);}else if(document.hidden)last=now;frame=requestAnimationFrame(tick);}
 function move(e){if(motion.matches)return;const r=host.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;targetHover=1;}
 function leave(){targetHover=0;}
 function update(){cancelAnimationFrame(frame);last=performance.now();if(!motion.matches)frame=requestAnimationFrame(tick);else {targetHover=hover=0;draw();}}
 const ro=new ResizeObserver(resize);ro.observe(host);host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);motion.addEventListener('change',update);resize();update();
 return()=>{cancelAnimationFrame(frame);ro.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);motion.removeEventListener('change',update);c.remove();};
}
