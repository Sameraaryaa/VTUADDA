
import { z } from 'zod';

export interface Note {
    name: string;
    url: string;
    downloads?: number;
}

export interface ModelQuestionPaper extends Note {}

export interface PYQ extends Note {}

export interface Module {
    moduleNumber: number;
    name?: string;
    description?: string;
    notes: Note[];
}

export interface LabManual extends Note {}

export interface Breadcrumb {
    name: string;
    url: string;
}

export interface Subject {
    code: string;
    name:string;
    credits: number;
    semester: number;
    branch?: string[];
    type?: string;
    scheme?: string;
    modules?: Module[];
    modelQuestionPapers?: Note[];
    pyqs?: Note[];
    labs?: LabManual[];
    breadcrumbs?: Breadcrumb[];
}

export interface Author {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
    dataAiHint?: string;
    socials: {
        linkedin?: string;
        github?: string;
        email?: string;
    };
    bio: string;
}

export interface Branch {
    id: string;
    name: string; 
    description: string; 
    scheme: string;
    likes?: number;
    textbooks?: Note[];
}

export interface QuickLink {
    text: string;
    url: string;
    external: boolean;
}

export interface LinkCategory {
    id: string;
    title: string;
    order: number;
    links: QuickLink[];
}

export interface LabResource {
    id: string;
    subjectName: string;
    subjectCode: string;
    branchName: string;
    scheme?: string;
    semester: number;
    manuals: LabManual[];
    createdAt?: any;
}

export interface Textbook extends Note {
    id: string;
    author: string;
    downloadUrl: string;
    title: string;
}

export interface Campaign {
    id: string;
    title: string;
    message: string;
    ctaText?: string;
    ctaLink?: string;
    isActive: boolean;
    createdAt?: any;
}

export const ContributionInputSchema = z.object({
  scheme: z.string(),
  branch: z.string(),
  semester: z.string(),
  subjectName: z.string(),
  subjectCode: z.string(),
  module: z.string(),
  name: z.string(),
  email: z.string().email(),
  showCredit: z.boolean(),
  fileUrl: z.string().url(),
  resourceType: z.string().optional(),
});

export type ContributionInput = z.infer<typeof ContributionInputSchema>;

export interface Contribution extends ContributionInput {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
}

export interface Feedback {
  id: string;
  rating: number;
  feedback: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface SgpaSubject {
    code: string;
    name: string;
    credits: number;
}

export interface SgpaSemester {
    [semester: string]: SgpaSubject[];
}

export interface SgpaBranch {
    [branch: string]: SgpaSemester;
}

export interface SgpaScheme {
    [scheme: string]: SgpaBranch;
}
