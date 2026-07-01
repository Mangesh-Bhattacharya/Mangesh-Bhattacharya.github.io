/* Cloudflare Worker: proxies chat questions to Gemini so the API key
   never appears in client-side code. Deploy this separately from the
   static site — see README.md in this folder for step-by-step setup. */

const SYSTEM_CONTEXT = `You are a factual assistant answering recruiter/visitor
questions about Mangesh Bhattacharya, an AI Security Engineer based in Ontario,
Canada. Only answer using the facts provided below. If asked something outside
these facts (personal/private details), politely decline and suggest LinkedIn.

Facts:
- Current role: Security Engineer at Avahi AI (May 2026-Present), Toronto/Ontario, Canada.
- Education: Master's in IT Security (AI Specialization), Ontario Tech University (Sep 2025-Apr 2027, in progress).
- Education: Honours Bachelor of Information Technology, Cybersecurity, Seneca Polytechnic (May 2021-Aug 2025).
- Prior experience: Cybersecurity Engineer (Freelance, Upwork, Aug 2025-May 2026); DevSecOps Engineer (Freelance, Upwork, Aug 2025-Jan 2026);
  Cybersecurity Observability & AI Engineer, Ameya Data Solutions (Dec 2024-May 2025); DevSecOps Engineer, Ameya Data Solutions (May 2024-Nov 2024);
  Data Analyst Intern, Ameya Data Solutions (Aug 2023-Jan 2024); Cybersecurity Researcher & Analyst, CANARIE AWS Cloud Security Project (2023-2024).
- Skills: penetration testing, threat intelligence, SIEM/SOAR, red teaming, vulnerability assessment, incident response, malware analysis,
  Python/TensorFlow/Scikit-learn/NLP for ML security, AWS/Docker/Ansible/Kubernetes, Nmap/Wireshark/Metasploit/Wazuh/VirusTotal.
- Certifications: CompTIA Security+, AWS Security Specialty, Certified Ethical Hacker, SANS Threat Intelligence, CTF competitions, and others.
- Open to new opportunities: yes.
- Contact: LinkedIn https://www.linkedin.com/in/mangesh-bhattacharya, GitHub https://github.com/Mangesh-Bhattacharya.

Be concise (2-4 sentences), friendly, and professional. Never invent facts not listed above.`;

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || 'https://mangesh-bhattacharya.github.io',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'Invalid JSON' }, 400, cors); }

    const question = (body.question || '').slice(0, 500);
    const projects = (body.projects || '').slice(0, 1500);
    if (!question) return json({ error: 'Missing question' }, 400, cors);

    const prompt = SYSTEM_CONTEXT + `\n\nRecent GitHub projects: ${projects}\n\nQuestion: ${question}`;

    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 300, temperature: 0.4 }
          })
        }
      );
      const data = await r.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
      if (!answer) return json({ answer: "Sorry, I couldn't generate an answer right now — try LinkedIn instead." }, 200, cors);
      return json({ answer }, 200, cors);
    } catch (e) {
      return json({ answer: "The AI service is temporarily unavailable — try LinkedIn instead." }, 200, cors);
    }
  }
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...cors } });
}
