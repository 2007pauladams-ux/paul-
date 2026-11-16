export type DegreeLevel = 'UG' | 'PG';
export type AcademicStream =
  | 'Engineering & Computing'
  | 'Sciences & Humanities'
  | 'Commerce & Management';

export interface CurriculumPhase {
  phaseLabel: string;
  focus: string;
  subjects: string[];
}

export interface CourseProgram {
  id: string;
  code: string;
  name: string;
  shortName: string;
  level: DegreeLevel;
  stream: AcademicStream;
  durationYears: number;
  semesters: number;
  intake: number;
  accreditation: string;
  eligibility: string;
  admissionMode: string;
  tuitionFeePerYear: number;
  labAcademicFeePerYear: number;
  examFeePerYear: number;
  medianPackage: string;
  placementRate: string;
  overview: string;
  careerPaths: string[];
  labs: string[];
  curriculum: CurriculumPhase[];
}

export interface HostelOption {
  id: string;
  label: string;
  roomType: string;
  annualFee: number;
  includes: string;
}

export interface TransportOption {
  id: string;
  label: string;
  distance: string;
  annualFee: number;
}

export interface ScholarshipTier {
  id: string;
  name: string;
  eligibility: string;
  benefitLabel: string;
  tuitionWaiverPercent: number;
  flatAnnualGrant: number;
  notes: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  caption: string;
  description: string;
  highlights: { label: string; value: string }[];
}

export const COLLEGE_INFO = {
  name: 'Sri Krishna College',
  fullTitle: 'Sri Krishna College of Arts, Science & Engineering',
  estYear: 1998,
  accreditation: "Autonomous · NAAC 'A+' (CGPA 3.48) · AICTE & UGC Recognized",
  locationShort: 'Kuniyamuthur, Coimbatore',
  address: 'Kuniyamuthur, Palakkad Main Road, Coimbatore – 641008, Tamil Nadu',
  admissionsPhone: '+91 422 267 8001',
  generalPhone: '+91 422 267 8000',
  email: 'admissions@srikrishnacollege.edu.in',
  visitingHours: 'Mon–Sat, 09:00–17:00 IST',
  cautionDeposit: 10000,
  registrationFee: 1500,
};

export const INSTITUTIONAL_SNAPSHOT = [
  { value: '28+', label: 'UG, PG & Research Programs', detail: 'Across 3 academic schools' },
  { value: '94.6%', label: 'Placement Record (2025)', detail: '1,420+ verified offers' },
  { value: '14 : 1', label: 'Student-to-Faculty Ratio', detail: '72% doctoral faculty' },
  { value: '₹7.8 LPA', label: 'Median Graduate Package', detail: 'Highest offer ₹32.0 LPA' },
];

export const COURSE_PROGRAMS: CourseProgram[] = [
  {
    id: 'be-cse',
    code: 'SKC-UG-101',
    name: 'B.E. Computer Science & Engineering',
    shortName: 'B.E. CSE',
    level: 'UG',
    stream: 'Engineering & Computing',
    durationYears: 4,
    semesters: 8,
    intake: 180,
    accreditation: 'NBA Accredited (Tier-I)',
    eligibility: '10+2 with Physics, Chemistry & Mathematics (Min. 60% aggregate)',
    admissionMode: 'TNEA Counseling / SKC Engineering Merit List',
    tuitionFeePerYear: 125000,
    labAcademicFeePerYear: 22000,
    examFeePerYear: 6000,
    medianPackage: '₹8.6 LPA',
    placementRate: '97.2%',
    overview:
      'Built on rigorous systems engineering, algorithms, distributed computing, and cloud architecture with mandatory 6-month industry capstone.',
    careerPaths: [
      'Systems Software Engineer',
      'Distributed Cloud Architect',
      'Full-Stack Product Developer',
      'Security Systems Analyst',
    ],
    labs: [
      'High-Performance Computing Cluster',
      'Systems & Kernel Programming Studio',
      'Cybersecurity & Network Forensics Lab',
    ],
    curriculum: [
      {
        phaseLabel: 'Semesters 1–2',
        focus: 'Mathematical & Computing Foundations',
        subjects: [
          'Linear Algebra & Discrete Mathematics',
          'Structured & Object-Oriented Programming in C++',
          'Digital Logic & Computer Organization',
          'Engineering Physics & Technical Communication',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Core Algorithms & Operating Systems',
        subjects: [
          'Data Structures & Algorithmic Analysis',
          'Operating Systems & POSIX Concurrency',
          'Database Management Systems (SQL & Internals)',
          'Computer Networks & Protocol Engineering',
        ],
      },
      {
        phaseLabel: 'Semesters 5–6',
        focus: 'Compilers, Cloud & Applied Systems',
        subjects: [
          'Compiler Design & Formal Automata',
          'Distributed Systems & Cloud Infrastructure',
          'Software Architecture & Testing Automation',
          'Open Electives in Cryptography or Embedded Systems',
        ],
      },
      {
        phaseLabel: 'Semesters 7–8',
        focus: 'Industry Specialization & Capstone',
        subjects: [
          'Site Reliability & Production Engineering',
          'Undergraduate Honors Research Project',
          '6-Month Full-Time Industry Internship',
          'Ethics in Computing & Intellectual Property',
        ],
      },
    ],
  },
  {
    id: 'btech-aids',
    code: 'SKC-UG-102',
    name: 'B.Tech. Artificial Intelligence & Data Science',
    shortName: 'B.Tech. AI & DS',
    level: 'UG',
    stream: 'Engineering & Computing',
    durationYears: 4,
    semesters: 8,
    intake: 120,
    accreditation: 'AICTE Approved · Industry Co-Designed',
    eligibility: '10+2 with Mathematics, Physics & Chemistry (Min. 60% aggregate)',
    admissionMode: 'TNEA Counseling / SKC Entrance Assessment',
    tuitionFeePerYear: 132000,
    labAcademicFeePerYear: 26000,
    examFeePerYear: 6000,
    medianPackage: '₹9.2 LPA',
    placementRate: '96.5%',
    overview:
      'Combines statistical learning theory, GPU-accelerated deep learning, and large-scale data engineering with real-world domain datasets.',
    careerPaths: [
      'Machine Learning Engineer',
      'Applied Data Scientist',
      'MLOps & Data Platform Engineer',
      'Computer Vision Specialist',
    ],
    labs: [
      'NVIDIA GPU Deep Learning Compute Lab',
      'Natural Language & Speech Processing Studio',
      'Big Data & Streaming Analytics Cluster',
    ],
    curriculum: [
      {
        phaseLabel: 'Semesters 1–2',
        focus: 'Probability, Calculus & Python Foundations',
        subjects: [
          'Multivariable Calculus & Matrix Theory',
          'Scientific Computing with Python',
          'Foundations of Data Representation',
          'Digital Systems & Architecture',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Statistical Inference & Machine Learning',
        subjects: [
          'Probability & Statistical Modeling',
          'Supervised & Unsupervised Learning',
          'Data Engineering & Distributed Storage',
          'Algorithms for Massive Datasets',
        ],
      },
      {
        phaseLabel: 'Semesters 5–6',
        focus: 'Deep Learning & Domain Intelligence',
        subjects: [
          'Neural Networks & Computer Vision',
          'Natural Language Processing & Transformers',
          'Reinforcement Learning & Decision Theory',
          'Causal Inference & Responsible AI Auditing',
        ],
      },
      {
        phaseLabel: 'Semesters 7–8',
        focus: 'Production MLOps & Research Thesis',
        subjects: [
          'Model Deployment & Edge Optimization',
          'Industry Capstone Practicum',
          'Published Undergraduate Thesis Seminar',
          'Data Governance & Regulatory Compliance',
        ],
      },
    ],
  },
  {
    id: 'be-ece',
    code: 'SKC-UG-104',
    name: 'B.E. Electronics & Communication Engineering',
    shortName: 'B.E. ECE',
    level: 'UG',
    stream: 'Engineering & Computing',
    durationYears: 4,
    semesters: 8,
    intake: 120,
    accreditation: 'NBA Accredited (Tier-I)',
    eligibility: '10+2 with Physics, Chemistry & Mathematics (Min. 55% aggregate)',
    admissionMode: 'TNEA Counseling / SKC Merit Quota',
    tuitionFeePerYear: 115000,
    labAcademicFeePerYear: 20000,
    examFeePerYear: 6000,
    medianPackage: '₹7.4 LPA',
    placementRate: '93.8%',
    overview:
      'Focuses on VLSI chip design, embedded firmware, RF communications, and autonomous robotics hardware with Cadence and Xilinx lab suites.',
    careerPaths: [
      'VLSI Design & Verification Engineer',
      'Embedded Firmware Architect',
      'RF & 5G Telecom Engineer',
      'Robotics Control Systems Engineer',
    ],
    labs: [
      'Cadence VLSI Design & Verification Lab',
      'Embedded RTOS & ARM Microcontroller Studio',
      'Microwave & Optical Communication Bench',
    ],
    curriculum: [
      {
        phaseLabel: 'Semesters 1–2',
        focus: 'Circuit Theory & Semiconductor Physics',
        subjects: [
          'Electronic Devices & Circuit Analysis',
          'Engineering Mathematics & Vector Calculus',
          'C Programming for Hardware Engineers',
          'Workshop & PCB Prototyping',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Analog, Digital & Signal Processing',
        subjects: [
          'Analog Integrated Circuits',
          'Digital Signal Processing',
          'Signals, Systems & Transforms',
          'Electromagnetic Fields & Waveguides',
        ],
      },
      {
        phaseLabel: 'Semesters 5–6',
        focus: 'VLSI, Embedded Systems & Wireless',
        subjects: [
          'CMOS VLSI Design & Verilog HDL',
          'Microcontrollers & Real-Time OS',
          'Wireless & 5G Digital Communications',
          'Antenna Design & RF Systems',
        ],
      },
      {
        phaseLabel: 'Semesters 7–8',
        focus: 'Silicon Tape-Out Prep & Internship',
        subjects: [
          'System-on-Chip Verification',
          'Industrial Automation & Robotics Control',
          'Hardware Capstone & Semiconductor Internship',
          'Hardware Security & Testing',
        ],
      },
    ],
  },
  {
    id: 'be-mech',
    code: 'SKC-UG-107',
    name: 'B.E. Mechanical & Mechatronics Engineering',
    shortName: 'B.E. Mechanical',
    level: 'UG',
    stream: 'Engineering & Computing',
    durationYears: 4,
    semesters: 8,
    intake: 60,
    accreditation: 'NBA Accredited',
    eligibility: '10+2 with Physics, Chemistry & Mathematics (Min. 55% aggregate)',
    admissionMode: 'TNEA Counseling / SKC Merit Quota',
    tuitionFeePerYear: 105000,
    labAcademicFeePerYear: 18000,
    examFeePerYear: 6000,
    medianPackage: '₹6.5 LPA',
    placementRate: '90.4%',
    overview:
      'Integrates classical thermodynamics, CAD/CAM precision manufacturing, EV powertrain engineering, and industrial robotics.',
    careerPaths: [
      'EV Powertrain Design Engineer',
      'CAD/CAE Simulation Specialist',
      'Robotics & Automation Engineer',
      'Thermal Systems Analyst',
    ],
    labs: [
      '5-Axis CNC & Additive Manufacturing Bay',
      'EV Battery & Motor Dynamometer Lab',
      'Fluid Mechanics & Thermal Testing Hall',
    ],
    curriculum: [
      {
        phaseLabel: 'Semesters 1–2',
        focus: 'Statics, Materials & Engineering Graphics',
        subjects: [
          'Engineering Mechanics & Statics',
          'Materials Science & Metallurgy',
          'Parametric CAD Modeling',
          'Applied Mathematics I & II',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Thermodynamics & Machine Kinematics',
        subjects: [
          'Engineering Thermodynamics',
          'Fluid Mechanics & Hydraulic Machines',
          'Kinematics & Dynamics of Machinery',
          'Manufacturing Metrology',
        ],
      },
      {
        phaseLabel: 'Semesters 5–6',
        focus: 'Finite Element Analysis & Mechatronics',
        subjects: [
          'Heat & Mass Transfer',
          'Finite Element Method (ANSYS)',
          'Mechatronic Actuators & PLC Control',
          'Electric & Hybrid Vehicle Architectures',
        ],
      },
      {
        phaseLabel: 'Semesters 7–8',
        focus: 'Plant Design & Industrial Residency',
        subjects: [
          'Robotics Kinematics & Path Planning',
          'Lean Manufacturing & Six Sigma',
          'Coimbatore Industrial Cluster Residency',
          'Senior Prototype Fabrication Project',
        ],
      },
    ],
  },
  {
    id: 'bsc-cs',
    code: 'SKC-UG-201',
    name: 'B.Sc. Computer Science (Honors)',
    shortName: 'B.Sc. CS',
    level: 'UG',
    stream: 'Sciences & Humanities',
    durationYears: 3,
    semesters: 6,
    intake: 120,
    accreditation: 'Autonomous Honors Curriculum',
    eligibility: '10+2 with Mathematics / Computer Science (Min. 55% aggregate)',
    admissionMode: 'Merit-Based Direct Admission & Interview',
    tuitionFeePerYear: 72000,
    labAcademicFeePerYear: 14000,
    examFeePerYear: 4500,
    medianPackage: '₹5.4 LPA',
    placementRate: '92.0%',
    overview:
      'Focused three-year honors science program emphasizing software craftsmanship, web platforms, database systems, and applied mathematics.',
    careerPaths: [
      'Application Software Developer',
      'Cloud Operations Associate',
      'QA & Automation Engineer',
      'Data Analyst',
    ],
    labs: [
      'Open Source Software Studio',
      'Cloud & Web Engineering Lab',
      'Quantitative Computing Lab',
    ],
    curriculum: [
      {
        phaseLabel: 'Semesters 1–2',
        focus: 'Programming Logic & Discrete Foundations',
        subjects: [
          'Programming in C & Python',
          'Discrete Mathematical Structures',
          'Digital Computer Fundamentals',
          'Web Markup & Interface Standards',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Data Structures & Enterprise Databases',
        subjects: [
          'Data Structures & Java Programming',
          'Relational Databases & PL/SQL',
          'Operating Systems Architecture',
          'Statistical Methods for Computing',
        ],
      },
      {
        phaseLabel: 'Semesters 5–6',
        focus: 'Full-Stack Engineering & Capstone',
        subjects: [
          'Modern Web & API Engineering',
          'Cloud Computing Essentials',
          'Machine Learning Foundations',
          'Final Semester Software Project',
        ],
      },
    ],
  },
  {
    id: 'bsc-biotech',
    code: 'SKC-UG-204',
    name: 'B.Sc. Biotechnology & Molecular Sciences',
    shortName: 'B.Sc. Biotech',
    level: 'UG',
    stream: 'Sciences & Humanities',
    durationYears: 3,
    semesters: 6,
    intake: 60,
    accreditation: 'DBT-STAR Supported Department',
    eligibility: '10+2 with Biology / Chemistry / Biotechnology (Min. 55%)',
    admissionMode: 'Merit-Based Direct Admission',
    tuitionFeePerYear: 68000,
    labAcademicFeePerYear: 16000,
    examFeePerYear: 4500,
    medianPackage: '₹4.8 LPA',
    placementRate: '88.5%',
    overview:
      'Hands-on wet-lab training in molecular genetics, bioprocess engineering, and computational bioinformatics preparing students for pharma R&D and M.Sc. fellowships.',
    careerPaths: [
      'Bioprocess Research Associate',
      'Clinical Genomics Analyst',
      'Pharmaceutical QC Specialist',
      'Bioinformatics Junior Fellow',
    ],
    labs: [
      'Cell Culture & Molecular Biology Lab',
      'Bioprocess Fermentation Suite',
      'Computational Bioinformatics Lab',
    ],
    curriculum: [
      {
        phaseLabel: 'Semesters 1–2',
        focus: 'Cell Biology & Biomolecular Chemistry',
        subjects: [
          'Microbiology & Cell Structure',
          'Bio-Organic Chemistry',
          'Biophysics & Analytical Instrumentation',
          'Biostatistics Fundamentals',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Genetics & Recombinant Technology',
        subjects: [
          'Molecular Genetics & Gene Regulation',
          'Immunology & Diagnostic Assays',
          'Recombinant DNA Technology',
          'Enzymology & Metabolic Pathways',
        ],
      },
      {
        phaseLabel: 'Semesters 5–6',
        focus: 'Bioprocess & Research Dissertation',
        subjects: [
          'Industrial Bioprocess Engineering',
          'Sequence Analysis & Bioinformatics',
          'Biosafety & Bioethics',
          'Wet-Lab Dissertation Project',
        ],
      },
    ],
  },
  {
    id: 'bcom-af',
    code: 'SKC-UG-301',
    name: 'B.Com. Accounting & Finance (with CA/ACCA Track)',
    shortName: 'B.Com. A&F',
    level: 'UG',
    stream: 'Commerce & Management',
    durationYears: 3,
    semesters: 6,
    intake: 180,
    accreditation: 'ACCA Academic Partner · Autonomous',
    eligibility: '10+2 in Commerce / Accountancy / Mathematics (Min. 60%)',
    admissionMode: 'Merit-Based Selection & Personal Interview',
    tuitionFeePerYear: 65000,
    labAcademicFeePerYear: 8500,
    examFeePerYear: 4500,
    medianPackage: '₹5.8 LPA',
    placementRate: '94.2%',
    overview:
      'Integrates Indian & International Financial Reporting Standards (IFRS), corporate taxation, and financial modeling with embedded ACCA paper exemptions.',
    careerPaths: [
      'Audit & Assurance Associate',
      'Corporate Financial Analyst',
      'Taxation & Compliance Consultant',
      'Investment Banking Operations',
    ],
    labs: [
      'Bloomberg & Financial Markets Terminal Lab',
      'ERP Tally Prime & SAP FICO Studio',
    ],
    curriculum: [
      {
        phaseLabel: 'Semesters 1–2',
        focus: 'Financial Accounting & Business Economics',
        subjects: [
          'Financial Accounting Standards',
          'Micro & Macroeconomic Policy',
          'Business Law & Corporate Governance',
          'Quantitative Techniques for Finance',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Costing, Taxation & Corporate Reporting',
        subjects: [
          'Corporate Accounting & Consolidation',
          'Cost & Management Accounting',
          'Direct & GST Taxation Practice',
          'Financial Statement Analysis',
        ],
      },
      {
        phaseLabel: 'Semesters 5–6',
        focus: 'IFRS, Valuation & Treasury Markets',
        subjects: [
          'International Financial Reporting (IFRS)',
          'Security Analysis & Portfolio Valuation',
          'Auditing & Assurance Standards',
          'Corporate Finance Practicum',
        ],
      },
    ],
  },
  {
    id: 'bba-ba',
    code: 'SKC-UG-304',
    name: 'BBA Business Analytics & Strategy',
    shortName: 'BBA Analytics',
    level: 'UG',
    stream: 'Commerce & Management',
    durationYears: 3,
    semesters: 6,
    intake: 90,
    accreditation: 'Autonomous Honors Track',
    eligibility: '10+2 in any discipline (Min. 55% aggregate)',
    admissionMode: 'SKC Management Aptitude Test & Interview',
    tuitionFeePerYear: 74000,
    labAcademicFeePerYear: 10000,
    examFeePerYear: 4500,
    medianPackage: '₹5.6 LPA',
    placementRate: '91.5%',
    overview:
      'Blends foundational management principles—marketing, operations, HR, and strategy—with SQL, Tableau, and predictive business analytics.',
    careerPaths: [
      'Business Operations Analyst',
      'Product Growth Associate',
      'Supply Chain Coordinator',
      'Management Consultant Trainee',
    ],
    labs: [
      'Business Intelligence & Visualization Lab',
      'Management Simulation & Case Room',
    ],
    curriculum: [
      {
        phaseLabel: 'Semesters 1–2',
        focus: 'Management Principles & Business Statistics',
        subjects: [
          'Principles of Management & Organization',
          'Managerial Economics',
          'Business Statistics & Excel Modeling',
          'Financial Accounting for Managers',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Marketing, Operations & Data Querying',
        subjects: [
          'Consumer Behavior & Brand Strategy',
          'Operations & Supply Chain Management',
          'SQL & Business Intelligence Dashboards',
          'Corporate Finance & Budgeting',
        ],
      },
      {
        phaseLabel: 'Semesters 5–6',
        focus: 'Predictive Strategy & Corporate Capstone',
        subjects: [
          'Predictive Marketing Analytics',
          'Strategic Management & Entrepreneurship',
          'Business Consulting Immersion',
          'Industry Capstone Case Defense',
        ],
      },
    ],
  },
  {
    id: 'mba-global',
    code: 'SKC-PG-401',
    name: 'MBA (Dual Specialization: Finance, Analytics, Marketing, HR)',
    shortName: 'MBA',
    level: 'PG',
    stream: 'Commerce & Management',
    durationYears: 2,
    semesters: 4,
    intake: 120,
    accreditation: 'AICTE Approved · Autonomous',
    eligibility: 'Any Bachelor Degree (Min. 55%) + TANCET / CAT / MAT / CMAT',
    admissionMode: 'Entrance Score + Case Group Discussion + Personal Interview',
    tuitionFeePerYear: 145000,
    labAcademicFeePerYear: 18000,
    examFeePerYear: 7500,
    medianPackage: '₹9.4 LPA',
    placementRate: '96.0%',
    overview:
      'Case-method graduate management program featuring Harvard/IIM case pedagogy, dual functional specializations, and a mandatory 8-week summer corporate residency.',
    careerPaths: [
      'Investment & Corporate Banking Associate',
      'Strategy & Management Consultant',
      'Product Marketing Manager',
      'Enterprise Analytics Lead',
    ],
    labs: [
      'Capital Markets & FinTech Simulation Lab',
      'Executive Case Discussion Amphitheater',
    ],
    curriculum: [
      {
        phaseLabel: 'Semester 1',
        focus: 'Core Management Foundations',
        subjects: [
          'Managerial Economics & Accounting',
          'Organizational Leadership',
          'Quantitative Decision Modeling',
          'Marketing Management',
        ],
      },
      {
        phaseLabel: 'Semester 2',
        focus: 'Functional Integration & Research',
        subjects: [
          'Corporate Finance & Valuation',
          'Operations & Global Supply Chains',
          'Business Research Methodology',
          'Summer Corporate Internship (8 Weeks)',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Dual Specialization & Strategic Capstone',
        subjects: [
          'Primary Specialization Electives (4 Courses)',
          'Secondary Specialization Electives (3 Courses)',
          'Strategic Leadership & Global Trade',
          'Live Boardroom Consulting Dissertation',
        ],
      },
    ],
  },
  {
    id: 'mca-comp',
    code: 'SKC-PG-402',
    name: 'MCA Master of Computer Applications',
    shortName: 'MCA',
    level: 'PG',
    stream: 'Engineering & Computing',
    durationYears: 2,
    semesters: 4,
    intake: 60,
    accreditation: 'AICTE Approved',
    eligibility: 'BCA / B.Sc. CS / Any Degree with Mathematics at 10+2 or UG (Min. 55%)',
    admissionMode: 'TANCET / SKC PG Computing Entrance',
    tuitionFeePerYear: 110000,
    labAcademicFeePerYear: 20000,
    examFeePerYear: 7000,
    medianPackage: '₹7.9 LPA',
    placementRate: '95.0%',
    overview:
      'Accelerated postgraduate software engineering degree covering enterprise cloud systems, microservices, applied machine learning, and production security.',
    careerPaths: [
      'Enterprise Software Engineer',
      'Cloud Platform Developer',
      'Solutions Architect',
      'Database Reliability Engineer',
    ],
    labs: [
      'Enterprise Cloud & DevOps Lab',
      'Applied AI & Software Architecture Studio',
    ],
    curriculum: [
      {
        phaseLabel: 'Semester 1',
        focus: 'Advanced Computing & Algorithms',
        subjects: [
          'Advanced Data Structures & Graph Algorithms',
          'Modern Operating Systems & Virtualization',
          'Enterprise Database Internals',
          'Discrete Mathematical Logic',
        ],
      },
      {
        phaseLabel: 'Semester 2',
        focus: 'Distributed Web & Cloud Platforms',
        subjects: [
          'Cloud-Native Microservices',
          'Full-Stack TypeScript & React Systems',
          'Information Security & Network Defense',
          'Applied Statistical Learning',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'AI Systems & 6-Month Industry Residency',
        subjects: [
          'Generative & Applied AI Engineering',
          'Software Project Management & DevSecOps',
          'Full-Semester Enterprise Residency & Thesis',
        ],
      },
    ],
  },
  {
    id: 'msc-ds',
    code: 'SKC-PG-405',
    name: 'M.Sc. Data Science & Computational Statistics',
    shortName: 'M.Sc. Data Science',
    level: 'PG',
    stream: 'Sciences & Humanities',
    durationYears: 2,
    semesters: 4,
    intake: 40,
    accreditation: 'Autonomous Research-Led PG',
    eligibility: 'B.Sc. Mathematics / Statistics / Computer Science / B.E. (Min. 55%)',
    admissionMode: 'SKC PG Merit & Quantitative Interview',
    tuitionFeePerYear: 88000,
    labAcademicFeePerYear: 16000,
    examFeePerYear: 5500,
    medianPackage: '₹7.6 LPA',
    placementRate: '93.5%',
    overview:
      'Mathematically rigorous master’s degree focused on Bayesian inference, stochastic modeling, econometrics, and scalable machine learning.',
    careerPaths: [
      'Quantitative Data Scientist',
      'Biostatistics & Pharma Analyst',
      'Risk & Credit Modeler',
      'Ph.D. Research Scholar',
    ],
    labs: [
      'Statistical Computing & R/Python Lab',
      'GPU High-Performance Analytics Cluster',
    ],
    curriculum: [
      {
        phaseLabel: 'Semester 1',
        focus: 'Measure-Theoretic Probability & Linear Models',
        subjects: [
          'Probability Theory & Stochastic Processes',
          'Linear Algebra & Convex Optimization',
          'Statistical Computing in Python & R',
          'Relational & Columnar Data Warehousing',
        ],
      },
      {
        phaseLabel: 'Semester 2',
        focus: 'Machine Learning & Bayesian Inference',
        subjects: [
          'Statistical Learning Theory',
          'Bayesian Computation & MCMC',
          'Time-Series & Econometric Forecasting',
          'Distributed Data Processing (Spark)',
        ],
      },
      {
        phaseLabel: 'Semesters 3–4',
        focus: 'Deep Learning & Master Thesis',
        subjects: [
          'Deep Neural Architectures & NLP',
          'Causal Inference in Observational Data',
          '6-Month Research Thesis or Industry Internship',
        ],
      },
    ],
  },
];

export const HOSTEL_OPTIONS: HostelOption[] = [
  {
    id: 'day-scholar',
    label: 'Day Scholar (No Hostel)',
    roomType: 'Off-campus / Commuter',
    annualFee: 0,
    includes: 'Campus library & dining hall access (pay-as-you-go)',
  },
  {
    id: 'shared-non-ac',
    label: '4-Sharing Non-AC Hostel + Mess',
    roomType: 'Standard Residential Block',
    annualFee: 82000,
    includes: 'Furnished room, 4 daily hygienic veg/non-veg meals, 24/7 Wi-Fi, laundry & medical care',
  },
  {
    id: 'twin-non-ac',
    label: 'Twin-Sharing Non-AC Hostel + Mess',
    roomType: 'Classic Courtyard Block',
    annualFee: 98000,
    includes: 'Twin study room, 4 daily meals, high-speed Wi-Fi, reading lounge & gym access',
  },
  {
    id: 'twin-ac',
    label: 'Twin-Sharing AC Hostel + Mess',
    roomType: 'Executive Scholars Wing',
    annualFee: 126000,
    includes: 'Air-conditioned twin suite, attached bath, 4 daily meals, study desk & fitness center',
  },
];

export const TRANSPORT_OPTIONS: TransportOption[] = [
  { id: 'none', label: 'No Campus Bus Required', distance: 'Hostel resident or private commute', annualFee: 0 },
  { id: 'zone-a', label: 'Coimbatore City Zone A', distance: 'Up to 15 km radius', annualFee: 22000 },
  { id: 'zone-b', label: 'Outer Ring & Pollachi Zone B', distance: '15–35 km radius', annualFee: 31000 },
];

export const SCHOLARSHIP_TIERS: ScholarshipTier[] = [
  {
    id: 'none',
    name: 'Standard Fee Category (No Waiver)',
    eligibility: 'Meets standard program entry criteria',
    benefitLabel: '0% Tuition Waiver',
    tuitionWaiverPercent: 0,
    flatAnnualGrant: 0,
    notes: 'Eligible for bank education loan documentation support.',
  },
  {
    id: 'chancellor-95',
    name: "Chancellor's Academic Excellence Award",
    eligibility: '95%+ in 10+2 Board Exams or Top 1% Entrance Rank',
    benefitLabel: '50% Tuition Fee Waiver',
    tuitionWaiverPercent: 50,
    flatAnnualGrant: 0,
    notes: 'Renewable annually upon maintaining CGPA ≥ 8.5 with zero arrears.',
  },
  {
    id: 'merit-90',
    name: 'Sri Krishna Merit Scholarship',
    eligibility: '90%–94.9% in 10+2 Board Exams or Top 5% Entrance Rank',
    benefitLabel: '25% Tuition Fee Waiver',
    tuitionWaiverPercent: 25,
    flatAnnualGrant: 0,
    notes: 'Renewable annually upon maintaining CGPA ≥ 8.0.',
  },
  {
    id: 'sports-national',
    name: 'National & State Sports / Cultural Fellowship',
    eligibility: 'Verified State/National medallist representation',
    benefitLabel: '30% Tuition Waiver',
    tuitionWaiverPercent: 30,
    flatAnnualGrant: 0,
    notes: 'Includes free athletic coaching & tournament travel support.',
  },
  {
    id: 'first-grad',
    name: 'First-Generation Graduate Grant',
    eligibility: 'First in family to pursue higher education (Govt. verified)',
    benefitLabel: '₹25,000 / Year Grant',
    tuitionWaiverPercent: 0,
    flatAnnualGrant: 25000,
    notes: 'Can be combined with Tamil Nadu State Post-Matric schemes.',
  },
];

export const CAMPUS_FACILITIES: FacilityItem[] = [
  {
    id: 'library',
    title: 'Central Library & Digital Commons',
    subtitle: '42,000 sq. ft. Silent Scholarly Pavilion',
    image: '/src/assets/images/campus_library_hall_1794810348522.jpg',
    imageAlt: 'Interior of the Sri Krishna College Central Library with tall arched windows and teak study tables',
    caption: 'Fig. 1 — Main Reading Hall, Central Library & Digital Knowledge Commons',
    description:
      'Open from 07:30 to 22:00 on weekdays (extended to midnight during semester examinations), housing print volumes, IEEE/ACM/Springer digital journals, and quiet individual research carrels.',
    highlights: [
      { label: 'Print Volumes', value: '1,24,000+' },
      { label: 'E-Journals & Databases', value: '18,500+' },
      { label: 'Seating Capacity', value: '680 Readers' },
      { label: 'Reading Hours', value: '07:30–22:00' },
    ],
  },
  {
    id: 'labs',
    title: 'Advanced Research & Robotics Labs',
    subtitle: '24 Specialized Engineering & Science Studios',
    image: '/src/assets/images/engineering_robotics_lab_1794810349630.jpg',
    imageAlt: 'Students collaborating with a faculty mentor around a robotic arm in the Sri Krishna College engineering lab',
    caption: 'Fig. 2 — Center for Autonomous Systems & Applied AI Laboratory',
    description:
      'Equipped with NVIDIA A100 compute nodes, Cadence VLSI EDA suites, 5-axis CNC fabrication tools, and wet-lab molecular sequencers so undergraduates participate in funded research from year two.',
    highlights: [
      { label: 'Compute Nodes', value: '64 GPU Nodes' },
      { label: 'Industry Co-Labs', value: '11 Centers' },
      { label: 'Annual Patent Filings', value: '42+ Filings' },
      { label: 'Lab Access', value: 'Faculty-Mentored' },
    ],
  },
  {
    id: 'athletics',
    title: 'Residential Hostels & Athletic Grounds',
    subtitle: '56-Acre Green Campus in Kuniyamuthur',
    image: '/src/assets/images/campus_auditorium_sports_1794810349445.jpg',
    imageAlt: 'Crimson running track and green athletic field beside the sandstone pavilion at Sri Krishna College',
    caption: 'Fig. 3 — 400m Synthetic Athletic Track & Student Residential Pavilion',
    description:
      'Separate, secured residential blocks for men and women with 24/7 resident wardens, solar-heated water, hygienic dining halls, an 8-lane synthetic track, indoor badminton courts, and an on-campus 12-bed clinic.',
    highlights: [
      { label: 'Hostel Capacity', value: '2,800+ Beds' },
      { label: 'Athletic Facilities', value: '400m Track & Courts' },
      { label: 'Medical Care', value: '24/7 Resident Nurse' },
      { label: 'Campus Security', value: 'Biometric & CCTV' },
    ],
  },
];

export const ADMISSION_STEPS = [
  {
    step: '01. Online Registration',
    window: 'May 05 – June 28, 2026',
    detail: 'Submit academic records, program preferences (up to 3 choices), and entrance test scores online or at the campus admissions desk.',
  },
  {
    step: '02. Merit List & Counseling',
    window: 'July 04 – July 14, 2026',
    detail: 'Provisional merit lists are published transparently by stream. Shortlisted candidates attend on-campus or video counseling.',
  },
  {
    step: '03. Verification & Fee Remittance',
    window: 'July 15 – July 24, 2026',
    detail: 'Submit original certificates for verification and remit Semester 1 / Annual tuition fee via NEFT, UPI, or Demand Draft.',
  },
  {
    step: '04. Induction & Orientation',
    window: 'August 03, 2026',
    detail: '2-week foundational bridge program in mathematics, computing, and academic writing prior to commencement of classes.',
  },
];

export const REQUIRED_DOCUMENTS = [
  'Class 10 & Class 12 (or UG) Original Mark Statements',
  'Transfer Certificate (TC) & Conduct Certificate from last attended institution',
  'TNEA / TANCET / CAT / Entrance Examination Score Card (where applicable)',
  'Community / First Graduate Certificate (if claiming reservation or fee grant)',
  'Aadhaar Card Copy & 4 Recent Passport-Size Color Photographs',
  'Migration Certificate (for students outside Tamil Nadu State Board)',
];

export const TOP_RECRUITERS = [
  'Zoho Corporation',
  'Tata Consultancy Services (Digital)',
  'Bosch Global Software',
  'L&T Technology Services',
  'Cognizant GenC Next',
  'Deloitte Consulting',
  'Caterpillar India',
  'Schneider Electric',
  'Freshworks',
  'EY Global Delivery',
  'Qualcomm India',
  'Titan Engineering',
];

export const TESTIMONIALS = [
  {
    name: 'Ananya Balasubramanian',
    degree: 'B.E. Computer Science, Class of 2025',
    role: 'Systems Software Engineer at Zoho Corporation',
    quote:
      'Before joining Sri Krishna College, I had never written production C++ or worked on Linux kernels. Two years in the Systems Studio and our six-month internship gave me the depth to clear five technical rounds directly on campus.',
  },
  {
    name: 'Karthik Subramanian',
    degree: 'MBA Finance & Analytics, Class of 2025',
    role: 'Financial Advisory Analyst at Deloitte',
    quote:
      'The Bloomberg terminal labs and strict case-method seminars transformed how I model corporate valuations. My merit scholarship covered 25% of tuition, and I secured my offer two months before final exams.',
  },
  {
    name: 'Meenakshi Sundaram',
    degree: 'B.E. Electronics & Communication, Class of 2024',
    role: 'RTL Verification Engineer at Qualcomm India',
    quote:
      'Access to full Cadence VLSI suites during undergraduate semesters is rare. Our faculty mentors guided our final-year ASIC verification project to a national symposium win and direct core-engineering placement.',
  },
];

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: AcademicStream;
  subDepartment: string;
  qualification: string;
  experienceYears: number;
  specialization: string;
  email: string;
  officeHours: string;
}

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. R. Venkataramanan',
    designation: 'Professor & Dean of Engineering',
    department: 'Engineering & Computing',
    subDepartment: 'Computer Science & Engineering',
    qualification: 'Ph.D. (IISc Bengaluru), M.E. (Anna University)',
    experienceYears: 24,
    specialization: 'Distributed Operating Systems, Cloud Reliability & Fault Tolerance',
    email: 'venkataramanan.r@srikrishnacollege.edu.in',
    officeHours: 'Mon & Wed, 14:00–16:30',
  },
  {
    id: 'fac-2',
    name: 'Dr. S. Kavitha Priyadharshini',
    designation: 'Professor & Head of Department',
    department: 'Engineering & Computing',
    subDepartment: 'Artificial Intelligence & Data Science',
    qualification: 'Ph.D. (IIT Madras), M.Tech. (NIT Tiruchirappalli)',
    experienceYears: 18,
    specialization: 'Computer Vision, Medical Imaging & Explainable Deep Learning',
    email: 'kavitha.s@srikrishnacollege.edu.in',
    officeHours: 'Tue & Thu, 15:00–17:00',
  },
  {
    id: 'fac-3',
    name: 'Dr. M. Balasubramaniyan',
    designation: 'Professor & Head of Department',
    department: 'Engineering & Computing',
    subDepartment: 'Electronics & Communication',
    qualification: 'Ph.D. (Anna University), M.E. VLSI Design',
    experienceYears: 21,
    specialization: 'Low-Power CMOS VLSI Architectures & RISC-V SoC Verification',
    email: 'balasubramaniyan.m@srikrishnacollege.edu.in',
    officeHours: 'Mon & Fri, 14:30–16:30',
  },
  {
    id: 'fac-4',
    name: 'Dr. P. Senthil Kumar',
    designation: 'Associate Professor',
    department: 'Engineering & Computing',
    subDepartment: 'Mechanical & Mechatronics',
    qualification: 'Ph.D. (PSG Tech), M.E. CAD/CAM',
    experienceYears: 16,
    specialization: 'Electric Vehicle Thermal Management & Industrial Robotics',
    email: 'senthilkumar.p@srikrishnacollege.edu.in',
    officeHours: 'Wed & Fri, 11:00–13:00',
  },
  {
    id: 'fac-5',
    name: 'Dr. N. Lakshmi Narayanan',
    designation: 'Professor & Dean of Sciences',
    department: 'Sciences & Humanities',
    subDepartment: 'Data Science & Computational Statistics',
    qualification: 'Ph.D. Statistics (Madras University), M.Sc.',
    experienceYears: 22,
    specialization: 'Bayesian Inference, Stochastic Forecasting & Biostatistics',
    email: 'lakshmi.n@srikrishnacollege.edu.in',
    officeHours: 'Tue & Thu, 14:00–16:00',
  },
  {
    id: 'fac-6',
    name: 'Dr. A. Revathi Devi',
    designation: 'Associate Professor & Lab Director',
    department: 'Sciences & Humanities',
    subDepartment: 'Biotechnology & Molecular Sciences',
    qualification: 'Ph.D. Biotechnology (Bharathiar University)',
    experienceYears: 15,
    specialization: 'Recombinant Protein Expression & Microbial Bioprocessing',
    email: 'revathi.a@srikrishnacollege.edu.in',
    officeHours: 'Mon & Thu, 15:00–17:00',
  },
  {
    id: 'fac-7',
    name: 'Dr. K. Rajagopalan',
    designation: 'Professor & Dean of Management',
    department: 'Commerce & Management',
    subDepartment: 'MBA Global & Strategy',
    qualification: 'Ph.D. Finance (IIM Kozhikode Fellow), CFA Charterholder',
    experienceYears: 20,
    specialization: 'Corporate Valuation, FinTech Risk & Capital Markets',
    email: 'rajagopalan.k@srikrishnacollege.edu.in',
    officeHours: 'Wed & Fri, 14:00–16:30',
  },
  {
    id: 'fac-8',
    name: 'Prof. V. Deepika Krishnan',
    designation: 'Associate Professor & ACCA Coordinator',
    department: 'Commerce & Management',
    subDepartment: 'Accounting & Finance',
    qualification: 'M.Com., FCA, ACCA (UK) Affiliate, Ph.D. Scholar',
    experienceYears: 13,
    specialization: 'IFRS Consolidation, Direct Taxation & Forensic Auditing',
    email: 'deepika.v@srikrishnacollege.edu.in',
    officeHours: 'Tue & Fri, 11:30–13:30',
  },
];

export type PlacementSector =
  | 'Software & Cloud'
  | 'Core Engineering & VLSI'
  | 'Consulting & Finance';

export interface PlacementCompanyRecord {
  company: string;
  sector: PlacementSector;
  roles: string;
  ctcBand: string;
  hires2025: number;
  visitMonth: string;
}

export const PLACEMENT_COMPANIES_DETAILED: PlacementCompanyRecord[] = [
  {
    company: 'Zoho Corporation',
    sector: 'Software & Cloud',
    roles: 'Member Technical Staff, Software Developer',
    ctcBand: '₹8.4 – ₹14.0 LPA',
    hires2025: 42,
    visitMonth: 'September 2025',
  },
  {
    company: 'Tata Consultancy Services (Digital)',
    sector: 'Software & Cloud',
    roles: 'Systems Engineer, Digital Specialist',
    ctcBand: '₹7.0 – ₹9.5 LPA',
    hires2025: 118,
    visitMonth: 'August 2025',
  },
  {
    company: 'Freshworks',
    sector: 'Software & Cloud',
    roles: 'Product Engineer, QA Automation',
    ctcBand: '₹10.5 – ₹16.5 LPA',
    hires2025: 19,
    visitMonth: 'October 2025',
  },
  {
    company: 'Cognizant GenC Next',
    sector: 'Software & Cloud',
    roles: 'Full-Stack & Cloud Associate',
    ctcBand: '₹6.75 – ₹8.5 LPA',
    hires2025: 94,
    visitMonth: 'September 2025',
  },
  {
    company: 'Qualcomm India',
    sector: 'Core Engineering & VLSI',
    roles: 'RTL Verification Engineer, Embedded Firmware',
    ctcBand: '₹18.0 – ₹24.5 LPA',
    hires2025: 14,
    visitMonth: 'October 2025',
  },
  {
    company: 'Bosch Global Software',
    sector: 'Core Engineering & VLSI',
    roles: 'Automotive Embedded & ADAS Engineer',
    ctcBand: '₹7.5 – ₹11.0 LPA',
    hires2025: 38,
    visitMonth: 'September 2025',
  },
  {
    company: 'L&T Technology Services',
    sector: 'Core Engineering & VLSI',
    roles: 'EV Powertrain & CAD Design Engineer',
    ctcBand: '₹6.5 – ₹8.8 LPA',
    hires2025: 46,
    visitMonth: 'November 2025',
  },
  {
    company: 'Schneider Electric',
    sector: 'Core Engineering & VLSI',
    roles: 'Industrial Automation & Controls Graduate',
    ctcBand: '₹8.0 – ₹10.5 LPA',
    hires2025: 22,
    visitMonth: 'January 2026',
  },
  {
    company: 'Deloitte Consulting',
    sector: 'Consulting & Finance',
    roles: 'Business Technology Analyst, Risk Advisory',
    ctcBand: '₹8.2 – ₹11.5 LPA',
    hires2025: 31,
    visitMonth: 'October 2025',
  },
  {
    company: 'EY Global Delivery',
    sector: 'Consulting & Finance',
    roles: 'Assurance Associate, Tax & IFRS Analyst',
    ctcBand: '₹6.4 – ₹9.0 LPA',
    hires2025: 48,
    visitMonth: 'November 2025',
  },
];

export interface CampusGalleryPhoto {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  caption: string;
}

export const CAMPUS_GALLERY_PHOTOS: CampusGalleryPhoto[] = [
  {
    id: 'photo-main',
    title: 'Main Academic Block & Quadrangle',
    category: 'Architecture',
    src: '/assets/aistudio/images_e974b30d.jpg',
    alt: 'Sri Krishna College main stone-clad academic building with red tiled roof and green courtyard lawn',
    caption: 'Main Academic Quadrangle and Administrative Wing, Kuniyamuthur',
  },
  {
    id: 'photo-library',
    title: 'Central Library Reading Room',
    category: 'Academics',
    src: '/src/assets/images/campus_library_hall_1794810348522.jpg',
    alt: 'Grand university library interior with arched windows and teak reading tables',
    caption: 'Central Knowledge Commons housing 1,24,000+ print volumes',
  },
  {
    id: 'photo-auditorium',
    title: 'Dr. APJ Abdul Kalam Auditorium',
    category: 'Symposiums',
    src: '/src/assets/images/campus_convocation_auditorium_1794812306668.jpg',
    alt: 'Teak-paneled university auditorium hosting an academic symposium with tiered seating',
    caption: '1,200-seat acoustic auditorium for convocations and international conferences',
  },
  {
    id: 'photo-robotics',
    title: 'Robotics & AI Research Studio',
    category: 'Laboratories',
    src: '/src/assets/images/engineering_robotics_lab_1794810349630.jpg',
    alt: 'Students collaborating with faculty mentor around a robotic arm prototype in modern lab',
    caption: 'Center for Autonomous Systems & Applied AI Compute Lab',
  },
  {
    id: 'photo-innovation',
    title: 'Student Innovation & Prototyping Hub',
    category: 'Laboratories',
    src: '/src/assets/images/campus_innovation_hub_1794812307781.jpg',
    alt: 'Students working around oak workbenches in startup incubation studio overlooking green campus',
    caption: '24/7 Student Incubation & Hardware Prototyping Studio',
  },
  {
    id: 'photo-faculty',
    title: 'Faculty Seminar & Lecture Hall',
    category: 'Academics',
    src: '/src/assets/images/faculty_lecture_seminar_1794812307169.jpg',
    alt: 'Senior Indian professor leading an interactive engineering seminar in sunlit classroom',
    caption: 'Small-group honors seminar led by doctoral faculty mentors',
  },
  {
    id: 'photo-hostel',
    title: 'Residential Hostel Courtyard',
    category: 'Student Life',
    src: '/src/assets/images/campus_hostel_courtyard_1794812307000.jpg',
    alt: 'Stone-clad residential hostel courtyard with terracotta roof and flowering bougainvillea',
    caption: 'Quiet landscaped courtyard inside the Scholars Residential Wing',
  },
  {
    id: 'photo-sports',
    title: 'Athletic Track & Sports Complex',
    category: 'Student Life',
    src: '/src/assets/images/campus_auditorium_sports_1794810349445.jpg',
    alt: '400m crimson running track and green athletic field beside campus pavilion',
    caption: '400m synthetic track, cricket turf, and indoor sports pavilion',
  },
];

export interface HelpDeskChannel {
  id: string;
  deskName: string;
  location: string;
  phone: string;
  email: string;
  hours: string;
  sla: string;
  handles: string;
}

export const HELP_DESK_CHANNELS: HelpDeskChannel[] = [
  {
    id: 'hd-admissions',
    deskName: 'Admissions & Counseling Help Desk',
    location: 'Admin Block, Ground Floor · Counter 1–3',
    phone: '+91 422 267 8001',
    email: 'admissions@srikrishnacollege.edu.in',
    hours: 'Mon–Sat, 09:00–17:30 IST',
    sla: 'Response within 4 working hours',
    handles: 'Application status, TNEA/TANCET counseling, lateral entry, campus tours',
  },
  {
    id: 'hd-fees',
    deskName: 'Accounts, Fee Remittance & Scholarship Cell',
    location: 'Admin Block, Wing B · Room 108',
    phone: '+91 422 267 8014',
    email: 'accounts@srikrishnacollege.edu.in',
    hours: 'Mon–Fri, 09:30–16:30 IST · Sat till 13:00',
    sla: 'Same-day receipt verification',
    handles: 'NEFT/UPI fee receipts, education loan bonafide letters, merit & govt. scholarships',
  },
  {
    id: 'hd-exam',
    deskName: 'Controller of Examinations & Transcripts Desk',
    location: 'Academic Block II · First Floor',
    phone: '+91 422 267 8022',
    email: 'coe@srikrishnacollege.edu.in',
    hours: 'Mon–Fri, 09:30–17:00 IST',
    sla: 'Transcripts issued in 5 working days',
    handles: 'Semester results, provisional certificates, WES/transcript verification, revaluation',
  },
  {
    id: 'hd-hostel',
    deskName: 'Residential Hostel & Transport Office',
    location: 'Student Services Pavilion · Room 12',
    phone: '+91 422 267 8035',
    email: 'hostel@srikrishnacollege.edu.in',
    hours: 'Daily, 08:00–20:00 IST (24/7 Warden Emergency)',
    sla: 'Immediate room & bus pass support',
    handles: 'Hostel room allotment, dining plans, Coimbatore bus route passes, medical bay',
  },
  {
    id: 'hd-placement',
    deskName: 'Career & Industry Relations Office',
    location: 'Central Placement Wing · Second Floor',
    phone: '+91 422 267 8048',
    email: 'placements@srikrishnacollege.edu.in',
    hours: 'Mon–Fri, 09:00–17:30 IST',
    sla: 'Recruiter inquiries answered within 24 hrs',
    handles: 'Campus recruitment drives, 6-month internships, MoUs & alumni verification',
  },
];

