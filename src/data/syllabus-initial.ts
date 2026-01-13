
// Interface definition for a single syllabus entry
export interface Syllabus {
  id: number;
  title: string;
  description: string;
  url: string; // Main or first URL
  additionalUrls?: { label: string; url: string }[]; // For other related links
}

// Array containing the structured syllabus data for the 2022 scheme
export const syllabus2022: Syllabus[] = [
  {
    id: 17,
    title: "First Year (2025 Scheme)",
    description: "Syllabus and schemes for the new 2025 first-year curriculum.",
    url: "https://vtu.ac.in/pdf/UG2024/phycyc.pdf",
    additionalUrls: [
      { label: "Chemistry Cycle Scheme", url: "https://vtu.ac.in/pdf/UG2024/chemcyc.pdf" },
      { label: "Maths: 1BMATC101 (CV)", url: "https://vtu.ac.in/pdf/UG2024/1BMATC101.pdf" },
      { label: "Maths: 1BMATM101 (ME)", url: "https://vtu.ac.in/pdf/UG2024/1BMATM101.pdf" },
      { label: "Maths: 1BMATE101 (EEE)", url: "https://vtu.ac.in/pdf/UG2024/1BMATE101.pdf" },
      { label: "Maths: 1BMATS101 (CSE)", url: "https://vtu.ac.in/pdf/UG2024/1BMATS101.pdf" },
      { label: "Maths: 1BMATC201 (CV)", url: "https://vtu.ac.in/pdf/UG2024/1BMATC201.pdf" },
      { label: "Maths: 1BMATM201 (ME)", url: "https://vtu.ac.in/pdf/UG2024/1BMATM201.pdf" },
      { label: "Maths: 1BMATE201 (EEE)", url: "https://vtu.ac.in/pdf/UG2024/1BMATE201.pdf" },
      { label: "Maths: 1BMATS201 (CSE)", url: "https://vtu.ac.in/pdf/UG2024/1BMATS201.pdf" },
      { label: "Physics: 1BPHYC102/202 (CV)", url: "https://vtu.ac.in/pdf/UG2024/1BPHYC102.pdf" },
      { label: "Physics: 1BPHYM102/202 (Mech)", url: "https://vtu.ac.in/pdf/UG2024/1BPHYM102.pdf" },
      { label: "Physics: 1BPHEC102/202 (ECE)", url: "https://vtu.ac.in/pdf/UG2024/1BPHEC102.pdf" },
      { label: "Physics: 1BPHEE102/202 (EEE)", url: "https://vtu.ac.in/pdf/UG2024/1BPHEE102.pdf" },
      { label: "Physics: 1BPHYS102/202 (CSE)", url: "https://vtu.ac.in/pdf/UG2024/1BPHYS102.pdf" },
      { label: "Chemistry: 1BCHEC102/202 (CV)", url: "https://vtu.ac.in/pdf/UG2024/1BCHEC102.pdf" },
      { label: "Chemistry: 1BCHEM102/202 (ME)", url: "https://vtu.ac.in/pdf/UG2024/1BCHEM102.pdf" },
      { label: "Chemistry: 1BCHEE102/202 (EEE/ECE)", url: "https://vtu.ac.in/pdf/UG2024/1BCHEE102.pdf" },
      { label: "Chemistry: 1BCHES102/202 (CSE)", url: "https://vtu.ac.in/pdf/UG2024/1BCHES102.pdf" },
      { label: "ETC: Intro to AI", url: "https://vtu.ac.in/pdf/UG2024/1BAIA103.pdf" },
      { label: "CAED: 1BCEDC103/203 (CV)", url: "https://vtu.ac.in/pdf/UG2024/1BCEDC103.pdf" },
      { label: "CAED: 1BCEDM103/203 (ME)", url: "https://vtu.ac.in/pdf/UG2024/1BCEDM103.pdf" },
      { label: "CAED: 1BCEDE103/203 (EEE)", url: "https://vtu.ac.in/pdf/UG2024/1BCEDE103.pdf" },
      { label: "CAED: 1BCEDEC103/203 (ECE)", url: "https://vtu.ac.in/pdf/UG2024/1BCEDEC103.pdf" },
      { label: "CAED: 1BCEDS103/203 (CSE)", url: "https://vtu.ac.in/pdf/UG2024/1BCEDS103.pdf" },
      { label: "ESC: Building Sciences", url: "https://vtu.ac.in/pdf/UG2024/1BESC104A.pdf" },
      { label: "ESC: Intro to Electrical Engg", url: "https://vtu.ac.in/pdf/UG2024/1BESC104B.pdf" },
      { label: "ESC: Intro to ECE", url: "https://vtu.ac.in/pdf/UG2024/1BESC104C.pdf" },
      { label: "ESC: Intro to Mech Engg", url: "https://vtu.ac.in/pdf/UG2024/1BESC104D.pdf" },
      { label: "ESC: Essentials of IT", url: "https://vtu.ac.in/pdf/UG2024/1BESC104E.pdf" },
      { label: "PSC: Engg. Mechanics", url: "https://vtu.ac.in/pdf/UG2024/1BCIV105.pdf" },
      { label: "PSC: Elements of Mech Engg", url: "https://vtu.ac.in/pdf/UG2024/1BEME105.pdf" },
      { label: "PSC: Basics of Electrical Engg", url: "https://vtu.ac.in/pdf/UG2024/1BBEE105.pdf" },
      { label: "PSC: Fundamentals of ECE", url: "https://vtu.ac.in/pdf/UG2024/1BECE105.pdf" },
      { label: "PSC: Programming in C", url: "https://vtu.ac.in/pdf/UG2024/1BEIT105.pdf" },
      { label: "PSC: Biotech & Biomimetics", url: "https://vtu.ac.in/pdf/UG2024/1BEBT105.pdf" },
      { label: "PSC: Soil Science & Agronomy", url: "https://vtu.ac.in/pdf/UG2024/1BSSA105.pdf" },
      { label: "PSC: Element of Aero Engg", url: "https://vtu.ac.in/pdf/UG2024/1BEAE105.pdf" },
      { label: "PSC: Element of Chem Engg", url: "https://vtu.ac.in/pdf/UG2024/1BECHE105.pdf" },
      { label: "PSC Lab: Mechanics & Materials", url: "https://vtu.ac.in/pdf/UG2024/1BMEML107.pdf" },
      { label: "PSC Lab: Elements of Mech Engg", url: "https://vtu.ac.in/pdf/UG2024/1BEMEL105.pdf" },
      { label: "PSC Lab: Basics of Electrical Engg", url: "https://vtu.ac.in/pdf/UG2024/1BBEEL105.pdf" },
      { label: "PSC Lab: Fundamentals of ECE", url: "https://vtu.ac.in/pdf/UG2024/1BECEL107.pdf" },
      { label: "PSC Lab: C Programming", url: "https://vtu.ac.in/pdf/UG2024/1BPOPL107.pdf" },
      { label: "PSC Lab: Soil Science & Agronomy", url: "https://vtu.ac.in/pdf/UG2024/1BSSAL107.pdf" },
      { label: "PSC Lab: Elements of Biotech", url: "https://vtu.ac.in/pdf/UG2024/1BEBTL107.pdf" },
      { label: "PSC Lab: Element of Aero Engg", url: "https://vtu.ac.in/pdf/UG2024/1BEAEL107.pdf" },
      { label: "PSC Lab: Element of Chem Engg", url: "https://vtu.ac.in/pdf/UG2024/1BECHEL107.pdf" },
      { label: "PBL: Interdisciplinary Project", url: "https://vtu.ac.in/pdf/UG2024/1BPRJ258.pdf" },
      { label: "PBL: Innovation & Design Thinking", url: "https://vtu.ac.in/pdf/UG2024/1BIDTL158.pdf" },
      { label: "Humanities: Communication Skills", url: "https://vtu.ac.in/pdf/UG2024/1BENGL106.pdf" },
      { label: "Humanities: Soft Skills", url: "https://vtu.ac.in/pdf/UG2024/1BSKS106.pdf" },
      { label: "Humanities: Indian Constitution", url: "https://vtu.ac.in/pdf/UG2024/1BICO107.pdf" },
      { label: "Humanities: Samskrutika Kannada", url: "https://vtu.ac.in/pdf/UG2024/1BKSK109.pdf" },
      { label: "Humanities: Balake Kannada", url: "https://vtu.ac.in/pdf/UG2024/1BKBK109.pdf" },
      { label: "PLC: Python Programming", url: "https://vtu.ac.in/pdf/UG2024/1BPLC105B.pdf" },
      { label: "PLC: C Programming", url: "https://vtu.ac.in/pdf/UG2024/1BPLC205E.pdf" },
    ]
  },
  {
    id: 1,
    title: "Civil Engineering",
    description: "Scheme and Syllabus for Civil Engineering (CV).",
    url: "https://vtu.ac.in/pdf/2022_3to8/civsch.pdf",
    additionalUrls: [
      { label: "5-8 Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/58civsch.pdf" },
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2civsyll.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3civsyll.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4civsyll.pdf" },
    ],
  },
  {
    id: 2,
    title: "Computer Science & Engineering",
    description: "Scheme and Syllabus for Computer Science & Engineering (CSE).",
    url: "https://vtu.ac.in/pdf/2022_3to8/38csesch.pdf",
    additionalUrls: [
      { label: "3-4 Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2csessyll.pdf" },
      { label: "5th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3csesyll.pdf" },
      { label: "6th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/6csesyll.pdf" },
      { label: "7th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/7csesyll.pdf" },
    ],
  },
    {
    id: 3,
    title: "Information Science & Engineering",
    description: "Scheme and Syllabus for Information Science & Engineering (ISE).",
    url: "https://vtu.ac.in/pdf/2022_3to8/38issch.pdf",
    additionalUrls: [
      { label: "3-4 Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2issyll.pdf" },
      { label: "5th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3issyll.pdf" },
      { label: "6th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/6issyll.pdf" },
      { label: "7th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/7issyll.pdf" },
    ],
  },
  {
    id: 4,
    title: "Artificial Intelligence & Machine Learning",
    description: "Scheme and Syllabus for Artificial Intelligence & Machine Learning (AIML).",
    url: "https://vtu.ac.in/pdf/2022_3to8/38aimlsch.pdf",
    additionalUrls: [
        { label: "3-4 Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2aimlsyll.pdf" },
        { label: "5th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3aimlsyll.pdf" },
        { label: "6th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/6aimlsyll.pdf" },
        { label: "7th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/7aimlsyll.pdf" },
    ],
  },
  {
    id: 5,
    title: "Artificial Intelligence & Data Science",
    description: "Scheme and Syllabus for Artificial Intelligence & Data Science (AIDS).",
    url: "https://vtu.ac.in/pdf/2022_3to8/38aidssch.pdf",
    additionalUrls: [
        { label: "3-4 Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2aidssyll.pdf" },
        { label: "5th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3aidssyll.pdf" },
        { label: "6th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/6aidssyll.pdf" },
        { label: "7th Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/7aidssyll.pdf" },
    ],
  },
  {
    id: 6,
    title: "Electronics & Communication Engineering",
    description: "Scheme and Syllabus for Electronics & Communication Engineering (ECE).",
    url: "https://vtu.ac.in/pdf/2022_3to8/ecesch.pdf",
    additionalUrls: [
      { label: "5th Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/5ecesch.pdf" },
      { label: "6th Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/6ecesch.pdf" },
      { label: "7-8 Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/7ecesch.pdf" },
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2ecesyll.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3ecesyll.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/7ecesyll.pdf" }
    ],
  },
    {
    id: 7,
    title: "Biomedical Engineering",
    description: "Scheme and Syllabus for Biomedical Engineering.",
    url: "https://vtu.ac.in/pdf/2022_3to8/biomedsch.pdf",
    additionalUrls: [
      { label: "5-8 Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/5biomedsch.pdf" },
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2biomedsyll.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3biomedsyll.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4biomedsyll.pdf" }
    ]
  },
    {
    id: 8,
    title: "Electrical & Electronics Engineering",
    description: "Scheme and Syllabus for Electrical & Electronics Engineering (EEE).",
    url: "https://vtu.ac.in/pdf/2022_3to8/34eesch.pdf",
    additionalUrls: [
      { label: "5-8 Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/58eesch.pdf" },
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2eesyll.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3eesyll.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4eesyll.pdf" }
    ]
  },
    {
    id: 9,
    title: "Mechanical Engineering",
    description: "Scheme and Syllabus for Mechanical Engineering (ME).",
    url: "https://vtu.ac.in/pdf/2022_3to8/mecsch.pdf",
    additionalUrls: [
      { label: "5-8 Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/58mecsch.pdf" },
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2mecsyll.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3mecsyll.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4mecsyll.pdf" }
    ],
  },
    {
    id: 10,
    title: "Aeronautical Engineering",
    description: "Scheme and Syllabus for Aeronautical Engineering.",
    url: "https://vtu.ac.in/pdf/2022_3to8/aeroch.pdf",
    additionalUrls: [
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2aerosyll.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3aesyll.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4aesyll.pdf" }
    ]
  },
  {
    id: 11,
    title: "Automobile Engineering",
    description: "Scheme and Syllabus for Automobile Engineering.",
    url: "https://vtu.ac.in/pdf/2022_3to8/autosch.pdf",
    additionalUrls: [
      { label: "5-8 Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/58autossch.pdf" },
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2autosyll.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3autosyll.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4autosyll.pdf" }
    ]
  },
  {
    id: 12,
    title: "Biotechnology",
    description: "Scheme and Syllabus for Biotechnology.",
    url: "https://vtu.ac.in/pdf/2022_3to8/biotechsch.pdf",
    additionalUrls: [
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2biotechsch.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3biotechsch.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4biotechsch.pdf" }
    ],
  },
    {
    id: 13,
    title: "Chemical Engineering",
    description: "Scheme and Syllabus for Chemical Engineering.",
    url: "https://vtu.ac.in/pdf/2022_3to8/chemsch.pdf",
    additionalUrls: [
        { label: "5-8 Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/58chemsch.pdf" },
        { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2chemsyll.pdf" },
        { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3chemsyll.pdf" },
        { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4chemsyll.pdf" }
    ]
  },
  {
    id: 14,
    title: "Mining Engineering",
    description: "Scheme and Syllabus for Mining Engineering.",
    url: "https://vtu.ac.in/pdf/2022_3to8/miningsch.pdf",
    additionalUrls: [
      { label: "5-8 Sem Scheme", url: "https://vtu.ac.in/pdf/2022_3to8/58miningsch.pdf" },
      { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2miningsyll.pdf" },
      { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3miningsyll.pdf" },
      { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4miningsyll.pdf" },
    ],
  },
  {
    id: 15,
    title: "Textile Technology",
    description: "Scheme and Syllabus for Textile Technology.",
    url: "https://vtu.ac.in/pdf/2022_3to8/textsch.pdf",
    additionalUrls: [
        { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2textsyll.pdf" },
        { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3textsyll.pdf" },
        { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4textsyll.pdf" }
    ]
  },
  {
      id: 16,
      title: "B.Design (Interior Design)",
      description: "Scheme and Syllabus for B.Design in Interior Design.",
      url: "https://vtu.ac.in/pdf/2022_3to8/38bdidsch.pdf",
      additionalUrls: [
          { label: "1st Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/12bdidschsyll.pdf" },
          { label: "2nd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/2bdidschsyll.pdf" },
          { label: "3rd Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/3bdidschsyll.pdf" },
          { label: "4th Year Syllabus", url: "https://vtu.ac.in/pdf/2022_3to8/4bdidschsyll.pdf" }
      ]
  },
  {
    id: 100, // New ID for the 2022 First Year card
    title: "First Year (2022 Scheme)",
    description: "Syllabus documents for all first-year streams under the 2022 scheme.",
    url: "https://vtu.ac.in/en/b-e-b-tech-2022-scheme-syllabus/", // A general link for the scheme
    additionalUrls: [
      { label: "CV Stream - Maths I", url: "https://vtu.ac.in/pdf/2022syll/BMATC101.pdf" },
      { label: "CV Stream - Maths II", url: "https://vtu.ac.in/pdf/2022syll/BMATC201.pdf" },
      { label: "CV Stream - Physics", url: "https://vtu.ac.in/pdf/2022syll/BPHYC102.pdf" },
      { label: "CV Stream - Chemistry", url: "https://vtu.ac.in/pdf/2022syll/BCHEC102.pdf" },
      { label: "CV Stream - Engg. Mechanics", url: "https://vtu.ac.in/pdf/2022syll/BCIVC103.pdf" },
      { label: "CSE Stream - Maths I", url: "https://vtu.ac.in/pdf/2022syll/BMATS101.pdf" },
      { label: "CSE Stream - Maths II", url: "https://vtu.ac.in/pdf/2022syll/BMATS201.pdf" },
      { label: "CSE Stream - Physics", url: "https://vtu.ac.in/pdf/2022syll/BPHYS102.pdf" },
      { label: "CSE Stream - Chemistry", url: "https://vtu.ac.in/pdf/2022syll/BCHES102.pdf" },
      { label: "CSE Stream - C Programming", url: "https://vtu.ac.in/pdf/2022syll/BPOPS103.pdf" },
      { label: "EEE Stream - Maths I", url: "https://vtu.ac.in/pdf/2022syll/BMATE101.pdf" },
      { label: "EEE Stream - Maths II", url: "https://vtu.ac.in/pdf/2022syll/BMATE201.pdf" },
      { label: "EEE Stream - Physics", url: "https://vtu.ac.in/pdf/2022syll/BPHYE102.pdf" },
      { label: "EEE Stream - Chemistry", url: "https://vtu.ac.in/pdf/2022syll/BCHEE102.pdf" },
      { label: "EEE Stream - Electrical Engg.", url: "https://vtu.ac.in/pdf/2022syll/BEEE103.pdf" },
      { label: "EEE Stream - Basic Electronics", url: "https://vtu.ac.in/pdf/2022syll/BBEE103.pdf" },
      { label: "ME Stream - Maths I", url: "https://vtu.ac.in/pdf/2022syll/BMATM101.pdf" },
      { label: "ME Stream - Maths II", url: "https://vtu.ac.in/pdf/2022syll/BMAT201.pdf" },
      { label: "ME Stream - Physics", url: "https://vtu.ac.in/pdf/2022syll/BPHYM102.pdf" },
      { label: "ME Stream - Chemistry", url: "https://vtu.ac.in/pdf/2022syll/BCHEM102.pdf" },
      { label: "ME Stream - Mechanical Engg.", url: "https://vtu.ac.in/pdf/2022syll/BEMEM103.pdf" },
      { label: "Common - CAED", url: "https://vtu.ac.in/pdf/2022syll/BCEDK103.pdf" },
      { label: "Common - Communicative English", url: "https://vtu.ac.in/pdf/2022syll/BENGK106.pdf" },
      { label: "Common - Writing Skills", url: "https://vtu.ac.in/pdf/2022syll/BPWSK106.pdf" },
      { label: "Common - Samskrutika Kannada", url: "https://vtu.ac.in/pdf/2022syll/BKSKK107.pdf" },
      { label: "Common - Balake Kannada", url: "https://vtu.ac.in/pdf/2022syll/BKBKK107.pdf" },
      { label: "Common - Indian Constitution", url: "https://vtu.ac.in/pdf/2022syll/BICOK107.pdf" },
      { label: "Common - Design Thinking", url: "https://vtu.ac.in/pdf/2022syll/BIDTK108.pdf" },
      { label: "Common - Health Foundations", url: "https://vtu.ac.in/pdf/2022syll/BSFH108.pdf" },
      { label: "ESC - Intro to Civil", url: "https://vtu.ac.in/pdf/2022syll/BESCK104A.pdf" },
      { label: "ESC - Intro to Electrical", url: "https://vtu.ac.in/pdf/2022syll/BESCK104B.pdf" },
      { label: "ESC - Intro to Electronics", url: "https://vtu.ac.in/pdf/2022syll/BESCK104C.pdf" },
      { label: "ESC - Intro to Mechanical", url: "https://vtu.ac.in/pdf/2022syll/BESCK104D.pdf" },
      { label: "ESC - Intro to C Programming", url: "https://vtu.ac.in/pdf/2022syll/BESCK104E.pdf" },
      { label: "ETC - Smart Materials", url: "https://vtu.ac.in/pdf/2022syll/BETCK105A.pdf" },
      { label: "ETC - Green Buildings", url: "https://vtu.ac.in/pdf/2022syll/BETCK105B.pdf" },
      { label: "ETC - Nanotechnology", url: "https://vtu.ac.in/pdf/2022syll/BETCK105C.pdf" },
      { label: "ETC - Sustainable Engg", url: "https://vtu.ac.in/pdf/2022syll/BETCK105D.pdf" },
      { label: "ETC - Renewable Energy", url: "https://vtu.ac.in/pdf/2022syll/BETCK105E.pdf" },
      { label: "ETC - Waste Management", url: "https://vtu.ac.in/pdf/2022syll/BETCK105F.pdf" },
      { label: "ETC - Biosensors", url: "https://vtu.ac.in/pdf/2022syll/BETCK105G.pdf" },
      { label: "ETC - Intro to IoT", url: "https://vtu.ac.in/pdf/2022syll/BETCK105H.pdf" },
      { label: "ETC - Intro to Cyber Security", url: "https://vtu.ac.in/pdf/2022syll/BETCK105l.pdf" },
      { label: "ETC - Intro to Embedded Systems", url: "https://vtu.ac.in/pdf/2022syll/22ETC15J.pdf" },
      { label: "PLC - Web Programming", url: "https://vtu.ac.in/pdf/2022syll/BPLCK105A.pdf" },
      { label: "PLC - Python Programming", url: "https://vtu.ac.in/pdf/2022syll/BPLCK105B.pdf" },
      { label: "PLC - Java Programming", url: "https://vtu.ac.in/pdf/2022syll/BPLCK105C.pdf" },
      { label: "PLC - C++ Programming", url: "https://vtu.ac.in/pdf/2022syll/BPLCK105D.pdf" },
    ]
  },
];
