
import type { Subject, Branch } from '@/lib/types';

export let schemes: string[] = ["2022 Scheme","2025 scheme"];

export let branches: Record<string, Branch> = {
  'first-year': { name: 'First Year', description: 'Common subjects for all branches.', scheme: "2022 Scheme", textbooks: [] },
  'first-year-2025': { name: 'First Year 2025', description: 'Common subjects for all branches under the 2025 scheme.', scheme: "2025 scheme", textbooks: [] },
  'cse': { name: 'Computer Science & Engg.', description: 'Curriculum for the B.E. in Computer Science & Engineering.', scheme: "2022 Scheme", textbooks: [] },
  'ise': { name: 'Information Science & Engg.', description: 'Curriculum for the B.E. in Information Science & Engineering.', scheme: "2022 Scheme", textbooks: [] },
  'aiml': { name: 'AI & Machine Learning', description: 'Curriculum for the B.E. in AI & Machine Learning.', scheme: "2022 Scheme", textbooks: [] },
  'aids': { name: 'AI & Data Science', description: 'Curriculum for the B.E. in AI & Data Science.', scheme: "2022 Scheme", textbooks: [] },
  'ece': { name: 'Electronics & Communication', description: 'Curriculum for the B.E. in Electronics & Communication.', scheme: "2022 Scheme", textbooks: [] },
  'mech': { name: 'Mechanical Engineering', description: 'Curriculum for the B.E. in Mechanical Engineering.', scheme: "2022 Scheme", textbooks: [] },
  'eee': { name: 'Electrical & Electronics Engg.', description: 'Curriculum for the B.E. in Electrical & Electronics.', scheme: "2022 Scheme", textbooks: [] },
  'ect': { name: 'Electronics & Telecommunication', description: 'Curriculum for the B.E. in Electronics & Telecommunication.', scheme: "2022 Scheme", textbooks: [] },
  'civil': { name: 'Civil Engineering', description: 'Curriculum for the B.E. in Civil Engineering.', scheme: "2022 Scheme", textbooks: [] },
  'bt': { name: 'Biotechnology', description: 'Curriculum for the B.E. in Biotechnology.', scheme: "2022 Scheme", textbooks: [] },
  'ae': { name: 'Aeronautical Engineering', description: 'Curriculum for the B.E. in Aeronautical Engineering.', scheme: "2022 Scheme", textbooks: [] },
};

export const subjects: Subject[] = [
  // 2025 Scheme Subjects - Semester 1
  { code: '1BMATC101', name: 'Differential Calculus And Linear Algebra: CV Stream', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BMATMI101', name: 'Differential Calculus and Linear Algebra: ME Stream', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BMATE101', name: 'Differential Calculus And Linear Algebra: EEE stream', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BMATS101', name: 'Calculus and Linear Algebra: CSE Stream', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BMATC201', name: 'Differential Calculus and Numerical Methods: CV Stream', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BMATM201', name: 'Multivariable Calculus and Numerical Methods: ME Stream', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BMATE201', name: 'Calculus, Laplace Transform And Numerical Techniques: EEE stream', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BMATS201', name: 'Numerical Methods: CSE Stream', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BPHYC102-202', name: 'Physics for Sustainable Structural Systems (CV stream)', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BPHYM102-202', name: 'Physics of Materials (Mech stream)', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BPHEC102-202', name: 'Quantum Physics and Electronics Sensors (ECE stream)', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BPHEE102-202', name: 'Electrical Engineering Materials (EEE)', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BPHYS102-202', name: 'Quantum Physics and Applications (CSE stream)', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1CHED102-202', name: 'Applied Chemistry for Sustainable Structures & Material Design', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BCHEM102-202', name: 'Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems (ME)', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BCHEE102-202', name: 'Applied Chemistry for Emerging Electronics and Futuristic Devices (EEE ECEJ)', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BCHES102-202', name: 'Applied Chemistry for Smart Systems (CSE)', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BESD104A-204A', name: 'Building Sciences & Mechanics', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BESC148-204B', name: 'Introduction to Electrical Engineering', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BESC140-204B', name: 'Introduction to Electronics & Communication Engineering', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BESC140-204D', name: 'Introduction to Mechanical Engineering', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BESD104E-204E', name: 'Essentials of Information Technology', semester: 1, branch: ['first-year-2025'], credits: 3, scheme: '2025 scheme' },
  { code: '1BMEML107-207', name: 'Mechanics and Materials Lab', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BEMEL107-207', name: 'Elements of Mechanical Engineering Lab', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BBEEL107-207', name: 'Basics of Electrical Engineering Lab', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BECEL107-207', name: 'Fundamentals of Electronics & Communication Engineering', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BPDPL107-207', name: 'C Programming Lab', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BSSAL107-207', name: 'Soil Science and Agronomy Field Lab', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BEBTL107-207', name: 'Elements of Biotechnology Lab', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BEAEL107-207', name: 'Element of Aeronautical Engineering Laboratory', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BPRD252', name: 'Interdisciplinary Project-eased Learning', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BIOTL158', name: 'Innovation and Design Thinking Lab (Project-based learning)', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BENG106-206', name: 'Communication Skills', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BSKS106-206', name: 'Soft Skills', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BICD107-207', name: 'Indian Constitution Engineering Ethics', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BKSK109', name: 'Samskrutika Kannada', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BKBK109', name: 'Balake Kannada', semester: 1, branch: ['first-year-2025'], credits: 1, scheme: '2025 scheme' },
  { code: '1BPLC1058-205B', name: 'PYTHON PROGRAMMING', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },
  { code: '1BPLC205E-105E', name: 'INTRODUCTION TO C PROGRAMMING', semester: 1, branch: ['first-year-2025'], credits: 4, scheme: '2025 scheme' },

  // Common Subjects - Semester 1
  { code: 'BENGK106', name: 'Communicative English', semester: 1, branch: ['first-year'], credits: 1 },
  { code: 'BPWSK106', name: 'Professional Writing Skills in English', semester: 1, branch: ['first-year'], credits: 1 },
  { code: 'BKSKK107-BKBKK107', name: 'Samskrutika Kannada/Balake Kannada', semester: 1, branch: ['first-year'], credits: 1 },
  { code: 'BICOK107', name: 'Indian Constitution', semester: 1, branch: ['first-year'], credits: 1 },
  { code: 'BIDTK158', name: 'Innovation and Design Thinking', semester: 1, branch: ['first-year'], credits: 1 },
  { code: 'BSFHK158', name: 'Scientific Foundations of Health', semester: 1, branch: ['first-year'], credits: 1 },
  
  // Common Subjects - Semester 2
  { code: 'BCEDK203', name: 'Computer-Aided Engineering Drawing', semester: 2, branch: ['first-year'], credits: 2 },
  { code: 'BENGK206', name: 'Communicative English', semester: 2, branch: ['first-year'], credits: 1 },
  { code: 'BICOK207', name: 'Indian Constitution', semester: 2, branch: ['first-year'], credits: 1 },
  { code: 'BKSKK207-BKBKK207', name: 'Samskrutika Kannada/Balake Kannada', semester: 2, branch: ['first-year'], credits: 1 },
  { code: 'BSFHK258', name: 'Scientific Foundations of Health', semester: 2, branch: ['first-year'], credits: 1 },

  // Engineering Science Courses (Common placeholder)
  { code: 'BESCK104x', name: 'Engineering Science Course-I', semester: 1, branch: [], credits: 3 },
  { code: 'BESCK204x', name: 'Engineering Science Course-II', semester: 2, branch: [], credits: 3 },

  // Emerging Technology Courses (Common placeholder)
  { code: 'BETCK105x', name: 'Emerging Technology Course-I', semester: 1, branch: [], credits: 3 },
  { code: 'BETCK205x', name: 'Emerging Technology Course-II', semester: 2, branch: [], credits: 3 },

  // Programming Language Courses (Common placeholder)
  { code: 'BPLCK105x', name: 'Programming Language Course-I', semester: 1, branch: [], credits: 3 },
  { code: 'BPLCK205x', name: 'Programming Language Course-II', semester: 2, branch: [], credits: 3 },

  // Branch Specific Subjects - CSE
  { code: 'BMATS101', name: 'Mathematics-1 for CSE Stream', semester: 1, branch: ['first-year'], credits: 4 },
  { code: 'BPHYS102', name: 'Applied Physics for CSE stream', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BPOPS103', name: 'Principles of Programming Using C', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BMATS201', name: 'Mathematics-II for CSE Stream', semester: 2, branch: ['first-year'], credits: 4 },
  { code: 'BCHEST202', name: 'Applied Chemistry for CSE Stream', semester: 2, branch: ['first-year'], credits: 3 },
  { code: 'KIDTK258', name: 'Innovation and Design Thinking', semester: 2, branch: ['first-year'], credits: 1 },

  // Branch Specific Subjects - Civil
  { code: 'BMATC101', name: 'Mathematics-I for Civil Engg stream', semester: 1, branch: ['first-year'], credits: 4 },
  { code: 'BPHYC102', name: 'Applied Physics for Civil Engineering Stream', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BCIVC103', name: 'Engineering Mechanics', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BMATC201', name: 'Mathematics-II for Civil Engg Stream', semester: 2, branch: ['first-year'], credits: 4 },
  { code: 'BCHEC202', name: 'Applied Chemistry for Civil Engineering stream', semester: 2, branch: ['first-year'], credits: 3 },
  { code: 'BIDTK258-Civil', name: 'Innovation and Design Thinking', semester: 2, branch: ['first-year'], credits: 1 },

  // Branch Specific Subjects - EEE
  { code: 'BMATE101', name: 'Mathematics-I for EEE Streams', semester: 1, branch: ['first-year'], credits: 4 },
  { code: 'BPHYE102', name: 'Applied Physics for EEE Stream', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BEEE103', name: 'Elements of Electrical Engineering', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BBEE103', name: 'Basic Electronics for EEE stream', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BMATE201', name: 'Mathematics-II for EES', semester: 2, branch: ['first-year'], credits: 4 },
  { code: 'BCHEE202', name: 'Chemistry for EES', semester: 2, branch: ['first-year'], credits: 3 },
  { code: 'BPWKS206', name: 'Professional Writing Skills in English', semester: 2, branch: ['first-year'], credits: 1 },
  { code: 'BIDTK258-EEE', name: 'Innovation and Design Thinking', semester: 2, branch: ['first-year'], credits: 1 },
  
  // Branch Specific Subjects - ME
  { code: 'BMATM101', name: 'Mathematics I for Mechanical Engg Stream', semester: 1, branch: ['first-year'], credits: 4 },
  { code: 'BPHYM102', name: 'Applied Physics for ME Stream', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BEMEM103', name: 'Elements of Mechanical Engineering', semester: 1, branch: ['first-year'], credits: 3 },
  { code: 'BMATM201', name: 'Mathematics-II for Mechanical Engg Stream', semester: 2, branch: ['first-year'], credits: 4 },
  { code: 'BCHEM202', name: 'Applied Chemistry for ME Stream', semester: 2, branch: ['first-year'], credits: 3 },
  { code: 'BIDTK258-ME', name: 'Innovation and Design Thinking', semester: 2, branch: ['first-year'], credits: 1 },

  // --- EXISTING SUBJECTS FOR OTHER BRANCHES (UNCHANGED) ---
  
  // CSE Sem 3
  {
    code: 'BCS301',
    name: 'Mathematics for Computer Science',
    semester: 3,
    branch: ['cse', 'ise'],
    credits: 3,
    modules: [
        { moduleNumber: 1, notes: [{ name: 'Complete Notes M1', url: '#' }] },
        { moduleNumber: 2, notes: [] },
        { moduleNumber: 3, notes: [] },
        { moduleNumber: 4, notes: [] },
        { moduleNumber: 5, notes: [] },
    ]
  },
  { code: 'BCS302', name: 'Digital Design & Computer Organization', semester: 3, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 4 },
  { code: 'BCS303', name: 'Operating Systems', semester: 3, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 3 },
  { code: 'BCS304', name: 'Data Structures and Applications', semester: 3, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 3 },
  { code: 'BCSL305', name: 'Data Structures Lab', semester: 3, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 1 },
  { code: 'BCS306-A', name: 'Object Oriented Programming with JAVA', semester: 3, branch: ['cse', 'ise', 'aiml'], credits: 3 },
  { code: 'BCS306-B', name: 'Object Oriented Programming with C++', semester: 3, branch: ['cse', 'ise', 'aiml'], credits: 3 },
  { code: 'BSCK307', name: 'Social Connect and Responsibility', semester: 3, branch: ['cse', 'ise', 'aiml', 'aids', 'ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 1 },
  { code: 'BCS358x', name: 'Ability Enhancement Course/Skill Enhancement Course – III', semester: 3, branch: ['cse', 'ise'], credits: 1 },
  { code: 'BNSK-BPEK-BYOK359', name: 'NSS / Physical Education / Yoga', semester: 3, branch: ['cse', 'ise', 'aiml', 'aids', 'ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 1 },
  // CSE Sem 4
  { code: 'BCS401', name: 'Analysis & Design of Algorithms', semester: 4, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 3 },
  { code: 'BCS402', name: 'Microcontrollers', semester: 4, branch: ['cse'], credits: 3 },
  { code: 'BCS403', name: 'Database Management Systems', semester: 4, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 3 },
  { code: 'BCSL404', name: 'Analysis & Design of Algorithms Lab', semester: 4, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 1 },
  { code: 'BCS405x', name: 'Professional Elective Course - I', semester: 4, branch: ['cse', 'ise'], credits: 3 },
  { code: 'BCS456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['cse', 'ise'], credits: 1 },
  { code: 'BBOC407', name: 'Biology for Computer Engineers', semester: 4, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 2 },
  { code: 'BUHK408', name: 'Universal Human Values Course', semester: 4, branch: ['cse', 'ise', 'aiml', 'aids', 'ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 1 },
  { code: 'BNSK-BPEK-BYOK459', name: 'NSS / Physical Education / Yoga', semester: 4, branch: ['cse', 'ise', 'aiml', 'aids', 'ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 1 },
  // CSE Sem 5
  { code: 'BCS501', name: 'Software Engineering & Project Management', semester: 5, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 3 },
  { code: 'BCS502', name: 'Computer Networks', semester: 5, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 4 },
  { code: 'BCS503', name: 'Theory of Computation', semester: 5, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 3 },
  { code: 'BCSL504', name: 'Web Technology Lab', semester: 5, branch: ['cse'], credits: 1 },
  { code: 'BCS515x', name: 'Professional Elective Course - II', semester: 5, branch: ['cse', 'ise'], credits: 3 },
  { code: 'BCS586', name: 'Mini Project', semester: 5, branch: ['cse'], credits: 2 },
  { code: 'BRMK557', name: 'Research Methodology and IPR', semester: 5, branch: ['cse', 'ise', 'aiml', 'aids', 'ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 2 },
  { code: 'BCS508', name: 'Environmental Studies and E-waste Management', semester: 5, branch: ['cse', 'ise', 'aiml', 'aids'], credits: 1 },
  { code: 'BNSK-BPEK-BYOK559', name: 'NSS / Physical Education / Yoga', semester: 5, branch: ['cse', 'ise', 'aiml', 'aids', 'ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 1 },
  // CSE Sem 6
  { code: 'BCS601', name: 'Cloud Computing', semester: 6, branch: ['cse'], credits: 3 },
  { code: 'BCS602', name: 'Machine Learning', semester: 6, branch: ['cse', 'ise', 'aids'], credits: 4 },
  { code: 'BCS613x', name: 'Professional Elective Course - III', semester: 6, branch: ['cse'], credits: 3 },
  { code: 'BCS654x', name: 'Open Elective Course - I', semester: 6, branch: ['cse'], credits: 3 },
  { code: 'BCS685', name: 'Project Phase I', semester: 6, branch: ['cse'], credits: 2 },
  { code: 'BCSL606', name: 'Machine Learning Lab', semester: 6, branch: ['cse', 'ise', 'aids'], credits: 1 },
  { code: 'BCS657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['cse'], credits: 1 },
  { code: 'BNSK-BPEK-BYOK658', name: 'NSS / Physical Education / Yoga', semester: 6, branch: ['cse', 'ise', 'aiml', 'aids', 'ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 1 },
  { code: 'BIKS609', name: 'Indian Knowledge System', semester: 6, branch: ['cse', 'ise', 'aiml', 'aids', 'ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 1 },
  // CSE Sem 7
  { code: 'BCS701', name: 'Internet of Things', semester: 7, branch: ['cse'], credits: 4 },
  { code: 'BCS702', name: 'Parallel Computing', semester: 7, branch: ['cse', 'ise'], credits: 3 },
  { code: 'BCS703', name: 'Cryptography & Network Security', semester: 7, branch: ['cse'], credits: 3 },
  { code: 'BCS714x', name: 'Professional Elective Course - IV', semester: 7, branch: ['cse'], credits: 3 },
  { code: 'BCS755x', name: 'Open Elective Course - II', semester: 7, branch: ['cse'], credits: 3 },
  { code: 'BCS786', name: 'Major Project Phase-II', semester: 7, branch: ['cse'], credits: 8 },
  // CSE Sem 8
  { code: 'BCS801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['cse'], credits: 3 },
  { code: 'BCS802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['cse'], credits: 3 },
  { code: 'BCS803', name: 'Internship (Industry/Research)', semester: 8, branch: ['cse'], credits: 12 },

  // ISE Sem 4
  { code: 'BIS402', name: 'Advanced Java', semester: 4, branch: ['ise'], credits: 3 },
  // ISE Sem 5
  { code: 'BAIL504', name: 'Data Visualization Lab', semester: 5, branch: ['ise', 'aiml', 'aids'], credits: 1 },
  { code: 'BIS586', name: 'Mini Project', semester: 5, branch: ['ise'], credits: 2 },
  // ISE Sem 6
  { code: 'BIS601', name: 'Full Stack Development', semester: 6, branch: ['ise'], credits: 3 },
  { code: 'BIS613x', name: 'Professional Elective Course - III', semester: 6, branch: ['ise'], credits: 3 },
  { code: 'BIS654x', name: 'Open Elective Course - I', semester: 6, branch: ['ise'], credits: 3 },
  { code: 'BIS685', name: 'Project Phase I', semester: 6, branch: ['ise'], credits: 2 },
  { code: 'BIS657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['ise'], credits: 1 },
  // ISE Sem 7
  { code: 'BIS701', name: 'Big Data Analytics', semester: 7, branch: ['ise'], credits: 4 },
  { code: 'BIS703', name: 'Information & Network Security', semester: 7, branch: ['ise'], credits: 3 },
  { code: 'BIS714x', name: 'Professional Elective Course - IV', semester: 7, branch: ['ise'], credits: 3 },
  { code: 'BIS755x', name: 'Open Elective Course - II', semester: 7, branch: ['ise'], credits: 3 },
  { code: 'BIS786', name: 'Major Project Phase-II', semester: 7, branch: ['ise'], credits: 8 },
  // ISE Sem 8
  { code: 'BIS801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['ise'], credits: 3 },
  { code: 'BIS802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['ise'], credits: 3 },
  { code: 'BIS803', name: 'Internship (Industry/Research)', semester: 8, branch: ['ise'], credits: 12 },
  
  // AI&ML Sem 3
  { code: 'BCX301', name: 'Mathematics for CSE/AIDS/AIML', semester: 3, branch: ['aiml'], credits: 3 },
  { code: 'BAI358x', name: 'Ability Enhancement Course/Skill Enhancement Course – III', semester: 3, branch: ['aiml'], credits: 1 },
  // AI&ML Sem 4
  { code: 'BAI402', name: 'Artificial Intelligence', semester: 4, branch: ['aiml'], credits: 3 },
  { code: 'BAI405x', name: 'Professional Elective Course - I', semester: 4, branch: ['aiml'], credits: 3 },
  { code: 'BAI456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['aiml'], credits: 1 },
  // AI&ML Sem 5
  { code: 'BAI515x', name: 'Professional Elective Course - II', semester: 5, branch: ['aiml'], credits: 3 },
  { code: 'BAI586', name: 'Mini Project', semester: 5, branch: ['aiml'], credits: 2 },
  // AI&ML Sem 6
  { code: 'BAI601', name: 'Natural Language Processing', semester: 6, branch: ['aiml'], credits: 3 },
  { code: 'BAI602', name: 'Machine Learning', semester: 6, branch: ['aiml'], credits: 4 },
  { code: 'BAI613x', name: 'Professional Elective Course - III', semester: 6, branch: ['aiml'], credits: 3 },
  { code: 'BAI654x', name: 'Open Elective Course - I', semester: 6, branch: ['aiml'], credits: 3 },
  { code: 'BAI685', name: 'Project Phase I', semester: 6, branch: ['aiml'], credits: 2 },
  { code: 'BAIL606', name: 'Machine Learning Lab', semester: 6, branch: ['aiml'], credits: 1 },
  { code: 'BAIL657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['aiml'], credits: 1 },
  // AI&ML Sem 7
  { code: 'BAI701', name: 'Deep Learning and Reinforcement Learning', semester: 7, branch: ['aiml', 'aids'], credits: 4 },
  { code: 'BAI702', name: 'Machine Learning II', semester: 7, branch: ['aiml'], credits: 3 },
  { code: 'BAI714x', name: 'Professional Elective Course - IV', semester: 7, branch: ['aiml'], credits: 3 },
  { code: 'BAI755x', name: 'Open Elective Course - II', semester: 7, branch: ['aiml'], credits: 3 },
  { code: 'BAI786', name: 'Major Project Phase-II', semester: 7, branch: ['aiml'], credits: 8 },
  // AI&ML Sem 8
  { code: 'BAI801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['aiml'], credits: 3 },
  { code: 'BAI802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['aiml'], credits: 3 },
  { code: 'BAI803', name: 'Internship (Industry/Research)', semester: 8, branch: ['aiml'], credits: 12 },

  // AI&DS Sem 3
  { code: 'BDS306-B', name: 'Python Programming for Data Science', semester: 3, branch: ['aids'], credits: 3 },
  { code: 'BDS306-C', name: 'Data Analytics with R', semester: 3, branch: ['aids'], credits: 3 },
  { code: 'BAI358B', name: 'Ethics and Public Policy for AI', semester: 3, branch: ['aids'], credits: 1 },
  // AI&DS Sem 4
  { code: 'BAD402', name: 'Artificial Intelligence', semester: 4, branch: ['aids'], credits: 3 },
  { code: 'BAI405B-D', name: 'Metric Spaces / Algorithmic Game Theory', semester: 4, branch: ['aids'], credits: 3 },
  { code: 'BDSL456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['aids'], credits: 1 },
  // AI&DS Sem 5
  { code: 'BAD515x', name: 'Professional Elective Course - II', semester: 5, branch: ['aids'], credits: 3 },
  { code: 'BAD586', name: 'Mini Project', semester: 5, branch: ['aids'], credits: 2 },
  // AI&DS Sem 6
  { code: 'BAD601', name: 'Big Data Analytics', semester: 6, branch: ['aids'], credits: 3 },
  { code: 'BAD613x', name: 'Professional Elective Course - III', semester: 6, branch: ['aids'], credits: 3 },
  { code: 'BAD654x', name: 'Open Elective Course - I', semester: 6, branch: ['aids'], credits: 3 },
  { code: 'BAD685', name: 'Project Phase I', semester: 6, branch: ['aids'], credits: 2 },
  { code: 'BADL657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['aids'], credits: 1 },
  // AI&DS Sem 7
  { code: 'BAD702', name: 'Statistical Machine Learning For Data Science', semester: 7, branch: ['aids'], credits: 3 },
  { code: 'BAD703', name: 'Data Security and Privacy', semester: 7, branch: ['aids'], credits: 3 },
  { code: 'BAD714x', name: 'Professional Elective Course - IV', semester: 7, branch: ['aids'], credits: 3 },
  { code: 'BAD755x', name: 'Open Elective Course - II', semester: 7, branch: ['aids'], credits: 3 },
  { code: 'BAD786', name: 'Major Project Phase-II', semester: 7, branch: ['aids'], credits: 8 },
  // AI&DS Sem 8
  { code: 'BAD801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['aids'], credits: 3 },
  { code: 'BAD802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['aids'], credits: 3 },
  { code: 'BAD803', name: 'Internship (Industry/Research)', semester: 8, branch: ['aids'], credits: 12 },

  // ECE Sem 3
  { code: 'BMATEC301', name: 'AV Mathematics-III for EC Engineering', semester: 3, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BEC302', name: 'Digital System Design using Verilog', semester: 3, branch: ['ece', 'ect'], credits: 4 },
  { code: 'BEC303', name: 'Electronic Principles and Circuits', semester: 3, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BEC304', name: 'Network Analysis', semester: 3, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BECL305', name: 'Analog and Digital Systems Design Laboratory', semester: 3, branch: ['ece', 'ect'], credits: 1 },
  { code: 'BEC306x', name: 'Professional Elective Course - I', semester: 3, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BEC358x', name: 'Ability Enhancement Course/Skill Enhancement Course – III', semester: 3, branch: ['ece', 'ect'], credits: 1 },
  // ECE Sem 4
  { code: 'BEC401', name: 'Electromagnetic Theory', semester: 4, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BEC402', name: 'Principles of Communication Systems', semester: 4, branch: ['ece', 'ect'], credits: 4 },
  { code: 'BEC403', name: 'Control Systems', semester: 4, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BECL404', name: 'Communication Laboratory', semester: 4, branch: ['ece', 'ect'], credits: 1 },
  { code: 'BEC405x', name: 'Professional Elective Course - II', semester: 4, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BECL456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['ece', 'ect'], credits: 1 },
  { code: 'BBOK407', name: 'Biology For Engineers', semester: 4, branch: ['ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 2 },
  // ECE Sem 5
  { code: 'BEC501', name: 'Technological Innovation and Management Entrepreneurship', semester: 5, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BEC502', name: 'Digital Signal Processing', semester: 5, branch: ['ece', 'ect'], credits: 4 },
  { code: 'BEC503', name: 'Digital Communication', semester: 5, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BECL504', name: 'Digital Communication Lab', semester: 5, branch: ['ece', 'ect'], credits: 1 },
  { code: 'BEC515x', name: 'Professional Elective Course - III', semester: 5, branch: ['ece'], credits: 3 },
  { code: 'BEC586', name: 'Mini Project', semester: 5, branch: ['ece'], credits: 2 },
  { code: 'BESK508', name: 'Environmental Studies', semester: 5, branch: ['ece', 'ect', 'mech', 'ae', 'as', 'au', 'civil', 'eee', 'bt', 'ch'], credits: 1 },
  // ECE Sem 6
  { code: 'BEC601', name: 'Embedded System Design', semester: 6, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BEC602', name: 'VLSI Design and Testing', semester: 6, branch: ['ece'], credits: 4 },
  { code: 'BEC613x', name: 'Professional Elective Course - IV', semester: 6, branch: ['ece', 'ect'], credits: 3 },
  { code: 'BEC654x', name: 'Open Elective Course - I', semester: 6, branch: ['ece'], credits: 3 },
  { code: 'BEC685', name: 'Major Project Phase I', semester: 6, branch: ['ece'], credits: 2 },
  { code: 'BECL606', name: 'VLSI Design and Testing Lab', semester: 6, branch: ['ece'], credits: 1 },
  { code: 'BEC657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['ece', 'ect'], credits: 1 },
  // ECE Sem 7
  { code: 'BEC701', name: 'Microwave Engineering and Antenna Theory', semester: 7, branch: ['ece'], credits: 3 },
  { code: 'BEC702', name: 'Computer Networks and Protocols', semester: 7, branch: ['ece', 'ect'], credits: 4 },
  { code: 'BEC703', name: 'Wireless Communication Systems', semester: 7, branch: ['ece'], credits: 3 },
  { code: 'BEC714x', name: 'Professional Elective Course - V', semester: 7, branch: ['ece'], credits: 3 },
  { code: 'BEC755x', name: 'Open Elective Course - II', semester: 7, branch: ['ece'], credits: 3 },
  { code: 'BEC786', name: 'Major Project Phase-II', semester: 7, branch: ['ece'], credits: 8 },
  // ECE Sem 8
  { code: 'BEC801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['ece'], credits: 3 },
  { code: 'BEC802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['ece'], credits: 3 },
  { code: 'BEC803', name: 'Internship (Industry/Research)', semester: 8, branch: ['ece'], credits: 12 },

  // ECT Sem 5
  { code: 'BTE515x', name: 'Professional Elective Course - III', semester: 5, branch: ['ect'], credits: 3 },
  { code: 'BTE586', name: 'Mini Project', semester: 5, branch: ['ect'], credits: 2 },
  // ECT Sem 6
  { code: 'BTE602', name: 'Microwave and Antenna Theory', semester: 6, branch: ['ect'], credits: 4 },
  { code: 'BTE654x', name: 'Open Elective Course - I', semester: 6, branch: ['ect'], credits: 3 },
  { code: 'BTE685', name: 'Major Project Phase I', semester: 6, branch: ['ect'], credits: 2 },
  { code: 'BTEL606', name: 'Microwave and Antenna Lab', semester: 6, branch: ['ect'], credits: 1 },
  // ECT Sem 7
  { code: 'BTE701', name: 'Wireless and Cellular Communication', semester: 7, branch: ['ect'], credits: 3 },
  { code: 'BTE703', name: 'Optical Fiber Communication', semester: 7, branch: ['ect'], credits: 3 },
  { code: 'BTE714x', name: 'Professional Elective Course - V', semester: 7, branch: ['ect'], credits: 3 },
  { code: 'BTE755x', name: 'Open Elective Course - II', semester: 7, branch: ['ect'], credits: 3 },
  { code: 'BTE786', name: 'Major Project Phase-II', semester: 7, branch: ['ect'], credits: 8 },
  // ECT Sem 8
  { code: 'BTE801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['ect'], credits: 3 },
  { code: 'BTE802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['ect'], credits: 3 },
  { code: 'BTE803', name: 'Internship (Industry/Research)', semester: 8, branch: ['ect'], credits: 12 },

  // Mech Sem 3
  { code: 'BME301', name: 'Engineering Thermodynamics', semester: 3, branch: ['mech'], credits: 3 },
  { code: 'BME302', name: 'Material Science and Metallurgy', semester: 3, branch: ['mech'], credits: 4 },
  { code: 'BME303', name: 'Mechanics of Materials', semester: 3, branch: ['mech'], credits: 3 },
  { code: 'BME304', name: 'Manufacturing Processes', semester: 3, branch: ['mech'], credits: 3 },
  { code: 'BMEL305', name: 'Computer Aided Machine Drawing', semester: 3, branch: ['mech'], credits: 1 },
  { code: 'BME306x', name: 'Professional Elective Course - I', semester: 3, branch: ['mech'], credits: 3 },
  { code: 'BME358x', name: 'Ability Enhancement Course/Skill Enhancement Course – III', semester: 3, branch: ['mech'], credits: 1 },
  // Mech Sem 4
  { code: 'BME401', name: 'Theory of Machines', semester: 4, branch: ['mech'], credits: 3 },
  { code: 'BME402', name: 'Fluid Mechanics', semester: 4, branch: ['mech'], credits: 4 },
  { code: 'BME403', name: 'Applied Thermodynamics', semester: 4, branch: ['mech'], credits: 3 },
  { code: 'BMEL404', name: 'Material Testing & Metrology Lab', semester: 4, branch: ['mech'], credits: 1 },
  { code: 'BME405x', name: 'Professional Elective Course - II', semester: 4, branch: ['mech'], credits: 3 },
  { code: 'BME456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['mech'], credits: 1 },
  // Mech Sem 5
  { code: 'BME501', name: 'Industrial Management & Entrepreneurship', semester: 5, branch: ['mech'], credits: 3 },
  { code: 'BME502', name: 'Turbomachines', semester: 5, branch: ['mech'], credits: 4 },
  { code: 'BME503', name: 'Theory of Machines', semester: 5, branch: ['mech'], credits: 3 },
  { code: 'BME504L', name: 'CNC Programming and 3-D Printing lab', semester: 5, branch: ['mech'], credits: 1 },
  { code: 'BME515x', name: 'Professional Elective Course - III', semester: 5, branch: ['mech'], credits: 3 },
  { code: 'BME586', name: 'Mini Project', semester: 5, branch: ['mech'], credits: 2 },
  // Mech Sem 6
  { code: 'BME601', name: 'Heat Transfer', semester: 6, branch: ['mech'], credits: 4 },
  { code: 'BME602', name: 'Machine Design', semester: 6, branch: ['mech'], credits: 3 },
  { code: 'BME613x', name: 'Professional Elective Course - IV', semester: 6, branch: ['mech'], credits: 3 },
  { code: 'BME654x', name: 'Open Elective Course - I', semester: 6, branch: ['mech'], credits: 3 },
  { code: 'BME685', name: 'Major Project Phase - I', semester: 6, branch: ['mech'], credits: 2 },
  { code: 'BMEL606L', name: 'Design lab', semester: 6, branch: ['mech'], credits: 1 },
  { code: 'BME657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['mech'], credits: 1 },
  // Mech Sem 7
  { code: 'BME701', name: 'Finite Element Methods', semester: 7, branch: ['mech'], credits: 3 },
  { code: 'BME702', name: 'Hydraulics and Pneumatics', semester: 7, branch: ['mech'], credits: 4 },
  { code: 'BME703', name: 'Control Engineering', semester: 7, branch: ['mech'], credits: 3 },
  { code: 'BME714x', name: 'Professional Elective Course - V', semester: 7, branch: ['mech'], credits: 3 },
  { code: 'BME755x', name: 'Open Elective Course - II', semester: 7, branch: ['mech'], credits: 3 },
  { code: 'BME786', name: 'Major Project Phase-II', semester: 7, branch: ['mech'], credits: 8 },
  // Mech Sem 8
  { code: 'BME801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['mech'], credits: 3 },
  { code: 'BME802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['mech'], credits: 3 },
  { code: 'BME803', name: 'Internship (Industry/Research)', semester: 8, branch: ['mech'], credits: 12 },

  // Aero Sem 3
  { code: 'BAE301', name: 'Aircraft Materials & Processes', semester: 3, branch: ['ae'], credits: 3 },
  { code: 'BAE302', name: 'Elements of Aeronautics', semester: 3, branch: ['ae'], credits: 4 },
  { code: 'BAE303', name: 'Fluid Mechanics', semester: 3, branch: ['ae'], credits: 3 },
  { code: 'BAE304', name: 'Mechanics of Materials', semester: 3, branch: ['ae'], credits: 3 },
  { code: 'BAEL305', name: 'Computer Aided Aircraft Drawing', semester: 3, branch: ['ae'], credits: 1 },
  { code: 'BAE306x', name: 'Professional Elective Course - I', semester: 3, branch: ['ae'], credits: 3 },
  { code: 'BAE358x', name: 'Ability Enhancement Course/Skill Enhancement Course – III', semester: 3, branch: ['ae'], credits: 1 },
  // Aero Sem 4
  { code: 'BAE401', name: 'Aero Engineering Thermodynamics', semester: 4, branch: ['ae'], credits: 3 },
  { code: 'BAE402', name: 'Aerodynamics', semester: 4, branch: ['ae'], credits: 4 },
  { code: 'BAE403', name: 'Aircraft Propulsion', semester: 4, branch: ['ae'], credits: 3 },
  { code: 'BAEL404', name: 'Aircraft Material Testing & Processing Lab', semester: 4, branch: ['ae'], credits: 1 },
  { code: 'BAE405x', name: 'Professional Elective Course - II', semester: 4, branch: ['ae'], credits: 3 },
  { code: 'BAE456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['ae'], credits: 1 },
  // Aero Sem 5
  { code: 'BAE501', name: 'Aviation Management', semester: 5, branch: ['ae'], credits: 3 },
  { code: 'BAE502', name: 'Aircraft Structures', semester: 5, branch: ['ae'], credits: 4 },
  { code: 'BAE503', name: 'Unmanned Aerial Vehicles - Basics and Applications', semester: 5, branch: ['ae'], credits: 3 },
  { code: 'BAEL504', name: 'Energy Conversion Lab', semester: 5, branch: ['ae'], credits: 1 },
  { code: 'BAE515x', name: 'Professional Elective Course - III', semester: 5, branch: ['ae'], credits: 3 },
  { code: 'BAE586', name: 'Mini Project', semester: 5, branch: ['ae'], credits: 2 },
  // Aero Sem 6
  { code: 'BAE601', name: 'Composite Materials & Structures', semester: 6, branch: ['ae'], credits: 3 },
  { code: 'BAE602', name: 'Aircraft Performance and Stability', semester: 6, branch: ['ae'], credits: 4 },
  { code: 'BAE613x', name: 'Professional Elective Course - IV', semester: 6, branch: ['ae'], credits: 3 },
  { code: 'BAE654x', name: 'Open Elective Course - I', semester: 6, branch: ['ae'], credits: 3 },
  { code: 'BAE685', name: 'Project Phase I', semester: 6, branch: ['ae'], credits: 2 },
  { code: 'BAEL606', name: 'Flight Simulation Lab', semester: 6, branch: ['ae'], credits: 1 },
  { code: 'BAE657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['ae'], credits: 1 },
  // Aero Sem 7
  { code: 'BAE701', name: 'Avionics and Systems', semester: 7, branch: ['ae'], credits: 3 },
  { code: 'BAE702', name: 'Computational Fluid Dynamics', semester: 7, branch: ['ae'], credits: 4 },
  { code: 'BAE703', name: 'Control Engineering', semester: 7, branch: ['ae'], credits: 3 },
  { code: 'BAE714x', name: 'Professional Elective Course - V', semester: 7, branch: ['ae'], credits: 3 },
  { code: 'BAE755x', name: 'Open Elective Course - II', semester: 7, branch: ['ae'], credits: 3 },
  { code: 'BAE786', name: 'Major Project Phase-II', semester: 7, branch: ['ae'], credits: 8 },
  // Aero Sem 8
  { code: 'BAE801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['ae'], credits: 3 },
  { code: 'BAE802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['ae'], credits: 3 },
  { code: 'BAE803', name: 'Internship (Industry/Research)', semester: 8, branch: ['ae'], credits: 12 },
   // Civil Sem 3
  { code: 'BCV301', name: 'Strength of Materials', semester: 3, branch: ['civil'], credits: 3 },
  { code: 'BCV302', name: 'Engineering Survey', semester: 3, branch: ['civil'], credits: 4 },
  { code: 'BCV303', name: 'Engineering Geology', semester: 3, branch: ['civil'], credits: 3 },
  { code: 'BCV304', name: 'Water Supply and Waste water Engineering', semester: 3, branch: ['civil'], credits: 3 },
  { code: 'BCV305', name: 'Computer Aided Building Planning and Drawing', semester: 3, branch: ['civil'], credits: 1 },
  { code: 'BCV306x', name: 'Professional Elective Course - I', semester: 3, branch: ['civil'], credits: 3 },
  { code: 'BCV358x', name: 'Ability Enhancement Course/Skill Enhancement Course – III', semester: 3, branch: ['civil'], credits: 1 },
  // Civil Sem 4
  { code: 'BCV401', name: 'Analysis of Structures', semester: 4, branch: ['civil'], credits: 3 },
  { code: 'BCV402', name: 'Fluid Mechanics and Hydraulics', semester: 4, branch: ['civil'], credits: 4 },
  { code: 'BCV403', name: 'Transportation Engineering', semester: 4, branch: ['civil'], credits: 3 },
  { code: 'BCVL404', name: 'Building Materials Testing Lab', semester: 4, branch: ['civil'], credits: 1 },
  { code: 'BCV405x', name: 'Professional Elective Course - II', semester: 4, branch: ['civil'], credits: 3 },
  { code: 'BCV456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['civil'], credits: 1 },
  // Civil Sem 5
  { code: 'BCV501', name: 'Construction Management and Entrepreneurship', semester: 5, branch: ['civil'], credits: 3 },
  { code: 'BCV502', name: 'Geotechnical Engineering', semester: 5, branch: ['civil'], credits: 4 },
  { code: 'BCV503', name: 'Concrete Technology', semester: 5, branch: ['civil'], credits: 3 },
  { code: 'BCV504', name: 'Environmental Engineering Lab', semester: 5, branch: ['civil'], credits: 1 },
  { code: 'BCV515x', name: 'Professional Elective Course - III', semester: 5, branch: ['civil'], credits: 3 },
  { code: 'BCV586', name: 'Mini Project/Extensive Survey Project', semester: 5, branch: ['civil'], credits: 2 },
  // Civil Sem 6
  { code: 'BCV601', name: 'Design of RCC Structures', semester: 6, branch: ['civil'], credits: 3 },
  { code: 'BCV602', name: 'Irrigation Engineering and Hydraulic Structures', semester: 6, branch: ['civil'], credits: 4 },
  { code: 'BCV613x', name: 'Professional Elective Course - IV', semester: 6, branch: ['civil'], credits: 3 },
  { code: 'BCV654x', name: 'Open Elective Course - I', semester: 6, branch: ['civil'], credits: 3 },
  { code: 'BCV685', name: 'Major Project Phase I', semester: 6, branch: ['civil'], credits: 2 },
  { code: 'BCVL606', name: 'Software Application Lab', semester: 6, branch: ['civil'], credits: 1 },
  { code: 'BCV657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['civil'], credits: 1 },
  // Civil Sem 7
  { code: 'BCV701', name: 'Design of Steel Structures', semester: 7, branch: ['civil'], credits: 3 },
  { code: 'BCV702', name: 'Estimation and Contract Management', semester: 7, branch: ['civil'], credits: 4 },
  { code: 'BCV703', name: 'Prestressed Concrete', semester: 7, branch: ['civil'], credits: 3 },
  { code: 'BCV714x', name: 'Professional Elective Course - V', semester: 7, branch: ['civil'], credits: 3 },
  { code: 'BCV755x', name: 'Open Elective Course - II', semester: 7, branch: ['civil'], credits: 3 },
  { code: 'BCV786', name: 'Major Project Phase-II', semester: 7, branch: ['civil'], credits: 8 },
  // Civil Sem 8
  { code: 'BCV801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['civil'], credits: 3 },
  { code: 'BCV802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['civil'], credits: 3 },
  { code: 'BCV803', name: 'Internship (Industry/Research)', semester: 8, branch: ['civil'], credits: 12 },

  // EEE Sem 3
  { code: 'BMATE301', name: 'Mathematics-III for EE Engineering', semester: 3, branch: ['eee'], credits: 3 },
  { code: 'BEE302', name: 'Electric Circuit Analysis', semester: 3, branch: ['eee'], credits: 4 },
  { code: 'BEE303', name: 'Analog Electronic Circuits', semester: 3, branch: ['eee'], credits: 3 },
  { code: 'BEE304', name: 'Transformers and Generators', semester: 3, branch: ['eee'], credits: 3 },
  { code: 'BEEL305', name: 'Transformers and Generators Lab', semester: 3, branch: ['eee'], credits: 1 },
  { code: 'BEE306x', name: 'Professional Elective Course - I', semester: 3, branch: ['eee'], credits: 3 },
  { code: 'BEEL358x', name: 'Ability Enhancement Course/Skill Enhancement Course – III', semester: 3, branch: ['eee'], credits: 1 },
  // EEE Sem 4
  { code: 'BEE401', name: 'Electric Motors', semester: 4, branch: ['eee'], credits: 3 },
  { code: 'BEE402', name: 'Transmission and Distribution', semester: 4, branch: ['eee'], credits: 4 },
  { code: 'BEE403', name: 'Microcontrollers', semester: 4, branch: ['eee'], credits: 3 },
  { code: 'BEEL404', name: 'Electric Motors Lab', semester: 4, branch: ['eee'], credits: 1 },
  { code: 'BEE405x', name: 'Professional Elective Course - II', semester: 4, branch: ['eee'], credits: 3 },
  { code: 'BEEL456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['eee'], credits: 1 },
  // EEE Sem 5
  { code: 'BEE501', name: 'Engineering Management and Entrepreneurship', semester: 5, branch: ['eee'], credits: 3 },
  { code: 'BEE502', name: 'Signals & DSP', semester: 5, branch: ['eee'], credits: 4 },
  { code: 'BEE503', name: 'Power Electronics', semester: 5, branch: ['eee'], credits: 3 },
  { code: 'BEEL504', name: 'Power Electronics Lab', semester: 5, branch: ['eee'], credits: 1 },
  { code: 'BEE515x', name: 'Professional Elective Course - III', semester: 5, branch: ['eee'], credits: 3 },
  { code: 'BEE586', name: 'Mini Project', semester: 5, branch: ['eee'], credits: 2 },
  // EEE Sem 6
  { code: 'BEE601', name: 'Power System Analysis - I', semester: 6, branch: ['eee'], credits: 3 },
  { code: 'BEE602', name: 'Control Systems', semester: 6, branch: ['eee'], credits: 4 },
  { code: 'BEE613x', name: 'Professional Elective Course - IV', semester: 6, branch: ['eee'], credits: 3 },
  { code: 'BEE654x', name: 'Open Elective Course - I', semester: 6, branch: ['eee'], credits: 3 },
  { code: 'BEE685', name: 'Project Phase I', semester: 6, branch: ['eee'], credits: 2 },
  { code: 'BEEL606', name: 'Control System Lab', semester: 6, branch: ['eee'], credits: 1 },
  { code: 'BEE657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['eee'], credits: 1 },
  // EEE Sem 7
  { code: 'BEE701', name: 'Switchgear and Protection', semester: 7, branch: ['eee'], credits: 3 },
  { code: 'BEE702', name: 'Industrial Drives and Applications', semester: 7, branch: ['eee'], credits: 4 },
  { code: 'BEE703', name: 'Power System Analysis - II', semester: 7, branch: ['eee'], credits: 3 },
  { code: 'BEE714x', name: 'Professional Elective Course - V', semester: 7, branch: ['eee'], credits: 3 },
  { code: 'BEE755x', name: 'Open Elective Course - II', semester: 7, branch: ['eee'], credits: 3 },
  { code: 'BEE786', name: 'Major Project Phase-II', semester: 7, branch: ['eee'], credits: 8 },
  // EEE Sem 8
  { code: 'BEE801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['eee'], credits: 3 },
  { code: 'BEE802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['eee'], credits: 3 },
  { code: 'BEE803', name: 'Internship (Industry/Research)', semester: 8, branch: ['eee'], credits: 12 },

  // Biotech Sem 3
  { code: 'BBT301', name: 'Cell Biology and Genetics', semester: 3, branch: ['bt'], credits: 3 },
  { code: 'BBT302', name: 'Unit Operations + Lab', semester: 3, branch: ['bt'], credits: 4 },
  { code: 'BBT303', name: 'Biochemistry + Lab', semester: 3, branch: ['bt'], credits: 3 },
  { code: 'BBT304', name: 'Microbiology', semester: 3, branch: ['bt'], credits: 3 },
  { code: 'BBTL305', name: 'Microbiology Lab', semester: 3, branch: ['bt'], credits: 1 },
  { code: 'BBT306x', name: 'Professional Elective Course - I', semester: 3, branch: ['bt'], credits: 3 },
  { code: 'BBT358x', name: 'Ability Enhancement Course/Skill Enhancement Course – III', semester: 3, branch: ['bt'], credits: 1 },
  // Biotech Sem 4
  { code: 'BBT401', name: 'Molecular Biology & Genetic Engineering', semester: 4, branch: ['bt'], credits: 3 },
  { code: 'BBT402', name: 'Biostatistics and Tools + Lab', semester: 4, branch: ['bt'], credits: 4 },
  { code: 'BBT403', name: 'Immunotechnology + Lab', semester: 4, branch: ['bt'], credits: 3 },
  { code: 'BBTL404', name: 'Molecular Biology & Genetic Engineering Lab', semester: 4, branch: ['bt'], credits: 1 },
  { code: 'BBT405x', name: 'Professional Elective Course - II', semester: 4, branch: ['bt'], credits: 3 },
  { code: 'BBT456x', name: 'Ability Enhancement Course/Skill Enhancement Course - IV', semester: 4, branch: ['bt'], credits: 1 },
  // Biotech Sem 5
  { code: 'BBT501', name: 'Bioeconomy and Entrepreneurship', semester: 5, branch: ['bt'], credits: 3 },
  { code: 'BBT502', name: 'Enzyme Technology + Lab', semester: 5, branch: ['bt'], credits: 4 },
  { code: 'BBT503', name: 'Genomics, Proteomics and Bioinformatics', semester: 5, branch: ['bt'], credits: 3 },
  { code: 'BBTL504', name: 'Bioinformatics Lab', semester: 5, branch: ['bt'], credits: 1 },
  { code: 'BBT515x', name: 'Professional Elective Course - III', semester: 5, branch: ['bt'], credits: 3 },
  { code: 'BBT586', name: 'Mini Project', semester: 5, branch: ['bt'], credits: 2 },
  // Biotech Sem 6
  { code: 'BBT601', name: 'Bioprocess Control & Automation + Lab', semester: 6, branch: ['bt'], credits: 3 },
  { code: 'BBT602', name: 'Biokinetics', semester: 6, branch: ['bt'], credits: 4 },
  { code: 'BBT613x', name: 'Professional Elective Course - IV', semester: 6, branch: ['bt'], credits: 3 },
  { code: 'BBT654x', name: 'Open Elective Course - I', semester: 6, branch: ['bt'], credits: 3 },
  { code: 'BBT685', name: 'Project Phase I', semester: 6, branch: ['bt'], credits: 2 },
  { code: 'BBTL606', name: 'Biokinetics Lab', semester: 6, branch: ['bt'], credits: 1 },
  { code: 'BBT657x', name: 'Ability Enhancement Course/Skill Development Course - V', semester: 6, branch: ['bt'], credits: 1 },
  // Biotech Sem 7
  { code: 'BBT701', name: 'Upstream Process Technology + Lab', semester: 7, branch: ['bt'], credits: 3 },
  { code: 'BBT702', name: 'Downstream Process Technology + Lab', semester: 7, branch: ['bt'], credits: 4 },
  { code: 'BBT703', name: 'Bioethics, Biosafety and Regulatory affairs', semester: 7, branch: ['bt'], credits: 3 },
  { code: 'BBT714x', name: 'Professional Elective Course - V', semester: 7, branch: ['bt'], credits: 3 },
  { code: 'BBT755x', name: 'Open Elective Course - II', semester: 7, branch: ['bt'], credits: 3 },
  { code: 'BBT786', name: 'Major Project Phase-II', semester: 7, branch: ['bt'], credits: 8 },
  // Biotech Sem 8
  { code: 'BBT801x', name: 'Professional Elective (Online Courses)', semester: 8, branch: ['bt'], credits: 3 },
  { code: 'BBT802x', name: 'Open Elective (Online Courses)', semester: 8, branch: ['bt'], credits: 3 },
  { code: 'BBT803', name: 'Internship (Industry/Research)', semester: 8, branch: ['bt'], credits: 12 },
];

    