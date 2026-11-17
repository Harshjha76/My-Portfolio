export type ThemeMode = "dark" | "light";

export interface ThemeSettings {
  mode: ThemeMode;
  accentColor: string; // e.g. "#87947A" (sage), "#B18A5A" (bronze), "#263B32" (forest)
  fontHeading: string; // "Inter" | "Geist" | "Manrope"
  fontBody: string; // "Inter" | "Geist" | "Manrope"
  borderRadius: string; // "0.5rem" | "0.75rem" | "1rem" | "1.25rem"
  cardStyle: "minimal" | "bordered" | "elevated";
  sectionOrder: string[];
  sectionVisibility: Record<string, boolean>;
}

export interface ProfileData {
  displayName: string;
  degree: string;
  college: string;
  academicLevel: string;
  startYear: number;
  expectedGraduation: number;
  headline: string;
  careerPositioning: string[];
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  avatarUrl: string;
  resumeUrl: string;
  resumeFilename: string;
  resumePublished: boolean;
}

export interface AboutData {
  introduction: string;
  technicalInterests: string[];
  careerInterests: string[];
  personalInterests: string[];
  spokenLanguages: { language: string; proficiency: string }[];
}

export interface EducationItem {
  id: string;
  level: "10th" | "12th" | "Undergraduate" | "Other";
  title: string;
  institution: string;
  boardOrUniversity: string;
  yearStart?: number;
  yearEnd: number;
  scoreType: "Percentage" | "SGPI" | "CGPA";
  score: string;
  status: string;
  semestersSummary?: string;
  marksheetUrl?: string;
  marksheetPreviewUrl?: string;
  isPublished: boolean;
}

export interface SubjectGrade {
  code: string;
  name: string;
  credits: number;
  grade: string;
  marks?: number;
}

export interface AcademicSemester {
  id: string;
  semesterNumber: number;
  semesterLabel: string;
  academicYear: string;
  sgpi: number;
  totalCredits?: number;
  subjects: SubjectGrade[];
  marksheetUrl?: string;
  marksheetFilename?: string;
  marksheetPreviewUrl?: string;
  isPublished: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  repoName: string;
  githubUrl: string;
  liveDemoUrl?: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  solution: string;
  technologies: string[];
  mainFeatures: string[];
  screenshots: string[];
  status: "Completed" | "Active Development" | "Maintained" | "Reference Export";
  futureImprovements: string[];
  verifiedNote?: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  workMode: "Remote" | "On-site" | "Hybrid" | "Independent";
  duration: string;
  responsibilities: string[];
  isCurrent: boolean;
  isPublished: boolean;
}

export interface SkillEvidence {
  type: "Certificate" | "Project" | "Experience" | "Academic";
  title: string;
  link?: string;
}

export interface VerifiedSkill {
  name: string;
  category: string;
  evidence?: SkillEvidence[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
  detailedSkills?: VerifiedSkill[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuingOrganization: string;
  courseName?: string;
  category: "Programming & Algorithms" | "Data Analytics & Internships" | "AI & Professional Development" | "Academic Credentials" | "Other";
  issueDate: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  documentUrl?: string;
  documentFilename?: string;
  previewImageUrl?: string;
  skillsSupported: string[];
  allowDownload: boolean;
  isPublished: boolean;
}

export type LearningStatus = "Planning" | "Learning" | "Practicing" | "Completed" | "Paused";

export interface CurrentLearningItem {
  id: string;
  topic: string;
  description: string;
  category: string;
  learningResource?: string;
  youtubeUrl?: string;
  docsUrl?: string;
  startDate: string;
  progressPercentage: number;
  status: LearningStatus;
  keyTopicsLearned?: string[];
  notes?: string;
  isPublished: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuingOrganization: string;
  date: string;
  description: string;
  supportingDocUrl?: string;
  supportingDocFilename?: string;
  previewImageUrl?: string;
  isPublished: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface PortfolioData {
  profile: ProfileData;
  about: AboutData;
  education: EducationItem[];
  academicPerformance: AcademicSemester[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  certificates: CertificateItem[];
  currentLearning: CurrentLearningItem[];
  achievements: AchievementItem[];
  theme: ThemeSettings;
}
