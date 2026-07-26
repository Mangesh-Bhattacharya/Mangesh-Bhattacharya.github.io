export const profile = {
  name: "Mangesh Bhattacharya",
  initials: "MB",
  roles: [
    "Cybersecurity Engineer",
    "Detection & AI Specialist",
    "Cloud Security Practitioner",
    "DevSecOps Engineer",
    "Penetration Tester",
  ],
  location: "Toronto, Ontario, Canada",
  email: "mangeshb20@gmail.com",
  phone: "+1 (416) 670-1418",
  linkedin: "https://www.linkedin.com/in/mangeshbhattacharya",
  github: "https://github.com/Mangesh-Bhattacharya",
  resumeFile: "/resume.pdf",
  summary:
    "Cybersecurity Engineer and MITS-AI graduate student building the next generation of AI-driven, cloud-native security systems. I design detection and response architectures that combine machine learning, automation, and deep cloud security expertise across AWS and Azure — with hands-on SOC, DevSecOps, and threat-intelligence experience.",
};

export const stats = [
  { label: "ML Detection Accuracy", value: 90, suffix: "%+" },
  { label: "Faster Threat Detection", value: 35, suffix: "%" },
  { label: "Less Manual Review Time", value: 40, suffix: "%" },
  { label: "Years CTF & Hands-On Testing", value: 5, suffix: "+" },
];

export type SkillCategory =
  | "AI & Threat Detection"
  | "Cloud & DevSecOps"
  | "Offensive Security & Pentesting"
  | "Frameworks & Tools";

export const skillCategories: SkillCategory[] = [
  "AI & Threat Detection",
  "Cloud & DevSecOps",
  "Offensive Security & Pentesting",
  "Frameworks & Tools",
];

export const skills: { name: string; category: SkillCategory }[] = [
  // AI & Threat Detection
  { name: "Machine Learning for Threat Detection", category: "AI & Threat Detection" },
  { name: "TensorFlow", category: "AI & Threat Detection" },
  { name: "UEBA (User & Entity Behavior Analytics)", category: "AI & Threat Detection" },
  { name: "Anomaly Detection", category: "AI & Threat Detection" },
  { name: "AI-Powered Malware Classification", category: "AI & Threat Detection" },
  { name: "AI-Driven Threat Modeling", category: "AI & Threat Detection" },
  { name: "Graph Neural Networks", category: "AI & Threat Detection" },
  { name: "Python (Data & ML)", category: "AI & Threat Detection" },

  // Cloud & DevSecOps
  { name: "AWS (EC2, S3, VPC, IAM)", category: "Cloud & DevSecOps" },
  { name: "Microsoft Azure", category: "Cloud & DevSecOps" },
  { name: "Zero Trust Architecture", category: "Cloud & DevSecOps" },
  { name: "Docker", category: "Cloud & DevSecOps" },
  { name: "Ansible", category: "Cloud & DevSecOps" },
  { name: "CI/CD Pipelines", category: "Cloud & DevSecOps" },
  { name: "GitHub Actions", category: "Cloud & DevSecOps" },
  { name: "SOAR Automation", category: "Cloud & DevSecOps" },

  // Offensive Security & Pentesting
  { name: "Burp Suite", category: "Offensive Security & Pentesting" },
  { name: "OWASP ZAP", category: "Offensive Security & Pentesting" },
  { name: "Nmap", category: "Offensive Security & Pentesting" },
  { name: "FFUF & Nuclei", category: "Offensive Security & Pentesting" },
  { name: "Wireshark", category: "Offensive Security & Pentesting" },
  { name: "MITRE ATT&CK Emulation", category: "Offensive Security & Pentesting" },
  { name: "OWASP Top 10 / CWE", category: "Offensive Security & Pentesting" },
  { name: "CTF & Bug Bounty", category: "Offensive Security & Pentesting" },

  // Frameworks & Tools
  { name: "SIEM (OpenSearch / ELK / Kibana)", category: "Frameworks & Tools" },
  { name: "NIST / CIS Benchmarks", category: "Frameworks & Tools" },
  { name: "GDPR & Compliance", category: "Frameworks & Tools" },
  { name: "Snyk & Trivy", category: "Frameworks & Tools" },
  { name: "Fluent Bit", category: "Frameworks & Tools" },
  { name: "Python | C++ | Bash", category: "Frameworks & Tools" },
  { name: "Git / GitHub", category: "Frameworks & Tools" },
  { name: "IAM & Least Privilege", category: "Frameworks & Tools" },
];

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export const projects: {
  id: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: Difficulty;
  category: SkillCategory;
  metrics: string[];
  stack: string[];
  link?: string;
  featured?: boolean;
}[] = [
  {
    id: "ids",
    title: "ML-Based Intrusion Detection System (IDS)",
    tagline: "90%+ accuracy real-time anomaly detection",
    description:
      "Engineered a production-grade intrusion detection system that models network behavior and flags anomalies in real time. Combined heuristic analysis with supervised ML models to architect User and Entity Behavior Analytics (UEBA), tuned for low false-positive rates while catching subtle lateral-movement and privilege-escalation patterns.",
    difficulty: "Advanced",
    category: "AI & Threat Detection",
    metrics: ["90%+ detection accuracy", "Real-time anomaly scoring"],
    stack: ["Python", "TensorFlow", "Scikit-learn", "UEBA"],
    featured: true,
  },
  {
    id: "malware-classifier",
    title: "AI-Powered Malware Classifier",
    tagline: "35% faster detection via automated feature extraction",
    description:
      "Built a malware classification pipeline with custom, automated feature extraction that cut detection latency by 35%. Designed to plug into SOAR workflows so verdicts trigger automated containment actions instead of waiting on manual triage.",
    difficulty: "Advanced",
    category: "AI & Threat Detection",
    metrics: ["35% faster detection speed", "Automated feature extraction"],
    stack: ["Python", "TensorFlow", "SOAR", "MITRE ATT&CK"],
    featured: true,
  },
  {
    id: "threat-intel-pipeline",
    title: "Automated Threat-Intelligence Pipelines",
    tagline: "40% less manual review time",
    description:
      "Designed automated threat-intelligence ingestion pipelines that correlate multi-source logs and IOC feeds inside SIEM, cutting manual analyst review time by 40%. Focused on log correlation, pseudonymization, and encryption at rest/transit to keep the pipeline technically GDPR-aligned.",
    difficulty: "Intermediate",
    category: "AI & Threat Detection",
    metrics: ["40% less manual review time", "SIEM-integrated"],
    stack: ["Python", "OpenSearch", "Kibana", "SIEM/SOAR"],
    featured: true,
  },
  {
    id: "cloud-zero-trust",
    title: "AWS & Azure Cloud Security & Privilege-Escalation Defense",
    tagline: "Zero-Trust monitoring, IAM policy design, VPC segmentation",
    description:
      "Implemented Zero-Trust monitoring across AWS and Azure environments — least-privilege IAM policies, VPC/network segmentation, and security-group hardening — to detect and contain privilege-escalation attacks and align with NIST, CIS, and GDPR standards.",
    difficulty: "Advanced",
    category: "Cloud & DevSecOps",
    metrics: ["Zero-Trust architecture", "NIST / CIS / GDPR aligned"],
    stack: ["AWS", "Azure", "IAM", "VPC", "Terraform/Ansible"],
    featured: true,
  },
  {
    id: "threat-intel-ai-tool",
    title: "Threat Intelligence Automated Research & Analysis AI Tool",
    tagline: "Capstone project — Bachelor of IT, Cybersecurity",
    description:
      "Capstone project from my Honours B.IT in Cybersecurity at Seneca Polytechnic. An AI-assisted tool that automates open-source threat-intelligence research and analysis — aggregating sources, summarizing findings, and surfacing actionable IOCs for analysts. A great starting point for anyone exploring AI + threat intel.",
    difficulty: "Beginner",
    category: "AI & Threat Detection",
    metrics: ["Capstone project", "Open-source"],
    stack: ["Python", "AI/LLM Automation", "Threat Intelligence"],
    link: "https://github.com/Mangesh-Bhattacharya/Threat-Intelligence-Automated-Research-and-Analysis-AI-Tool",
  },
  {
    id: "iot-botnet",
    title: "IoT Botnet Detection via Network Traffic Analysis",
    tagline: "ML detection of Mirai & BASHLITE botnet traffic",
    description:
      "Machine learning framework detecting IoT botnet attacks (Mirai, BASHLITE) using the N-BaIoT dataset — 115 statistical features across 9 commercial IoT devices. Compared multiple ML models across damped-window time frames to distinguish benign from malicious traffic.",
    difficulty: "Intermediate",
    category: "AI & Threat Detection",
    metrics: ["115 statistical features", "9 IoT devices, 10 attack types"],
    stack: ["Python", "Scikit-learn", "N-BaIoT Dataset"],
    link: "https://github.com/Mangesh-Bhattacharya/IoT_Botnet_Detection_via_NTA_using_ML",
  },
  {
    id: "graph-ids",
    title: "Network Intrusion Detection Using Graph Features",
    tagline: "Graph theory + GNNs for intrusion detection",
    description:
      "Models network traffic as a graph (IPs as nodes, flows as edges) and applies graph-theoretic features and graph neural networks (GCN, GraphSAGE, GAT) to detect malicious behavior, benchmarked against Random Forest and XGBoost on CIC-IDS-2017 data.",
    difficulty: "Advanced",
    category: "AI & Threat Detection",
    metrics: ["Graph + GNN modeling", "CIC-IDS-2017 dataset"],
    stack: ["Python", "PyTorch Geometric", "NetworkX", "GCN/GraphSAGE/GAT"],
    link: "https://github.com/Mangesh-Bhattacharya/graph-based-network-intrusion-detection",
  },
];

export const experience: {
  role: string;
  org: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
}[] = [
  {
    role: "Cybersecurity Analyst",
    org: "Race2Cloud Inc.",
    location: "Toronto, ON",
    start: "Jan 2026",
    end: "Present",
    bullets: [
      "Architect production-grade User and Entity Behavior Analytics (UEBA) using heuristic analysis and machine learning, improving anomaly-detection precision by 28% and cutting false-positive alerts by 45%.",
      "Design high-fidelity adversarial emulations leveraging MITRE ATT&CK frameworks and custom payload obfuscation to test EDR/XDR solutions, uncovering 15+ detection gaps per engagement.",
      "Engineer end-to-end SOAR workflows with Python and TensorFlow, reducing Mean Time to Detect (MTTD) by 32% and Mean Time to Respond (MTTR) by 27%.",
      "Conduct attack-surface management using graph theory and network topology visualization, reducing viable lateral-movement paths by 30%.",
      "Identify and validate vulnerabilities in web/mobile apps with Burp Suite, OWASP ZAP, Wireshark, Nmap, FFUF, and Nuclei, remediating 50+ critical/high findings with zero recurrence.",
      "Participate in CTF competitions and bug-bounty programs to continuously refine offensive security skills.",
    ],
  },
  {
    role: "DevSecOps Engineer",
    org: "Contra",
    location: "Toronto, ON",
    start: "Aug 2025",
    end: "Jan 2026",
    bullets: [
      "Built automated vulnerability-scanning pipelines that increased scan coverage by 60% across client applications and cloud environments.",
      "Delivered actionable remediation reports with reproducible steps, reducing average time-to-patch across CI/CD pipelines by 38%.",
      "Performed web and mobile application security assessments, cutting exploitable vulnerabilities by 42% and improving deployment confidence.",
      "Executed audits of existing security controls, resolving 90% of critical findings within one sprint cycle to reinforce system integrity.",
      "Designed custom security-training programs that lifted client team phishing-simulation pass rates by 35%.",
    ],
  },
  {
    role: "Cybersecurity Observability & AI Engineer",
    org: "Ameya Data Solutions",
    location: "Mississauga, ON",
    start: "Dec 2024",
    end: "May 2025",
    bullets: [
      "Designed and deployed AI-powered threat detection and observability systems, reducing false-positive alerts by 38% and improving SOC visibility across 100+ endpoints.",
      "Built real-time monitoring pipelines integrating SIEM, IDS, IPS, EDR, and cloud telemetry, cutting mean incident-response time by 30% through automated, cross-source correlation.",
      "Developed custom dashboards and alerting frameworks (OpenSearch, Kibana, Python), reducing executive reporting turnaround by 50%.",
      "Strengthened AWS cloud security through IAM policy design, VPC segmentation, and Zero-Trust architecture aligned with NIST, CIS, and GDPR, reducing over-privileged IAM roles by 45%.",
      "Automated vulnerability management and compliance checks using Ansible and Python, cutting patch-cycle time by 40% across 20+ hosts.",
    ],
  },
  {
    role: "DevSecOps Engineer / Data Analyst Intern",
    org: "Ameya Data Solutions",
    location: "Mississauga, ON",
    start: "Aug 2023",
    end: "Nov 2024",
    bullets: [
      "Developed AI-enhanced EDR tools using Python, Snyk, and Trivy, improving vulnerability-detection coverage by 33% and automating CVE-level threat response.",
      "Designed and enforced AWS security groups, IAM policies, and VPC architectures aligned with NIST and GDPR standards, reducing misconfigured resources by 40%.",
      "Deployed Fluent Bit and integrated system/access logs into OpenSearch Dashboards (ELK Stack), cutting log-correlation and forensic-analysis time by 35%.",
      "Automated security configuration, patching, and compliance checks using Ansible playbooks and Docker containerization, reducing manual configuration effort by 50%.",
      "Conducted vulnerability assessments and system hardening across Windows, Linux, and macOS environments.",
      "Authored technical documentation and training manuals to promote cybersecurity awareness across engineering teams.",
    ],
  },
];

export const education: {
  school: string;
  degree: string;
  start: string;
  end: string;
}[] = [
  {
    school: "Ontario Tech University",
    degree: "Master of Information Technology Security, Artificial Intelligence (MITS-AI)",
    start: "Sep 2025",
    end: "Apr 2027",
  },
  {
    school: "Seneca Polytechnic",
    degree: "Honours Bachelor of Information Technology, Cybersecurity",
    start: "May 2021",
    end: "Aug 2025",
  },
  {
    school: "Humber Polytechnic",
    degree: "Engineering Diploma, Computer Systems Networking and Telecommunications",
    start: "Sep 2018",
    end: "May 2021",
  },
];

export const certifications: string[] = [
  "Pre Security — TryHackMe",
  "[PCEP-30-01] PCEP – Certified Entry-Level Python Programmer",
  "Offensive Pentesting — TryHackMe",
  "Google IT Automation with Python — Google / Coursera",
  "Advent of Cyber 2025 Competition — TryHackMe",
];
