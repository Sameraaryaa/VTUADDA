
import type { Subject, Branch, LabResource } from './types';
import type { PyqResult } from '@/app/(main)/pyq/page';

export const keywordMap: Record<string, { type: 'branch' | 'semester' | 'resource'; id: string | number }> = {
    'cse': { type: 'branch', id: 'cse' },
    'cs': { type: 'branch', id: 'cse' },
    'ise': { type: 'branch', id: 'ise' },
    'is': { type: 'branch', id: 'ise' },
    'aiml': { type: 'branch', id: 'aiml' },
    'ai': { type: 'branch', id: 'aiml' },
    'ml': { type: 'branch', id: 'aiml' },
    'machine learning': { type: 'branch', id: 'aiml' },
    'aids': { type: 'branch', id: 'aids' },
    'ds': { type: 'branch', id: 'aids' },
    'data science': { type: 'branch', id: 'aids' },
    'ece': { type: 'branch', id: 'ece' },
    'ec': { type: 'branch', id: 'ece' },
    'mech': { type: 'branch', id: 'mech' },
    'mechanical': { type: 'branch', id: 'mech' },
    'eee': { type: 'branch', id: 'eee' },
    'civil': { type: 'branch', id: 'civil' },
    'bt': { type: 'branch', id: 'bt' },
    'biotech': { type: 'branch', id: 'bt' },
    'biotechnology': { type: 'branch', id: 'bt' },
    'ae': { type: 'branch', id: 'ae' },
    'aeronautical': { type: 'branch', id: 'ae' },
    'first year': { type: 'branch', id: 'first-year' },
    '1st year': { type: 'branch', id: 'first-year' },
    'firstyear25': { type: 'branch', id: 'first-year-2025' },
    'first year 2025': { type: 'branch', id: 'first-year-2025' },
    '2025 scheme': { type: 'branch', id: 'first-year-2025' },
    '1st sem': { type: 'semester', id: 1 },
    'sem 1': { type: 'semester', id: 1 },
    '2nd sem': { type: 'semester', id: 2 },
    'sem 2': { type: 'semester', id: 2 },
    '3rd sem': { type: 'semester', id: 3 },
    'sem 3': { type: 'semester', id: 3 },
    '4th sem': { type: 'semester', id: 4 },
    'sem 4': { type: 'semester', id: 4 },
    '5th sem': { type: 'semester', id: 5 },
    'sem 5': { type: 'semester', id: 5 },
    '6th sem': { type: 'semester', id: 6 },
    'sem 6': { type: 'semester', id: 6 },
    '7th sem': { type: 'semester', id: 7 },
    'sem 7': { type: 'semester', id: 7 },
    '8th sem': { type: 'semester', id: 8 },
    'sem 8': { type: 'semester', id: 8 },
    'notes': { type: 'resource', id: 'notes'},
    'pyq': { type: 'resource', id: 'pyq'},
    'pyqs': { type: 'resource', id: 'pyq'},
    'lab': { type: 'resource', id: 'labs'},
    'labs': { type: 'resource', id: 'labs'},
};

export const filterSubjects = (
    subjects: Subject[],
    searchTerm: string,
    selectedScheme: string,
    selectedBranch: string,
    selectedSemester: string
): Subject[] => {
    
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    const searchTokens = lowerCaseSearch.split(/\s+/).filter(Boolean);

    let queryBranch: string | undefined = selectedBranch;
    let querySemester: number | undefined = selectedSemester ? parseInt(selectedSemester, 10) : undefined;
    let textSearchTerms: string[] = [];

    for (const token of searchTokens) {
        const keywordMatch = keywordMap[token];
        if (keywordMatch?.type === 'branch' && !queryBranch) {
            queryBranch = keywordMatch.id as string;
        } else if (keywordMatch?.type === 'semester' && !querySemester) {
            querySemester = keywordMatch.id as number;
        } else {
            textSearchTerms.push(token);
        }
    }
    const textSearch = textSearchTerms.join(' ');


    return subjects.filter(subject => {
        let matches = true;

        if (selectedScheme) {
            matches = matches && subject.scheme === selectedScheme;
        }
        if (queryBranch) {
            matches = matches && (subject.branch?.includes(queryBranch));
        }
        if (querySemester) {
            matches = matches && subject.semester === querySemester;
        }

        if (textSearch) {
             const nameMatch = subject.name.toLowerCase().includes(textSearch);
             const codeMatch = subject.code.toLowerCase().includes(textSearch);
            
             matches = matches && (nameMatch || codeMatch);
        }

        return matches;
    });
};


export const filterPyqs = (
    allPyqs: PyqResult[],
    branches: Record<string, Branch>,
    searchTerm: string,
    selectedScheme: string,
    selectedBranch: string,
    selectedSemester: string
) => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    const searchTokens = lowerCaseSearch.split(/\s+/).filter(Boolean);

    let queryBranch: string | undefined = selectedBranch;
    let querySemester: number | undefined = selectedSemester ? parseInt(selectedSemester, 10) : undefined;
    let textSearchTerms: string[] = [];

    for (const token of searchTokens) {
        const keywordMatch = keywordMap[token];
        if (keywordMatch?.type === 'branch' && !queryBranch) {
            queryBranch = keywordMatch.id as string;
        } else if (keywordMatch?.type === 'semester' && !querySemester) {
            querySemester = keywordMatch.id as number;
        } else {
            textSearchTerms.push(token);
        }
    }
    const textSearch = textSearchTerms.join(' ');

    return allPyqs.filter(pyq => {
        let matches = true;
        if (selectedScheme) {
            matches = matches && pyq.scheme === selectedScheme;
        }
        if (queryBranch) {
             matches = matches && pyq.branchIds.includes(queryBranch);
        }
        if (querySemester) {
            matches = matches && pyq.semester === querySemester;
        }
        
        if (textSearch) {
            const nameMatch = pyq.name.toLowerCase().includes(textSearch);
            const subjectNameMatch = pyq.subjectName.toLowerCase().includes(textSearch);
            const subjectCodeMatch = pyq.subjectCode.toLowerCase().includes(textSearch);
            matches = matches && (nameMatch || subjectNameMatch || subjectCodeMatch);
        }

        return matches;
    });
};


export const filterLabs = (
    labs: LabResource[],
    branches: Record<string, Branch>,
    searchTerm: string,
    selectedScheme: string,
    selectedBranch: string,
    selectedSemester: string
): LabResource[] => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    const searchTokens = lowerCaseSearch.split(/\s+/).filter(Boolean);

    let queryBranchName: string | undefined;
    if (selectedBranch) {
        queryBranchName = branches[selectedBranch]?.name;
    }
    let querySemester: number | undefined = selectedSemester ? parseInt(selectedSemester, 10) : undefined;
    let textSearchTerms: string[] = [];
    
    // Process search tokens for keywords
    for (const token of searchTokens) {
        const keywordMatch = keywordMap[token];
        if (keywordMatch?.type === 'branch' && !queryBranchName) {
            const branchId = keywordMatch.id as string;
            queryBranchName = branches[branchId]?.name;
        } else if (keywordMatch?.type === 'semester' && !querySemester) {
            querySemester = keywordMatch.id as number;
        } else {
            textSearchTerms.push(token);
        }
    }
    const textSearch = textSearchTerms.join(' ');

    return labs.filter(lab => {
        let matches = true;
        
        // Scheme filter is tricky as LabResource doesn't have it. We can infer it from branch maybe.
        // For now, let's assume we can't filter by scheme on this page if the data isn't present.

        if (queryBranchName) {
            matches = matches && lab.branchName === queryBranchName;
        }
        if (querySemester) {
            matches = matches && lab.semester === querySemester;
        }

        if (textSearch) {
            const nameMatch = lab.subjectName.toLowerCase().includes(textSearch);
            const codeMatch = lab.subjectCode.toLowerCase().includes(textSearch);
            matches = matches && (nameMatch || codeMatch);
        }
        
        return matches;
    });
}
