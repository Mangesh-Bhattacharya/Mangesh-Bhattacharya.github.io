/* Lightweight animated node-network canvas — no external library.
   Ties visually into "networks/security" theme. Pauses when tab hidden
   and respects prefers-reduced-motion. */
(function(){
  var canvas = document.getElementById('network-canvas');
  if(!canvas) return;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = canvas.getContext('2d');
  var W, H, nodes = [], raf = null;
  var mouse = { x: null, y: null };
  var ACCENT = '79,157,255';

  function resize(){
    var hero = canvas.parentElement;
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
    var count = Math.min(70, Math.max(28, Math.floor((W*H)/26000)));
    nodes = [];
    for(var i=0;i<count;i++){
      nodes.push({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25,
        r: 1 + Math.random()*1.6
      });
    }
  }

  function step(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<nodes.length;i++){
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > W) n.vx *= -1;
      if(n.y < 0 || n.y > H) n.vy *= -1;
      if(mouse.x !== null){
        var dx = n.x-mouse.x, dy = n.y-mouse.y, d = Math.sqrt(dx*dx+dy*dy);
        if(d < 120){ n.x += dx/d*0.6; n.y += dy/d*0.6; }
      }
    }
    for(var a=0; a<nodes.length; a++){
      for(var b=a+1; b<nodes.length; b++){
        var dx = nodes[a].x-nodes[b].x, dy = nodes[a].y-nodes[b].y;
        var dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 150){
          ctx.strokeStyle = 'rgba('+ACCENT+','+(0.16*(1-dist/150))+')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(nodes[a].x,nodes[a].y); ctx.lineTo(nodes[b].x,nodes[b].y); ctx.stroke();
        }
      }
    }
    for(var i=0;i<nodes.length;i++){
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba('+ACCENT+',0.5)';
      ctx.fill();
    }
    raf = requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize, {passive:true});
  document.addEventListener('mousemove', function(e){
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
  }, {passive:true});
  document.addEventListener('visibilitychange', function(){
    if(document.hidden){ if(raf) cancelAnimationFrame(raf); raf = null; }
    else if(!raf && !reduceMotion){ step(); }
  });

  resize();
  if(!reduceMotion){ step(); }
  else {
    // draw a single static frame for reduced-motion users
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<nodes.length;i++){
      ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba('+ACCENT+',0.4)'; ctx.fill();
    }
  }
})();
