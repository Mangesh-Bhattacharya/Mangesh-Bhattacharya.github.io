/* Core UI behavior: nav state, scroll reveals, animated counters,
   avatar mark, mobile nav. No fake loading screens, no blocking timers. */
(function(){

  // ---- Nav scroll state ----
  var nav = document.querySelector('nav');
  function onScroll(){
    if(window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    var sy = window.scrollY;
    document.querySelectorAll('section[id]').forEach(function(s){
      var link = document.querySelector('.nav-links a[href="#'+s.id+'"]');
      if(!link) return;
      if(sy >= s.offsetTop - 120 && sy < s.offsetTop + s.offsetHeight - 120) link.classList.add('active');
      else link.classList.remove('active');
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ---- Scroll reveal ----
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); observer.unobserve(e.target); }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){
    if(reduceMotion) el.classList.add('in'); else observer.observe(el);
  });

  // ---- Animated counters ----
  function animateCount(el, target, suffix){
    suffix = suffix || '';
    if(reduceMotion){ el.textContent = target + suffix; return; }
    var start = 0, duration = 1200, startTime = null;
    function tick(ts){
      if(!startTime) startTime = ts;
      var p = Math.min((ts-startTime)/duration, 1);
      var eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(eased*target) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  window.animateCount = animateCount;

  var statObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var el = e.target;
        var target = parseInt(el.dataset.count, 10);
        if(!isNaN(target)) animateCount(el, target, el.dataset.suffix || '');
        statObserver.unobserve(el);
      }
    });
  }, {threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ statObserver.observe(el); });

  // ---- Abstract avatar mark (canvas) — clean geometric rings, no cartoon art ----
  var avCanvas = document.getElementById('avatarCanvas');
  if(avCanvas){
    var actx = avCanvas.getContext('2d');
    var W = avCanvas.width, H = avCanvas.height, t = 0;
    function drawAvatar(){
      actx.clearRect(0,0,W,H);
      actx.save();
      actx.translate(W/2, H/2);
      for(var i=0;i<3;i++){
        var radius = 60 + i*28;
        var rot = t*(0.15 - i*0.04);
        actx.save();
        actx.rotate(rot);
        actx.beginPath();
        actx.arc(0,0,radius,0,Math.PI*1.5);
        actx.strokeStyle = 'rgba(79,157,255,'+(0.35 - i*0.08)+')';
        actx.lineWidth = 1.4;
        actx.stroke();
        actx.restore();
      }
      actx.restore();
      t += reduceMotion ? 0 : 0.006;
      if(!reduceMotion) requestAnimationFrame(drawAvatar);
    }
    drawAvatar();
  }

})();
