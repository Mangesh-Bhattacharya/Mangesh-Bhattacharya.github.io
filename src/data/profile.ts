export const profile = {
  name: "Mangesh Bhattacharya",
  role: "Cybersecurity Engineer · AI Threat Detection",
  location: "Toronto, Ontario, Canada",
  email: "mangesh.bhattacharya@ontariotechu.net",
  phone: "+1 (416) 670-1418",
  github: "Mangesh-Bhattacharya",
  linkedin: "https://www.linkedin.com/in/mangesh-bhattacharya",
  tryhackme: "https://tryhackme.com/p/TheOrbiter",
  tryhackmeUser: "TheOrbiter",
  summary:
    "MITS-AI graduate student in Canada's first AI-in-Security program, building AI-driven, cloud-native detection and response systems across AWS and Azure — with hands-on SOC, DevSecOps and threat-intelligence experience.",
};

export const stats = [
  { value: 90, suffix: "%+", label: "ML detection accuracy" },
  { value: 38, suffix: "%", label: "Fewer false positives" },
  { value: 45, suffix: "%", label: "Over-privileged IAM cut" },
  { value: 40, suffix: "%", label: "Less manual review" },
];

export type Project = {
  title: string;
  impact: string;
  desc: string;
  tags: string[];
  track: "AI-Security" | "AI/ML" | "Cloud";
  level: "Beginner" | "Intermediate" | "Advanced";
};

export const projects: Project[] = [
  { title: "ML-Based Intrusion Detection System", impact: "90%+ accuracy, real-time anomaly detection", desc: "Production-grade IDS modelling network behaviour with heuristics + supervised ML into a UEBA engine tuned for low false positives on lateral movement and privilege escalation.", tags: ["Python", "TensorFlow", "Scikit-learn", "UEBA"], track: "AI-Security", level: "Advanced" },
  { title: "Network Intrusion Detection with Graph Features", impact: "GCN · GraphSAGE · GAT vs RF/XGBoost", desc: "Traffic modelled as a graph (IPs = nodes, flows = edges) with graph-theoretic features and GNNs, benchmarked on CIC-IDS-2017.", tags: ["PyTorch Geometric", "NetworkX", "GNN"], track: "AI/ML", level: "Advanced" },
  { title: "AI-Powered Malware Classifier", impact: "35% faster detection", desc: "Automated feature extraction pipeline wired into SOAR so verdicts trigger containment instead of waiting on triage.", tags: ["Python", "TensorFlow", "SOAR"], track: "AI-Security", level: "Advanced" },
  { title: "IoT Botnet Detection", impact: "Mirai & BASHLITE detection", desc: "ML framework on N-BaIoT — 115 statistical features across 9 IoT devices, comparing models across damped-window time frames.", tags: ["Python", "Scikit-learn", "N-BaIoT"], track: "AI/ML", level: "Intermediate" },
  { title: "Automated Threat-Intel Pipelines", impact: "40% less manual review", desc: "Multi-source log + IOC correlation inside SIEM with pseudonymization and encryption for GDPR alignment.", tags: ["OpenSearch", "Kibana", "Python"], track: "AI-Security", level: "Intermediate" },
  { title: "AWS & Azure Privilege-Escalation Defense", impact: "Zero-Trust monitoring", desc: "Least-privilege IAM, VPC segmentation and SG hardening to detect and contain privilege escalation; NIST/CIS aligned.", tags: ["AWS", "Azure", "IAM", "Zero Trust"], track: "Cloud", level: "Advanced" },
  { title: "AI Threat-Intel Research Tool", impact: "B.IT Cybersecurity capstone", desc: "LLM-assisted tool that aggregates OSINT, summarises findings and surfaces actionable IOCs for analysts.", tags: ["Python", "LLM", "Threat Intel"], track: "AI-Security", level: "Beginner" },
];

export const toolkit: Record<string, string[]> = {
  "AI & Threat Detection": ["ML for Threat Detection", "TensorFlow", "UEBA", "Anomaly Detection", "Malware Classification", "AI Threat Modeling", "Graph Neural Networks", "Python (Data & ML)"],
  "Cloud & DevSecOps": ["AWS (EC2, S3, VPC, IAM)", "Microsoft Azure", "Zero Trust", "Docker", "Ansible", "CI/CD", "GitHub Actions", "SOAR"],
  "Offensive Security": ["Burp Suite", "OWASP ZAP", "Nmap", "FFUF & Nuclei", "Wireshark", "MITRE ATT&CK", "OWASP Top 10", "CTF & Bug Bounty"],
  "Frameworks & Tools": ["SIEM (OpenSearch/ELK)", "NIST / CIS", "GDPR", "Snyk & Trivy", "Fluent Bit", "Python · C++ · Bash", "Git", "IAM & Least Privilege"],
};

export const experience = [
  { role: "Cybersecurity Observability & AI Engineer", org: "Ameya Data Solutions · Co-op · Hybrid", period: "Dec 2024 — Mar 2025", points: ["AI-powered threat detection & observability — 38% fewer SOC false positives.", "Real-time pipelines unifying SIEM, IDS/IPS, EDR and cloud telemetry for threat hunting.", "Cut over-privileged IAM roles 45% with Zero-Trust AWS design (NIST, CIS, GDPR)."] },
  { role: "DevSecOps Engineer", org: "Ameya Data Solutions · Co-op · Remote", period: "May 2024 — Aug 2024", points: ["AI-enhanced EDR tooling with Snyk & Trivy — +33% vulnerability coverage.", "Fluent Bit → OpenSearch logging for faster forensics.", "Dockerised, Ansible-automated secure delivery pipelines."] },
  { role: "Data Security Analyst Intern", org: "Ameya Data Solutions · Remote", period: "Aug 2023 — Dec 2023", points: ["ELK log integration cutting correlation effort 35%.", "AWS infrastructure (EC2, S3, VPC, IAM) management.", "Hardening across Windows, Linux and macOS."] },
];

export const education = [
  { school: "Ontario Tech University", degree: "Master of IT Security — Artificial Intelligence (MITS-AI)", period: "2025 — 2027" },
  { school: "Seneca Polytechnic", degree: "Honours Bachelor of IT, Cybersecurity", period: "2021 — 2025" },
  { school: "Humber Polytechnic", degree: "Computer Systems Networking & Telecom", period: "2018 — 2021" },
];

export const certs = [
  { name: "Certified Ethical Hacker (CEH)", issuer: "Cisco Networking Academy" },
  { name: "CCSK — Cloud Security Knowledge", issuer: "Cloud Security Alliance" },
  { name: "IBM AI Engineering Professional", issuer: "IBM" },
  { name: "Azure Fundamentals", issuer: "Microsoft" },
  { name: "CCNA Routing & Switching", issuer: "Cisco" },
  { name: "(ISC)² Candidate", issuer: "ISC2" },
  { name: "PCEP-30-01 Python", issuer: "OpenEDG" },
  { name: "Google IT Automation with Python", issuer: "Google" },
];

export const thm = [
  { path: "Security Engineer", tag: "Defense" },
  { path: "Advent of Cyber 2025", tag: "Competition" },
  { path: "Offensive Pentesting", tag: "Offense" },
  { path: "Red Teaming", tag: "Offense" },
  { path: "DevSecOps", tag: "Engineering" },
  { path: "Advanced Endpoint Investigations", tag: "DFIR" },
  { path: "CompTIA PenTest+ Pathway", tag: "Offense" },
  { path: "Jr. Penetration Tester", tag: "Offense" },
  { path: "Pre Security", tag: "Foundations" },
];
