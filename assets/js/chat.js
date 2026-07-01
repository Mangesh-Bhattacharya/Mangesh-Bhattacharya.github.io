/* "Ask about Mangesh" panel.
   Honest by default: a small rule-based FAQ answers common recruiter
   questions using real profile facts. If MB_CONFIG.WORKER_ENDPOINT is set
   (a Cloudflare Worker proxy — see /worker/README.md), questions that don't
   match a rule are forwarded there for a real model-generated answer.
   No API key ever lives in this file or in page source. */
(function(){
  var input = document.getElementById('askInput');
  var send = document.getElementById('askSend');
  var answerBox = document.getElementById('askAnswer');
  var suggestWrap = document.getElementById('askSuggest');
  if(!input || !send || !answerBox) return;

  var FACTS = {
    name: 'Mangesh Bhattacharya',
    role: 'Security Engineer at Avahi AI',
    location: 'Ontario, Canada',
    linkedin: 'https://www.linkedin.com/in/mangesh-bhattacharya',
    github: 'https://github.com/Mangesh-Bhattacharya',
    tryhackme: 'https://tryhackme.com/p/TheOrbiter'
  };

  function rule(q){
    var s = q.toLowerCase();
    if(/hello|hi\b|hey/.test(s))
      return 'Hi! Ask me about Mangesh\'s experience, skills, projects, or whether he\'s open to opportunities.';
    if(/who|about|background|introduc|summar|overview/.test(s))
      return 'Mangesh Bhattacharya is an AI Security Engineer based in Ontario, Canada, currently a Security Engineer at Avahi AI and completing a Master\'s in IT Security (AI Specialization) at Ontario Tech University. His work focuses on AI-powered threat detection, cloud security, and threat intelligence automation.';
    if(/open|available|hire|job|opportunit|position|role|recruit/.test(s))
      return 'Yes — Mangesh is open to roles in AI Security Engineering, Cybersecurity Research, Threat Intelligence, and Cloud Security. Best way to reach him is <a href="'+FACTS.linkedin+'" target="_blank" rel="noopener">LinkedIn</a>.';
    if(/skill|stack|technolog|tool|language|framework/.test(s))
      return 'Core skills: penetration testing, threat intelligence, SIEM/SOAR, cloud security (AWS/Azure), Python for ML and security automation, Docker/Ansible/Kubernetes, and tools like Nmap, Wireshark, Wazuh and VirusTotal.';
    if(/project|built|github|repo/.test(s))
      return 'His GitHub has dozens of cybersecurity and AI-security projects — threat detection tooling, cloud security automation, and ML-based anomaly detection. See the Projects section above or <a href="'+FACTS.github+'" target="_blank" rel="noopener">browse GitHub</a>.';
    if(/experience|work histor|employ|career/.test(s))
      return 'Currently Security Engineer at Avahi AI (May 2026–present). Previously: freelance cybersecurity/DevSecOps engineering on Upwork, cybersecurity observability and DevSecOps roles at Ameya Data Solutions, and cloud security research with CANARIE. Full timeline is in the Experience section above.';
    if(/educat|degree|university|school|master|bachelor|study/.test(s))
      return 'Master\'s in IT Security (AI Specialization) at Ontario Tech University (Sep 2025–Apr 2027), and an Honours Bachelor of Information Technology, Cybersecurity from Seneca Polytechnic (2021–2025).';
    if(/cert|qualif/.test(s))
      return 'Certifications span CompTIA Security+, AWS Security Specialty, Certified Ethical Hacker, SANS threat intelligence, and CTF competition results — see the Certifications section.';
    if(/contact|reach|email|connect|linkedin/.test(s))
      return 'Best way to connect: <a href="'+FACTS.linkedin+'" target="_blank" rel="noopener">LinkedIn</a> or <a href="'+FACTS.github+'" target="_blank" rel="noopener">GitHub</a>.';
    if(/salary|compensation|pay/.test(s))
      return 'Compensation is best discussed directly — reach out via <a href="'+FACTS.linkedin+'" target="_blank" rel="noopener">LinkedIn</a>.';
    if(/visa|sponsor|work permit|citizen/.test(s))
      return 'Mangesh is based in Ontario, Canada with valid Canadian work authorization.';
    if(/location|where|toronto|canada/.test(s))
      return 'Based in Ontario, Canada — open to remote, hybrid, or on-site roles.';
    return null;
  }

  function addAnswer(html){
    answerBox.innerHTML = html;
    answerBox.classList.add('show');
  }

  function ask(q){
    if(!q) return;
    var r = rule(q);
    if(r){ addAnswer(r); return; }
    var endpoint = window.MB_CONFIG && window.MB_CONFIG.WORKER_ENDPOINT;
    if(endpoint){
      addAnswer('<em style="color:var(--muted-2)">Thinking…</em>');
      var projects = (window.mbProjects ? window.mbProjects.getAll() : []).slice(0,8)
        .map(function(p){ return p.name + ': ' + (p.description||''); }).join('; ');
      fetch(endpoint, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ question:q, projects:projects })
      }).then(function(r){ return r.json(); })
        .then(function(data){ addAnswer(data.answer || 'Sorry, I couldn\'t generate an answer — try LinkedIn instead.'); })
        .catch(function(){ addAnswer('Couldn\'t reach the AI service right now. Reach out on <a href="'+FACTS.linkedin+'" target="_blank" rel="noopener">LinkedIn</a> instead.'); });
      return;
    }
    addAnswer('Good question — for anything beyond the FAQ here, the fastest answer comes straight from Mangesh on <a href="'+FACTS.linkedin+'" target="_blank" rel="noopener">LinkedIn</a>.');
  }

  send.addEventListener('click', function(){ ask(input.value.trim()); });
  input.addEventListener('keydown', function(e){ if(e.key === 'Enter') ask(input.value.trim()); });
  if(suggestWrap){
    suggestWrap.addEventListener('click', function(e){
      var btn = e.target.closest('button');
      if(!btn) return;
      input.value = btn.dataset.q;
      ask(btn.dataset.q);
    });
  }
})();
